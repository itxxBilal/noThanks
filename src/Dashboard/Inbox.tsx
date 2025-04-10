import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

interface ProductRequest {
  id: number;
  name: string;
  image_logo?: string;
  barcode?: string;
  comment?: string;
  evidence_link?: string;
  alternative_products?: string;
  status: string;
  created_at: string;
}

const Inbox: React.FC = () => {
  const [requests, setRequests] = useState<ProductRequest[]>([]);
  const [editingRequest, setEditingRequest] = useState<ProductRequest | null>(null);
  const [editForm, setEditForm] = useState<Partial<ProductRequest>>({});

  useEffect(() => {
    fetchRequests();

    const subscription = supabase
      .channel('product_requests')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'product_requests' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setRequests((prev) => [...prev, payload.new as ProductRequest]);
        } else if (payload.eventType === 'UPDATE') {
          setRequests((prev) =>
            prev.map((req) => (req.id === payload.new.id ? (payload.new as ProductRequest) : req))
          );
        } else if (payload.eventType === 'DELETE') {
          setRequests((prev) => prev.filter((req) => req.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from('product_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching requests:', error);
      toast.error('Failed to load requests.');
    } else {
      setRequests(data || []);
    }
  };

  const handleAccept = async (request: ProductRequest) => {
    const { error } = await supabase
      .from('product_requests')
      .update({ status: 'approved' })
      .eq('id', request.id);

    if (error) {
      console.error('Error accepting request:', error);
      toast.error('Failed to accept request.');
    } else {
      toast.success(`${request.name} approved successfully!`);
    }
  };

  const handleReject = async (request: ProductRequest) => {
    const { error } = await supabase
      .from('product_requests')
      .update({ status: 'rejected' })
      .eq('id', request.id);

    if (error) {
      console.error('Error rejecting request:', error);
      toast.error('Failed to reject request.');
    } else {
      toast.success(`${request.name} rejected successfully!`);
    }
  };

  const handleEdit = (request: ProductRequest) => {
    setEditingRequest(request);
    setEditForm({
      name: request.name,
      image_logo: request.image_logo,
      barcode: request.barcode,
      comment: request.comment,
      evidence_link: request.evidence_link,
      alternative_products: request.alternative_products,
      status: request.status,
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRequest) return;

    const { error } = await supabase
      .from('product_requests')
      .update(editForm)
      .eq('id', editingRequest.id);

    if (error) {
      console.error('Error updating request:', error);
      toast.error('Failed to update request.');
    } else {
      toast.success('Request updated successfully!');
      setEditingRequest(null);
    }
  };

  const handleDelete = async (request: ProductRequest) => {
    if (!window.confirm(`Are you sure you want to delete "${request.name}"?`)) return;

    const { error } = await supabase
      .from('product_requests')
      .delete()
      .eq('id', request.id);

    if (error) {
      console.error('Error deleting request:', error);
      toast.error('Failed to delete request.');
    } else {
      toast.success(`${request.name} deleted successfully!`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">Product Request Inbox</h1>
      <div className="space-y-6">
        {requests.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No requests found.</p>
        ) : (
          requests.map((request) => (
            <div
              key={request.id}
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {editingRequest?.id === request.id ? (
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name || ''}
                      onChange={handleEditChange}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4baa4d] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                      type="url"
                      name="image_logo"
                      value={editForm.image_logo || ''}
                      onChange={handleEditChange}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4baa4d] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Barcode</label>
                    <input
                      type="text"
                      name="barcode"
                      value={editForm.barcode || ''}
                      onChange={handleEditChange}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4baa4d] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Comment</label>
                    <textarea
                      name="comment"
                      value={editForm.comment || ''}
                      onChange={handleEditChange}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4baa4d] focus:border-transparent"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Evidence Link</label>
                    <input
                      type="url"
                      name="evidence_link"
                      value={editForm.evidence_link || ''}
                      onChange={handleEditChange}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4baa4d] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Alternative Products</label>
                    <input
                      type="text"
                      name="alternative_products"
                      value={editForm.alternative_products || ''}
                      onChange={handleEditChange}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4baa4d] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      name="status"
                      value={editForm.status || 'pending'}
                      // onChange={handleEditChange}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4baa4d] focus:border-transparent"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setEditingRequest(null)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#4baa4d] text-white rounded-md hover:bg-[#3d8c3f] transition-all"
                    >
                      Save
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {request.image_logo && (
                      <img
                        src={request.image_logo}
                        alt={`${request.name} logo`}
                        className="w-24 h-24 object-contain rounded-md"
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                      />
                    )}
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-800">{request.name}</h2>
                      {request.barcode && <p className="text-gray-600">Barcode: {request.barcode}</p>}
                      {request.comment && <p className="text-gray-600">Comment: {request.comment}</p>}
                      {request.evidence_link && (
                        <p className="text-gray-600">
                          Evidence:{' '}
                          <a
                            href={request.evidence_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#4baa4d] hover:underline"
                          >
                            {request.evidence_link}
                          </a>
                        </p>
                      )}
                      {request.alternative_products && (
                        <p className="text-gray-600">Alternatives: {request.alternative_products}</p>
                      )}
                      <p className="text-gray-500">
                        Status:{' '}
                        <span
                          className={`font-semibold ${
                            request.status === 'approved'
                              ? 'text-green-600'
                              : request.status === 'rejected'
                              ? 'text-red-600'
                              : 'text-yellow-600'
                          }`}
                        >
                          {request.status}
                        </span>
                      </p>
                      <p className="text-gray-500">
                        Submitted: {new Date(request.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {request.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleAccept(request)}
                          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
                        >
                          <FaCheck className="mr-2" /> Accept
                        </button>
                        <button
                          onClick={() => handleReject(request)}
                          className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                        >
                          <FaTimes className="mr-2" /> Reject
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleEdit(request)}
                      className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                    >
                      <FaEdit className="mr-2" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(request)}
                      className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
                    >
                      <FaTrash className="mr-2" /> Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Inbox;