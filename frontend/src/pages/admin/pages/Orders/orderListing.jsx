import { useEffect, useState } from "react";
import axios from "axios";

function OrderListing() {
  const [order, setOrders] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/order_us`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching order list:", error);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Orders List</h2>
      </div>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">SR.NO</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Phone</th>
            <th className="px-6 py-3">Message</th>
          </tr>
        </thead>
        <tbody>
          {order.length === 0 ? (
          <tr>
  <td colSpan="5" className="text-center py-4">
    <img src="/oder.jpg" alt="" className="inline-block w-70 h-70" />
  </td>
</tr>

          ) : (
            order.map((order, index) => (
              <tr
                key={order.id}
                className="bg-white border-b hover:bg-gray-100"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{order.name}</td>
                <td className="px-6 py-4">{order.email}</td>
                <td className="px-6 py-4">{order.phone}</td>
                <td className="px-6 py-4">{order.message}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrderListing;
