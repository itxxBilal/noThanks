// src/pages/Products.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaTimes, FaDownload } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { trackVisitor } from '../lib/trackVisitor';


interface Product {
  name: string;
  brand: string;
  category: string;
}

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Comprehensive A-to-Z list of Israeli products (expanded)
  const products: Product[] = [
    { name: 'Ahava Cream', brand: 'Ahava', category: 'Cosmetics' },
    { name: 'Arak', brand: 'Elite', category: 'Beverages' },
    { name: 'Bamba', brand: 'Osem', category: 'Food' },
    { name: 'Bissli', brand: 'Osem', category: 'Food' },
    { name: 'Check Point Firewall', brand: 'Check Point', category: 'Tech' },
    { name: 'Daniella Lehavi Handbag', brand: 'Daniella Lehavi', category: 'Fashion' },
    { name: 'Eden Spring Water', brand: 'Eden Spring', category: 'Beverages' },
    { name: 'Fiverr Services', brand: 'Fiverr', category: 'Tech' },
    { name: 'Gamila Secret Soap', brand: 'Gamila Secret', category: 'Cosmetics' },
    { name: 'Haaretz Newspaper', brand: 'Haaretz', category: 'Media' },
    { name: 'Jaffa Oranges', brand: 'Jaffa', category: 'Food' },
    { name: 'Keter Storage Box', brand: 'Keter', category: 'Household' },
    { name: 'Laline Body Cream', brand: 'Laline', category: 'Cosmetics' },
    { name: 'Max Brenner Chocolates', brand: 'Max Brenner', category: 'Food' },
    { name: 'Mobileye System', brand: 'Mobileye', category: 'Tech' },
    { name: 'Moraz Skincare', brand: 'Moraz', category: 'Cosmetics' },
    { name: 'Nevo Spa Products', brand: 'Nevo', category: 'Cosmetics' },
    { name: 'Osem Pasta', brand: 'Osem', category: 'Food' },
    { name: 'Sabon Soap', brand: 'Sabon', category: 'Cosmetics' },
    { name: 'Sabra Hummus', brand: 'Sabra', category: 'Food' },
    { name: 'SodaStream Machine', brand: 'SodaStream', category: 'Tech' },
    { name: 'Strauss Yogurt', brand: 'Strauss', category: 'Food' },
    { name: 'Tabor Wine', brand: 'Tabor', category: 'Beverages' },
    { name: 'Teva Generic Drugs', brand: 'Teva', category: 'Pharmaceuticals' },
    { name: 'Tivall Vegetarian Products', brand: 'Tivall', category: 'Food' },
    { name: 'Tnuva Milk', brand: 'Tnuva', category: 'Food' },
    { name: 'Waze App', brand: 'Waze', category: 'Tech' },
    { name: 'Wissotzky Tea', brand: 'Wissotzky', category: 'Beverages' },
    { name: 'Wix Website Builder', brand: 'Wix', category: 'Tech' },
  ].sort((a, b) => a.name.localeCompare(b.name)); // Sort A to Z by name

  const categories = Array.from(new Set(products.map(p => p.category)));

  // Filter products based on search term and selected category
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
 // Track visitor when the page loads
  useEffect(() => {
    trackVisitor({
      page_url: window.location.href,
    });
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <>
      {/* SEO Meta Tags */}
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
        <link rel="canonical" href="https://www.nothanks.app/products" />
      </Helmet>

      <div className="min-h-screen pt-24 pb-16 bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary to-green-700 text-white py-20">
          <div className="container mx-auto px-4">
            <motion.h1
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-5xl font-bold text-center mb-6 tracking-tight"
            >
              A-Z Israeli Products to <span className="text-red-400">Boycott</span>
            </motion.h1>
            <motion.p
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              className="text-lg md:text-xl max-w-2xl mx-auto text-center leading-relaxed mb-8"
            >
              Browse our full list of Israeli brands and products to avoid.
            </motion.p>
            {/* App Promo */}
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              <p className="text-lg font-semibold mb-4">
                Want to know more? Install the NoThanks app!
              </p>
              <motion.a
                href="/download"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-white text-primary px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FaDownload className="mr-2" />
                Download Now
              </motion.a>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg viewBox="0 0 1440 120" className="fill-white">
              <path d="M0,96L48,85.3C96,75,192,53,288,48C384,43,480,53,576,64C672,75,768,85,864,80C960,75,1056,53,1152,48C1248,43,1344,53,1392,58.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
            </svg>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto mb-12">
            {/* Search Bar */}
            <div className="relative mb-8">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products or brands (e.g., Bamba, Wix)..."
                className="w-full p-4 pl-12 pr-12 rounded-full border-2 border-gray-300 focus:border-primary focus:outline-none text-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              {searchTerm && (
                <FaTimes
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-primary"
                  onClick={() => setSearchTerm('')}
                />
              )}
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  !selectedCategory ? 'bg-primary text-white shadow-md' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category ? 'bg-primary text-white shadow-md' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Products List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <motion.div
                  key={product.name}
                  variants={fadeInVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <h3 className="text-lg font-semibold text-black mb-2">{product.name}</h3>
                  <p className="text-gray-600">Brand: {product.brand}</p>
                  <p className="text-gray-500 text-sm">Category: {product.category}</p>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">No products found matching your search.</p>
            )}
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="bg-gradient-to-br from-primary to-green-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div variants={fadeInVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Need More Details?
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Install the NoThanks app to scan products and access our full database anytime, anywhere.
              </p>
              <motion.a
                href="/download"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
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