import { useEffect, useState } from "react";
import { supabase } from "~/lib/supabase";

interface Booking {
  id: string;
  name: string;
  email: string;
  date: string;
  amount: number;
  payment_status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      setBookings(data as Booking[]);
    };

    fetchBookings();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div style={{ maxWidth: 1000, margin: "60px auto" }}
    className="bg-white text-black"
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="cursor-pointer hover:bg-red-500">Logout</button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.name}</td>
              <td>{b.email}</td>
              <td>{b.date}</td>
              <td>€{b.amount}</td>
              <td>{b.payment_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;