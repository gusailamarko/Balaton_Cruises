import { useEffect, useState } from "react";
import { supabase } from "~/lib/supabase";
import AdminLogin from "components/AdminLogin";
import AdminDashboard from "components/AdminDashboard";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (data?.role === "admin") {
        setIsAdmin(true);
      }

      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!isAdmin) {
    return <AdminLogin onLoginSuccess={() => window.location.reload()} />;
  }

  return <AdminDashboard />;
}