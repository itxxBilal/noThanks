import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaTimes, FaDownload, FaPlus, FaCheckCircle } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { trackVisitor } from '../lib/trackVisitor';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Product {
  name: string;
  brand: string;
  category: string;
  supportsIsrael: boolean;
  submitted_by: string;
  image_logo?: string; // Added to store and display logo
}

interface ProductRequest {
  name: string;
  image_logo_file?: File | null;
  image_logo_url?: string;
  barcode?: string;
  category?: string;
  comment?: string;
  evidence_link?: string;
  alternative_products?: string;
  submitted_by: string;
}

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [excludeSupporters, setExcludeSupporters] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [productRequest, setProductRequest] = useState<ProductRequest>({
    name: '',
    image_logo_file: null,
    image_logo_url: '',
    barcode: '',
    category: '',
    comment: '',
    evidence_link: '',
    alternative_products: '',
    submitted_by: '',
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [page, setPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [userSubmittedProducts, setUserSubmittedProducts] = useState<Product[]>([]);

  const staticProducts: Product[] = [
    { name: 'Ahava Cream', brand: 'Ahava', category: 'Cosmetics', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Arak', brand: 'Elite', category: 'Beverages', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'ArmorSource Helmets', brand: 'ArmorSource', category: 'Defense', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Bamba', brand: 'Osem', category: 'Food', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'BIS Defense Systems', brand: 'BIS', category: 'Defense', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Bissli', brand: 'Osem', category: 'Food', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Check Point Firewall', brand: 'Check Point', category: 'Tech', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Daniella Lehavi Handbag', brand: 'Daniella Lehavi', category: 'Fashion', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Eden Spring Water', brand: 'Eden Spring', category: 'Beverages', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Elbit Drone System', brand: 'Elbit Systems', category: 'Defense', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Elta Radar Systems', brand: 'Israel Aerospace Industries', category: 'Defense', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Fiverr Services', brand: 'Fiverr', category: 'Tech', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Gamila Secret Soap', brand: 'Gamila Secret', category: 'Cosmetics', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Haaretz Newspaper', brand: 'Haaretz', category: 'Media', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Jaffa Oranges', brand: 'Jaffa', category: 'Food', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Keter Storage Box', brand: 'Keter', category: 'Household', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Laline Body Cream', brand: 'Laline', category: 'Cosmetics', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Max Brenner Chocolates', brand: 'Max Brenner', category: 'Food', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Mobileye System', brand: 'Mobileye', category: 'Tech', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Moraz Skincare', brand: 'Moraz', category: 'Cosmetics', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Nevo Spa Products', brand: 'Nevo', category: 'Cosmetics', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Netafim Irrigation Systems', brand: 'Netafim', category: 'Agritech', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Nice Security Systems', brand: 'NICE Systems', category: 'Tech', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'NSO Pegasus Software', brand: 'NSO Group', category: 'Cybersecurity', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Osem Pasta', brand: 'Osem', category: 'Food', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Plasan Vehicle Armor', brand: 'Plasan', category: 'Defense', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Rafael Iron Dome', brand: 'Rafael', category: 'Defense', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Sabon Soap', brand: 'Sabon', category: 'Cosmetics', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Sabra Hummus', brand: 'Sabra', category: 'Food', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'SodaStream Machine', brand: 'SodaStream', category: 'Tech', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Strauss Yogurt', brand: 'Strauss', category: 'Food', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Tabor Wine', brand: 'Tabor', category: 'Beverages', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Teva Generic Drugs', brand: 'Teva', category: 'Pharmaceuticals', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Tivall Vegetarian Products', brand: 'Tivall', category: 'Food', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Tnuva Milk', brand: 'Tnuva', category: 'Food', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Uvision Loitering Munitions', brand: 'UVision', category: 'Defense', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Waze App', brand: 'Waze', category: 'Tech', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Wissotzky Tea', brand: 'Wissotzky', category: 'Beverages', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'Wix Website Builder', brand: 'Wix', category: 'Tech', supportsIsrael: true, submitted_by: 'Admin' },
    { name: 'ZIM Shipping Services', brand: 'ZIM Integrated Shipping', category: 'Logistics', supportsIsrael: true, submitted_by: 'Admin' },
  ].sort((a, b) => a.name.localeCompare(b.name));

  const products = [...staticProducts, ...userSubmittedProducts].sort((a, b) => a.name.localeCompare(b.name));
  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const passesSupportCheck = excludeSupporters ? !product.supportsIsrael : true;
    return matchesSearch && matchesCategory && passesSupportCheck;
  });

  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setPage(pageNumber);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductRequest((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      console.log('Selected file:', file.name, file.size, file.type);
      setProductRequest((prev) => ({ ...prev, image_logo_file: file }));
    }
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');

    if (!productRequest.submitted_by.trim()) {
      toast.error('Please enter your name.');
      setSubmitStatus('error');
      return;
    }

    let imagePath = null;
    if (productRequest.image_logo_file) {
      if (!(productRequest.image_logo_file instanceof File)) {
        toast.error('Invalid file object. Please select a valid image.');
        setSubmitStatus('error');
        return;
      }

      const fileExt = productRequest.image_logo_file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;

      try {
        console.log('Attempting to upload image:', fileName);
        const { data, error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(fileName, productRequest.image_logo_file, {
            cacheControl: '3600',
            upsert: false,
            contentType: productRequest.image_logo_file.type,
          });

        if (uploadError) {
          console.error('Image upload failed:', uploadError.message);
          toast.error('Failed to upload image. Please try again.');
          setSubmitStatus('error');
          return;
        }

        if (!data) {
          toast.error('No data returned from upload.');
          setSubmitStatus('error');
          return;
        }

        imagePath = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product-images/${fileName}`;
        console.log('Image uploaded successfully:', imagePath);

        const response = await fetch(imagePath, { method: 'HEAD' });
        if (!response.ok) {
          console.error('Image URL not accessible:', response.status, response.statusText);
          toast.error('Uploaded image is not accessible.');
          setSubmitStatus('error');
          return;
        }
      } catch (uploadError) {
        console.error('Unexpected error during image upload:', uploadError);
        toast.error('An unexpected error occurred during image upload.');
        setSubmitStatus('error');
        return;
      }
    }

    try {
      console.log('Inserting form data into product_requests');
      const { error: insertError } = await supabase
        .from('product_requests')
        .insert([
          {
            name: productRequest.name,
            image_logo: imagePath || productRequest.image_logo_url || null,
            barcode: productRequest.barcode || null,
            category: productRequest.category || null,
            comment: productRequest.comment || null,
            evidence_link: productRequest.evidence_link || null,
            alternative_products: productRequest.alternative_products || null,
            status: 'pending',
            submitted_by: productRequest.submitted_by,
            created_at: new Date().toISOString(),
          },
        ]);

      if (insertError) {
        console.error('Database insert failed:', insertError.message);
        toast.error('Failed to submit request. Please try again.');
        setSubmitStatus('error');
        return;
      }

      console.log('Form data inserted successfully');
      setSubmitStatus('success');
      setShowSuccessPopup(true);
      setProductRequest({
        name: '',
        image_logo_file: null,
        image_logo_url: '',
        barcode: '',
        category: '',
        comment: '',
        evidence_link: '',
        alternative_products: '',
        submitted_by: '',
      });
      setTimeout(() => {
        setShowAddForm(false);
        setShowSuccessPopup(false);
        setSubmitStatus('idle');
      }, 2000);
    } catch (insertError) {
      console.error('Error submitting form data:', insertError);
      toast.error('An error occurred while submitting your request.');
      setSubmitStatus('error');
    }
  };

  useEffect(() => {
    const fetchApprovedProducts = async () => {
      const { data, error } = await supabase
        .from('product_requests')
        .select('name, barcode, category, submitted_by, image_logo')
        .eq('status', 'approved');

      if (error) {
        console.error('Error fetching approved products:', error);
      } else {
        const approvedProducts = data.map((item) => ({
          name: item.name,
          brand: item.name.split(' ')[0],
          category: item.category || 'Other',
          supportsIsrael: true,
          submitted_by: item.submitted_by || 'Unknown',
          image_logo: item.image_logo || undefined,
        }));
        setUserSubmittedProducts(approvedProducts);
      }
    };

    fetchApprovedProducts();
    trackVisitor({ page_url: window.location.href });

    const subscription = supabase
      .channel('product_requests')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'product_requests' }, (payload) => {
        if (payload.new.status === 'approved') {
          const newProduct = {
            name: payload.new.name,
            brand: payload.new.name.split(' ')[0],
            category: payload.new.category || 'Other',
            supportsIsrael: true,
            submitted_by: payload.new.submitted_by || 'Unknown',
            image_logo: payload.new.image_logo || undefined,
          };
          setUserSubmittedProducts((prev) => [...prev, newProduct]);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>A-Z Israeli Products to Boycott - NoThanks Guide</title>
        <meta
          name="description"
          content="Complete A-Z list of Israeli products and brands to boycott with NoThanks. Search by name or category and download the app for more details."
        />
        <meta
          name="keywords"
          content="Israeli products boycott list, NoThanks A-Z guide, boycott brands, search Israeli products, food, cosmetics, tech, beverages, pharmaceuticals"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="NoThanks Team" />
        <link rel="canonical" href="https://nothanks.vercel.app/products" />
      </Helmet>

      <div className="min-h-screen pt-24 pb-16 bg-gray-50">
        <section className="relative bg-gradient-to-br from-[#4baa4d] to-green-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              A-Z Israeli Products to <span className="text-red-400">Boycott</span>
            </motion.h1>
            <motion.p
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              className="text-lg md:text-xl max-w-2xl mx-auto mb-8"
            >
              Browse our full list of Israeli brands and products to avoid.
            </motion.p>
            <motion.a
              href="/download"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center bg-white text-[#4baa4d] px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FaDownload className="mr-2" />
              Download Now
            </motion.a>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative mb-8">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products or brands..."
                className="w-full p-4 pl-12 pr-12 rounded-full border-2 border-gray-300 focus:border-[#4baa4d] focus:outline-none text-gray-800 shadow-sm hover:shadow-md transition-all"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              {searchTerm && (
                <FaTimes
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-[#4baa4d]"
                  onClick={() => setSearchTerm('')}
                />
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full font-medium ${
                  !selectedCategory ? 'bg-[#4baa4d] text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium ${
                    selectedCategory === category
                      ? 'bg-[#4baa4d] text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-6 text-center">
              <label className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={excludeSupporters}
                  onChange={(e) => setExcludeSupporters(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-[#4baa4d]"
                />
                <span className="text-gray-700 font-medium">Exclude products that support Israel</span>
              </label>
            </div>
          </div>

          <div className="text-center mb-8">
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center bg-[#4baa4d] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-[#3d8c3f] transition-all duration-300"
            >
              <FaPlus className="mr-2" />
              Add Product
            </button>
          </div>

          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4 py-6"
            >
              <div className="bg-white p-6 sm:p-8 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#4baa4d] mb-6 text-center">Submit a Product</h2>
                <form onSubmit={handleSubmitRequest} className="space-y-4 sm:space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={productRequest.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4baa4d] focus:border-transparent transition-all"
                      placeholder="Enter product name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="submitted_by"
                      value={productRequest.submitted_by}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4baa4d] focus:border-transparent transition-all"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category (Optional)</label>
                    <select
                      name="category"
                      value={productRequest.category}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4baa4d] focus:border-transparent transition-all"
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image (Optional)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#4baa4d] file:text-white hover:file:bg-[#3d8c3f] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (Optional)</label>
                    <input
                      type="url"
                      name="image_logo_url"
                      value={productRequest.image_logo_url}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4baa4d] focus:border-transparent transition-all"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Barcode (Optional)</label>
                    <input
                      type="text"
                      name="barcode"
                      value={productRequest.barcode}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4baa4d] focus:border-transparent transition-all"
                      placeholder="Enter barcode"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                    <textarea
                      name="comment"
                      value={productRequest.comment}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4baa4d] focus:border-transparent transition-all"
                      rows={3}
                      placeholder="Add a comment or explanation"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Evidence Link</label>
                    <input
                      type="url"
                      name="evidence_link"
                      value={productRequest.evidence_link}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4baa4d] focus:border-transparent transition-all"
                      placeholder="https://example.com/evidence"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alternative Products</label>
                    <input
                      type="text"
                      name="alternative_products"
                      value={productRequest.alternative_products}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4baa4d] focus:border-transparent transition-all"
                      placeholder="Suggest alternatives"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="w-full sm:w-auto px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitStatus === 'submitting'}
                      className="w-full sm:w-auto px-5 py-2 bg-[#4baa4d] text-white rounded-lg hover:bg-[#3d8c3f] disabled:bg-gray-400 transition-all"
                    >
                      {submitStatus === 'submitting' ? 'Submitting...' : 'Submit'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {showSuccessPopup && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
                <FaCheckCircle className="text-[#4baa4d] text-5xl mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
                <p className="text-gray-600">Your product request has been submitted successfully.</p>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.length > 0 ? (
              currentProducts.map((product, index) => (
                <motion.div
                  key={product.name}
                  variants={fadeInVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl flex flex-col border border-gray-100"
                >
                  {product.image_logo && (
                    <img
                      src={product.image_logo}
                      alt={`${product.name} logo`}
                      className="w-16 h-16 object-contain mx-auto mb-4 rounded-md"
                      onError={(e) => (e.currentTarget.style.display = 'none')} // Hide if image fails to load
                    />
                  )}
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">{product.name}</h3>
                  <p className="text-gray-600 text-sm">Brand: {product.brand}</p>
                  <p className="text-gray-500 text-sm">Category: {product.category}</p>
                  <p className="text-gray-400 text-xs mt-1">Submitted by: {product.submitted_by}</p>
                  {product.supportsIsrael && (
                    <span className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-1 rounded-full self-start mt-2">
                      ⚠️ Supports Israel
                    </span>
                  )}
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">No products found matching your search.</p>
            )}
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={() => paginate(page - 1)}
              disabled={page === 1}
              className="px-5 py-2 rounded-full bg-[#4baa4d] text-white disabled:bg-gray-300 hover:bg-[#3d8c3f] transition-all"
            >
              Prev
            </button>
            <button
              onClick={() => paginate(page + 1)}
              disabled={indexOfLastProduct >= filteredProducts.length}
              className="px-5 py-2 rounded-full bg-[#4baa4d] text-white disabled:bg-gray-300 hover:bg-[#3d8c3f] transition-all"
            >
              Next
            </button>
          </div>
        </section>

        <section className="bg-gradient-to-br from-[#4baa4d] to-green-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div variants={fadeInVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Need More Details?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Install the NoThanks app to scan products and access our full database anytime, anywhere.
              </p>
              <motion.a
                href="/download"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-white text-[#4baa4d] px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FaDownload className="mr-2" />
                Get the App
              </motion.a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Products;