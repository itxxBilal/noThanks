import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";

interface Visitor {
  id: number;
  visited_at: string;
  ip_address: string | null;
  user_agent: string | null;
  page_url: string | null;
}

const Visitor: React.FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [dailyVisitors, setDailyVisitors] = useState(0);
  const [filter, setFilter] = useState("all"); // Filter: all, today, week
  const [loading, setLoading] = useState(true);

  // Fetch visitor stats
  const fetchVisitorStats = async () => {
    const { count: total } = await supabase.from("visitors").select("*", { count: "exact" });
    const today = new Date().toISOString().split("T")[0];
    const { count: daily } = await supabase
      .from("visitors")
      .select("*", { count: "exact" })
      .gte("visited_at", `${today}T00:00:00Z`);
    setTotalVisitors(total || 0);
    setDailyVisitors(daily || 0);
  };

  // Fetch filtered visitor data
  const fetchVisitors = async () => {
    let query = supabase
      .from("visitors")
      .select("*")
      .order("visited_at", { ascending: false })
      .limit(50);

    if (filter === "today") {
      const today = new Date().toISOString().split("T")[0];
      query = query.gte("visited_at", `${today}T00:00:00Z`);
    } else if (filter === "week") {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      query = query.gte("visited_at", weekAgo);
    }

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching visitors:", error);
    } else {
      setVisitors(data || []);
    }
    setLoading(false);
  };

  // Real-time subscription
  useEffect(() => {
    fetchVisitors();
    fetchVisitorStats();

    const subscription = supabase
      .channel("visitors-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "visitors" },
        (payload) => {
          setVisitors((prev) => [payload.new as Visitor, ...prev].slice(0, 50));
          setTotalVisitors((prev) => prev + 1);
          const today = new Date().toISOString().split("T")[0];
          if (payload.new.visited_at.includes(today)) {
            setDailyVisitors((prev) => prev + 1);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [filter]);

  // Export to CSV
  const exportToCSV = () => {
    const csvContent = [
      "ID,Visited At,IP Address,User Agent,Page URL",
      ...visitors.map((v) =>
        `${v.id},${v.visited_at},${v.ip_address || "N/A"},${v.user_agent || "N/A"},${v.page_url || "N/A"}`
      ),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "visitors.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div variants={cardVariants} className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-black">Visitors</h2>
        <button
          onClick={exportToCSV}
          className="flex items-center bg-primary text-white px-3 py-1 rounded-md hover:bg-green-700"
        >
          <FaDownload className="mr-2" /> Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm text-gray-600">Total Visitors</p>
          <p className="text-2xl font-bold text-black">{totalVisitors}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm text-gray-600">Today’s Visitors</p>
          <p className="text-2xl font-bold text-black">{dailyVisitors}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4">
        <label className="mr-2 text-sm text-gray-600">Filter:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1"
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">Last 7 Days</option>
        </select>
      </div>

      {/* Visitor Table */}
      {loading ? (
        <p className="text-gray-600">Loading visitors...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gradient-to-r from-primary to-green-700 text-white">
              <tr>
                <th className="py-2 px-4 text-sm font-semibold">Time</th>
                <th className="py-2 px-4 text-sm font-semibold">IP Address</th>
                <th className="py-2 px-4 text-sm font-semibold">Page URL</th>
              </tr>
            </thead>
            <tbody>
              {visitors.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-4 px-4 text-center text-gray-500">
                    No visitors yet.
                  </td>
                </tr>
              ) : (
                visitors.map((visitor) => (
                  <tr
                    key={visitor.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-2 px-4 text-sm">
                      {new Date(visitor.visited_at).toLocaleString()}
                    </td>
                    <td className="py-2 px-4 text-sm">{visitor.ip_address || "N/A"}</td>
                    <td className="py-2 px-4 text-sm truncate max-w-xs">
                      {visitor.page_url || "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default Visitor;