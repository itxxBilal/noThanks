// src/pages/Download.tsx
import { motion } from 'framer-motion';
import { FaGooglePlay, FaApple, FaMobileAlt } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { useEffect } from "react";
import { trackVisitor } from "../lib/trackVisitor"; // Import the tracking utility




const Download: React.FC = () => {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05, 
      boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
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
        <title>Download NoThanks - Boycott Israeli Products App</title>
        <meta 
          name="description" 
          content="Download NoThanks for iOS and Android to scan barcodes and boycott Israeli products. Get the app now and join the movement!" 
        />
        <meta 
          name="keywords" 
          content="NoThanks download, boycott Israeli products app, barcode scanner download, iOS app, Android app, ethical choices, boycott movement" 
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="NoThanks Team" />
        <link rel="canonical" href="https://www.nothanks.app/download" />
      </Helmet>

      <div className="min-h-screen pt-24 pb-16 bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary to-green-700 text-white py-20 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Download <span className="text-red-400 underline decoration-wavy">NoThanks</span>
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
                Get the app and start boycotting Israeli products today with just a scan.
              </p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex justify-center"
              >
                <FaMobileAlt className="text-6xl md:text-8xl text-white opacity-80" />
              </motion.div>
            </motion.div>
          </div>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="white" />
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
            </svg>
          </div>
          {/* Wave Effect */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg viewBox="0 0 1440 120" className="fill-white">
              <path d="M0,96L48,85.3C96,75,192,53,288,48C384,43,480,53,576,64C672,75,768,85,864,80C960,75,1056,53,1152,48C1248,43,1344,53,1392,58.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
            </svg>
          </div>
        </section>

        {/* Download Buttons Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-black"
          >
            Available on Your Device
          </motion.h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-2xl mx-auto">
            {[
              {
                icon: FaGooglePlay,
                text: 'Google Play',
                link: 'https://play.google.com/store/apps/details?id=com.bashsoftware.boycott&pcampaignid=web_share',
                label: 'Android'
              },
              {
                icon: FaApple,
                text: 'App Store',
                link: 'https://apps.apple.com/us/app/no-thanks-app/id6476206516',
                label: 'iOS'
              }
            ].map((store) => (
              <motion.a
                key={store.text}
                href={store.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center bg-gradient-to-r from-primary to-green-600 text-white px-8 py-6 rounded-xl font-semibold text-lg shadow-lg w-full md:w-auto transition-all duration-300"
              >
                <store.icon className="text-3xl mr-4" />
                <div>
                  <p className="text-sm opacity-80">Get it on</p>
                  <p className="text-xl">{store.text}</p>
                  <p className="text-sm font-normal">{store.label}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Features Highlight */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6 text-black"
            >
              Why Download NoThanks?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto"
            >
              Take control with these powerful features to boycott Israeli products.
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                'Scan barcodes instantly',
                'Search our boycott list',
                'Lightweight and secure'
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="bg-white p-6 rounded-xl shadow-md"
                >
                  <p className="text-gray-800 font-medium">{feature}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-br from-primary to-green-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Start Boycotting Now
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Download NoThanks and join the global movement against Israeli products.
              </p>
              <motion.a
                href="#download-buttons"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started
              </motion.a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Download;