import { motion } from "framer-motion";
import { FaCamera, FaSearch, FaBan, FaDownload } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { trackVisitor } from "../lib/trackVisitor"; // Import the tracking function

const Home: React.FC = () => {
  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const heroChildVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const featureVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  // Track visitor when the page loads
  useEffect(() => {
    trackVisitor({
      page_url: window.location.href,
    });
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <>
      <Helmet>
        <title>NoThanks - Boycott Israeli Products | Empower Gaza & Palestine</title>
        <meta
          name="description"
          content="NoThanks: Scan, search, and boycott Israeli products to support Gaza and Palestine. Join a modern movement for justice with our sleek app."
        />
        <meta
          name="keywords"
          content="NoThanks, boycott Israeli products, Gaza, Palestine, barcode scanner, ethical choices, modern app, justice movement"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="NoThanks Team" />
        <meta property="og:title" content="NoThanks - Boycott Israeli Products" />
        <meta
          property="og:description"
          content="Support Gaza & Palestine by boycotting Israeli products with NoThanks."
        />
        <meta property="og:image" content="https://www.nothanks.app/og-image.jpg" />
        <meta property="og:url" content="https://nothanks.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://nothanks.vercel.app/" />
      </Helmet>

      <div className="min-h-screen font-sans antialiased">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary to-green-700 text-white pt-16 pb-20 overflow-hidden lg:pt-32 lg:pb-24">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div variants={heroVariants} initial="hidden" animate="visible" className="text-center">
              <motion.h1
                variants={heroChildVariants}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-red-400"
              >
                Say <span className="underline decoration-wavy decoration-red-400">No</span> to Israeli Products
              </motion.h1>
              <motion.p
                variants={heroChildVariants}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto mb-8 lg:mb-10 leading-relaxed text-gray-100"
              >
                Stand with Gaza and Palestine. Scan, search, and boycott with NoThanks – a modern tool for justice.
              </motion.p>
              <motion.a
                href="/download"
                variants={heroChildVariants}
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-white text-primary px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-4 rounded-full font-semibold text-lg sm:text-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-opacity-90 backdrop-blur-md"
              >
                <FaDownload className="mr-2 sm:mr-3" />
                Get the App
              </motion.a>
            </motion.div>
          </div>
          <div
            className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
            style={{
              backgroundImage:
                "url(https://www.newarab.com/sites/default/files/styles/image_684x385/public/2205261599.jpeg?h=a5f2f23a&itok=V2YChInF)",
            }}
          />
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg viewBox="0 0 1440 120" className="fill-white opacity-90">
              <path d="M0,96L48,85.3C96,75,192,53,288,48C384,43,480,53,576,64C672,75,768,85,864,80C960,75,1056,53,1152,48C1248,43,1344,53,1392,58.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
            </svg>
          </div>
        </section>

        {/* Mission Section */}
        <section className="container mx-auto px-4 py-16 bg-gradient-to-b from-white to-gray-100 sm:px-6 lg:px-8 lg:py-20">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-10 lg:mb-14 text-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-green-700"
          >
            Our Mission for Gaza & Palestine
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto text-center leading-relaxed text-gray-800"
          >
            Gaza, home to 2 million resilient souls, faces a suffocating blockade—yet its spirit shines. NoThanks equips you to boycott Israeli products, fueling Palestine’s fight for freedom. Every scan is a rebellion against oppression.
          </motion.p>
          <motion.img
            src="https://images.theconversation.com/files/553010/original/file-20231010-25-rr34z3.jpg?ixlib=rb-4.1.0&rect=0%2C0%2C5760%2C3837&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip"
            alt="Palestinian resilience"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mt-10 mx-auto rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl object-cover border-4 border-white"
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 50vw"
          />
        </section>

        {/* Features Section */}
        <section className="bg-white py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 lg:mb-16 text-black"
            >
              How It Works
            </motion.h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 sm:gap-10">
              {[
                { icon: FaCamera, title: "Scan Barcodes", desc: "Instantly spot Israeli products with a tap." },
                { icon: FaSearch, title: "Search Products", desc: "Pinpoint items by serial number effortlessly." },
                { icon: FaBan, title: "Boycott List", desc: "Dive into our dynamic database of no-gos." },
              ].map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={featureVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg text-center transition-all duration-300 border border-gray-200 hover:border-primary hover:shadow-xl"
                >
                  <feature.icon className="text-primary text-4xl sm:text-5xl mx-auto mb-4 sm:mb-6 animate-pulse" />
                  <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-black">{feature.title}</h3>
                  <p className="text-gray-600 text-base sm:text-lg">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gaza & Palestine Context Section */}
        <section className="relative bg-gradient-to-br from-primary to-green-700 text-white py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 lg:mb-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-red-400"
            >
              Why Gaza & Palestine Need You
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl mb-8 lg:mb-10 max-w-4xl mx-auto text-center leading-relaxed text-gray-100"
            >
              Palestine resists decades of occupation, while Gaza endures sieges that choke access to food, water, and medicine. “Whoever relieves a believer’s distress, Allah will relieve theirs” (Sahih Bukhari). Boycotting Israeli products cuts the economic lifeline of injustice.
            </motion.p>
            <motion.img
              src="https://images.theconversation.com/files/553010/original/file-20231010-25-rr34z3.jpg?ixlib=rb-4.1.0&rect=0%2C0%2C5760%2C3837&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip"
              alt="Hope in Gaza"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mt-8 mx-auto rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl object-cover border-4 border-white"
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 50vw"
            />
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl mt-8 lg:mt-10 max-w-4xl mx-auto text-center leading-relaxed text-gray-100"
            >
              “Do not lose hope, nor be sad” – Quran 3:139. With NoThanks, every choice fuels Gaza’s dreams and Palestine’s future.
            </motion.p>
          </div>
          <div className="absolute inset-0 opacity-10 animate-pulse">
            <svg className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="white" />
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
            </svg>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-primary to-green-700 text-white py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 lg:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-red-400">
                Join the Movement
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl mb-8 lg:mb-10 max-w-3xl mx-auto text-gray-100">
                Download NoThanks and wield the power to boycott Israeli products, standing tall with Gaza and Palestine.
              </p>
              <motion.a
                href="/download"
                whileHover={{ scale: 1.05, rotate: 3 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-white text-primary px-8 py-4 sm:px-10 sm:py-5 lg:px-12 lg:py-5 rounded-full font-semibold text-xl sm:text-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-opacity-90 backdrop-blur-md"
              >
                <FaDownload className="mr-3 sm:mr-4" />
                Download Now
              </motion.a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;