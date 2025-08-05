import { useEffect, useState } from "react";
import axios from "axios";

function ContactUsList() {
  const [contacts, setContacts] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/contact_us`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setContacts(response.data.data);
    } catch (error) {
      console.error("Error fetching contact list:", error);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Contact Us List</h2>
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
          {contacts.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
    <img src="/oder.jpg" alt="" className="inline-block w-70 h-70" />
  </td>
            </tr>
          ) : (
            contacts.map((contact, index) => (
              <tr
                key={contact.id}
                className="bg-white border-b hover:bg-gray-100"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{contact.name}</td>
                <td className="px-6 py-4">{contact.email}</td>
                <td className="px-6 py-4">{contact.phone}</td>
                <td className="px-6 py-4">{contact.message}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ContactUsList;
