import { motion } from "framer-motion";

const Inbox: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      variants={cardVariants}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-4 text-black">Inbox</h2>
      <p className="text-gray-600">No messages yet. Coming soon!</p>
      {/* Add inbox functionality here */}
    </motion.div>
  );
};

export default Inbox;