import { motion } from "framer-motion";
import { FaTwitter, FaGithub, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
      className="bg-gradient-to-br from-primary to-green-700 text-white py-12 lg:py-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-red-400">
              NoThanks
            </h3>
            <p className="text-gray-100 text-base sm:text-lg leading-relaxed">
              Empowering justice for Gaza and Palestine through conscious choices.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-xl font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/download", label: "Download" },
                { to: "/products", label: "Products" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-200 hover:text-white transition-colors duration-300 text-base sm:text-lg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-center sm:text-left">
            <h4 className="text-xl font-semibold mb-4 text-white">Connect With Us</h4>
            <div className="flex justify-center sm:justify-start gap-4">
              <a
                href="https://twitter.com/nothanksapp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-white transition-colors duration-300"
                aria-label="Twitter"
              >
                <FaTwitter className="text-2xl" />
              </a>
              <a
                href="https://github.com/nothanksapp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-white transition-colors duration-300"
                aria-label="GitHub"
              >
                <FaGithub className="text-2xl" />
              </a>
              <a
                href="mailto:support@nothanks.app"
                className="text-gray-200 hover:text-white transition-colors duration-300"
                aria-label="Email"
              >
                <FaEnvelope className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Contact/Support */}
          <div className="text-center sm:text-left">
            <h4 className="text-xl font-semibold mb-4 text-white">Support</h4>
            <p className="text-gray-100 text-base sm:text-lg">
              Have questions? Reach out to us at{" "}
              <a
                href="mailto:support@nothanks.app"
                className="underline hover:text-white transition-colors duration-300"
              >
                support@nothanks.app
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-200/30 text-center">
          <p className="text-gray-200 text-sm sm:text-base">
            &copy; {new Date().getFullYear()} NoThanks. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;