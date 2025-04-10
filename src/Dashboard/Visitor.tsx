import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; // Adjust the path based on your project structure
import VisitorMap from './VisitorMap';
import { FaDownload } from 'react-icons/fa';

interface Visitor {
  id: number;
  visited_at: string;
  ip_address: string | null;
  user_agent: string | null;
  page_url: string | null;
  city: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  isp: string | null;
  screen: string | null;
  
}

const Visitor: React.FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to fetch all visitor data
  const fetchVisitors = async () => {
    const { data, error } = await supabase
      .from('visitors')
      .select('*')
      .order('visited_at', { ascending: false });

    if (error) {
      console.error('Error fetching visitors:', error);
    } else {
      setVisitors(data || []);
    }
    setLoading(false);
  };

  // Calculate different visitor metrics
  const totalVisitors = visitors.length;
  const todayVisitors = visitors.filter(visitor => {
    const today = new Date();
    const visitorDate = new Date(visitor.visited_at);
    return today.toDateString() === visitorDate.toDateString();
  }).length;

  const uniqueIps = new Set(visitors.map(visitor => visitor.ip_address)).size;
  const uniqueCities = new Set(visitors.map(visitor => visitor.city)).size;
  const uniqueCountries = new Set(visitors.map(visitor => visitor.country)).size;

  useEffect(() => {
    fetchVisitors();
  }, []);

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold text-black">Visitor Overview</h2>
        <button
          onClick={() => {
            const csvContent = [
              'ID,Visited At,IP Address,User Agent,Page URL,Country,City,Latitude,Longitude,ISP,Screen',
              ...visitors.map(
                (v) =>
                  `${v.id},${new Date(v.visited_at).toLocaleString()},${v.ip_address || 'N/A'},${
                    v.user_agent || 'N/A'
                  },${v.page_url || 'N/A'},${v.country || 'N/A'},${v.city || 'N/A'},${
                    v.latitude || 'N/A'
                  },${v.longitude || 'N/A'},${v.isp || 'N/A'},${v.screen || 'N/A'}`
              ),
            ].join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'visitors.csv';
            a.click();
            window.URL.revokeObjectURL(url);
          }}
          className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300"
        >
          <FaDownload className="mr-2" /> Export Data
        </button>
      </div>

      {/* Visitor Metrics - Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-800">Total Visitors</h3>
          <p className="text-3xl font-bold text-primary">{totalVisitors}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-800">Today's Visitors</h3>
          <p className="text-3xl font-bold text-primary">{todayVisitors}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-800">Unique IPs</h3>
          <p className="text-3xl font-bold text-primary">{uniqueIps}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-800">Unique Cities</h3>
          <p className="text-3xl font-bold text-primary">{uniqueCities}</p>
        </div>
      </div>

      {/* Visitors Table */}
      {loading ? (
        <p className="text-gray-600">Loading visitors...</p>
      ) : (
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left table-auto">
            <thead className="bg-gradient-to-r from-primary to-green-700 text-white">
              <tr>
                <th className="py-3 px-6 text-sm font-semibold">Time</th>
                <th className="py-3 px-6 text-sm font-semibold">IP Address</th>
                <th className="py-3 px-6 text-sm font-semibold">Page URL</th>
                <th className="py-3 px-6 text-sm font-semibold">Location</th>
                <th className="py-3 px-6 text-sm font-semibold">ISP</th>
                <th className="py-3 px-6 text-sm font-semibold">Screen</th>
              </tr>
            </thead>
            <tbody>
              {visitors.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-4 px-6 text-center text-gray-500">
                    No visitors yet.
                  </td>
                </tr>
              ) : (
                visitors.map((visitor) => (
                  <tr key={visitor.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-2 px-6 text-sm">{new Date(visitor.visited_at).toLocaleString()}</td>
                    <td className="py-2 px-6 text-sm">{visitor.ip_address || 'N/A'}</td>
                    <td className="py-2 px-6 text-sm truncate max-w-xs">{visitor.page_url || 'N/A'}</td>
                    <td className="py-2 px-6 text-sm">{`${visitor.city || 'N/A'}, ${visitor.country || 'N/A'}`}</td>
                    <td className="py-2 px-6 text-sm">{visitor.isp || 'N/A'}</td>
                    <td className="py-2 px-6 text-sm">{visitor.screen || 'N/A'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Map Section */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-black mb-4">Visitor Map</h3>
        <VisitorMap visitors={visitors} />
      </div>
    </div>
  );
};

export default Visitor;
