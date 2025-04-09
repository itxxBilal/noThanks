import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { logout } from "../lib/auth";
import Visitor from "./Visitor";
import Inbox from "./Inbox";
import { FaChartLine, FaEnvelope, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("visitors"); // Track active section

  const handleLogout = async () => {
    await logout();
    navigate("/dashboard"); // Redirects to login
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, duration: 0.8 },
    },
  };

  const sidebarVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  const navItems = [
    { id: "visitors", label: "Visitors", icon: FaUsers },
    { id: "inbox", label: "Inbox", icon: FaEnvelope },
    { id: "analytics", label: "Analytics", icon: FaChartLine }, // Placeholder for future
  ];

  return (
    <div className="min-h-screen top-14 relative bg-gray-100 flex font-sans antialiased">
      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        className="w-64 bg-white shadow-lg p-6 fixed h-full lg:static lg:h-auto"
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black">NoThanks</h2>
          <p className="text-sm text-gray-500">Admin Dashboard</p>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
                activeSection === item.id
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="mr-3 text-lg" />
              {item.label}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200"
          >
            <FaSignOutAlt className="mr-3 text-lg" />
            Logout
          </button>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <motion.header
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white shadow-md p-4 flex justify-between items-center"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            {navItems.find((item) => item.id === activeSection)?.label} Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 hidden sm:block">Welcome, Admin</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300 lg:hidden"
            >
              Logout
            </button>
          </div>
        </motion.header>

        {/* Content Area */}
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 p-4 sm:p-6 lg:p-8"
        >
          <div className="grid grid-cols-1 gap-6">
            {activeSection === "visitors" && (
              <>
                {/* Top 30 Visitors Highlight */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-r from-primary to-green-700 text-white p-6 rounded-lg shadow-lg"
                >
                  <h2 className="text-xl font-semibold mb-2">Top 30 Recent Visitors</h2>
                  <p className="text-sm">
                    Highlighting the most recent activity on your site.
                  </p>
                </motion.div>
                <Visitor />
              </>
            )}
            {activeSection === "inbox" && <Inbox />}
            {activeSection === "analytics" && (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-black">Analytics</h2>
                <p className="text-gray-600">Coming soon!</p>
              </div>
            )}
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default Dashboard;