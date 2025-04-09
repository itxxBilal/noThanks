import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Dashboard from "../Dashboard";
import Login from "../Dashboard/Login";
import { getCurrentUser } from "../lib/auth";

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - NoThanks</title>
        <meta
          name="description"
          content="NoThanks Dashboard: Track visitors, manage inbox, and more in real time."
        />
      </Helmet>
      <div className="min-h-screen bg-gray-100">{user ? <Dashboard /> : <Login />}</div>
    </>
  );
};

export default DashboardPage;