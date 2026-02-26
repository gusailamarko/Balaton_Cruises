import { useEffect, useState } from "react";
import { supabase } from "~/lib/supabase";

interface Booking {
  id: string;
  booking_date: string;
  season: string;
  status: string;
  total_people: number;
  total_price: number;
  created_at: string;
  extra_info: string | null;
  customer_email: string;
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
    <div className="min-h-screen bg-white text-black p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* Responsive table wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Date</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Season</th>
              <th className="border p-2">People</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Extra Info</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="border p-2 whitespace-nowrap">{b.booking_date}</td>
                <td className="border p-2 whitespace-nowrap">{b.customer_email}</td>
                <td className="border p-2 whitespace-nowrap">{b.season}</td>
                <td className="border p-2 whitespace-nowrap">{b.total_people}</td>
                <td className="border p-2 whitespace-nowrap">€{b.total_price}</td>
                <td className="border p-2 whitespace-nowrap">{b.status}</td>
                <td className="border p-2">{b.extra_info || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;