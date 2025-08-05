import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UserListing() {
  const [users, setUsers] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching contact list:", error);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Customers List</h2>
      </div>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">SR.NO</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Phone</th>
            <th className="px-6 py-3">Image</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                <img
                  src="/oder.jpg"
                  alt=""
                  className="inline-block w-70 h-70"
                />
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user.id} className="bg-white border-b hover:bg-gray-100">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4">
                  {user.image ? (
                    <img
                      src={`${API_BASE_URL}/${user.image || user.image}`}
                      alt={user.name}
                      className="w-16 h-12 object-cover rounded"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/admin/customers/${user.id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-4"
                  >
                    View
                  </Link>
                  <button className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserListing;
