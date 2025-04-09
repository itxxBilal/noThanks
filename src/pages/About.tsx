import { motion } from "framer-motion";
import { FaInfoCircle, FaUsers, FaShieldAlt } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { trackVisitor } from "../lib/trackVisitor"; // Import the tracking utility

const About: React.FC = () => {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
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
      {/* SEO Meta Tags */}
      <Helmet>
        <title>About NoThanks - Boycott Israeli Products Movement</title>
        <meta
          name="description"
          content="Learn about NoThanks, a platform dedicated to helping you boycott Israeli products through barcode scanning and product listing. Join our mission for ethical choices."
        />
        <meta
          name="keywords"
          content="NoThanks, about us, boycott Israeli products, ethical movement, barcode scanner app, product boycott list, conscious consumerism"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="NoThanks Team" />
        <link rel="canonical" href="https://www.nothanks.app/about" />
      </Helmet>

      <div className="min-h-screen pt-24 pb-16 bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary to-green-700 text-white py-20">
          <div className="container mx-auto px-4">
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                About <span className="text-red-400">NoThanks</span>
              </h1>
              <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                We’re here to empower you to say "No" to Israeli products with tools and information for conscious action.
              </p>
            </motion.div>
          </div>
          {/* Wave Effect */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg viewBox="0 0 1440 120" className="fill-white">
              <path d="M0,96L48,85.3C96,75,192,53,288,48C384,43,480,53,576,64C672,75,768,85,864,80C960,75,1056,53,1152,48C1248,43,1344,53,1392,58.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
            </svg>
          </div>
        </section>

        {/* Mission Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              NoThanks is a movement dedicated to helping individuals identify and boycott Israeli products. By providing an up-to-date list and powerful scanning tools, we aim to make it simple for you to take a stand and support ethical choices.
            </p>
          </motion.div>
        </section>

        {/* Values Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-12 text-black"
            >
              Our Values
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: FaInfoCircle, title: "Awareness", desc: "Educating users about Israeli products to boycott." },
                { icon: FaUsers, title: "Community", desc: "Building a united front for the boycott movement." },
                { icon: FaShieldAlt, title: "Integrity", desc: "Ensuring accurate, reliable product information." },
              ].map((value) => (
                <motion.div
                  key={value.title}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -10, boxShadow: "0px 15px 30px rgba(0,0,0,0.1)" }}
                  className="bg-white p-6 rounded-xl shadow-md text-center transition-all duration-300"
                >
                  <value.icon className="text-primary text-4xl mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3 text-black">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="container mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
              Be Part of the Change
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Join us in making a difference by downloading the NoThanks app and supporting the boycott of Israeli products.
            </p>
            <motion.a
              href="/download"
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Download Now
            </motion.a>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default About;