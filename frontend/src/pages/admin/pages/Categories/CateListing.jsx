import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryModal from "../../components/CategoryModal";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
   const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/category`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

   const handleModalSubmit = async (formData) => {
    try {
      if (modalData) {
        // Update existing category
        const response = await axios.put(
          `${API_BASE_URL}/admin/category/update/${modalData.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          }
        );
        toast.success(response.data.message || "Category updated");
      } else {
        // Add new category
        const response = await axios.post(
          `${API_BASE_URL}/admin/category/add`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          }
        );
        toast.success(response.data.message || "Category added");
      }
      setIsModalOpen(false);
      fetchCategories(); // refresh list
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error(
        error?.response?.data?.message || "Failed to save category"
      );
    }
  };
  // Toggle category status
  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;

    try {
      const response = await axios.patch(
        `${API_BASE_URL}/admin/category/${id}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      toast.success(response.data.message || "Status updated successfully");

      // Update the UI
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === id ? { ...cat, status: newStatus } : cat
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(
        error?.response?.data?.message || "Failed to update status"
      );
    }
  };

    const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Category?"))
      return;

    try {
      await axios.delete(`${API_BASE_URL}/admin/category/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      toast.success("Category deleted successfully!");
      fetchCategories(); // Refresh list
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete Category");
    }
  };
  return (
    <div className="p-4">
      <ToastContainer position="top-right" autoClose={3000} />
       <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Category List</h2>
                <button
          onClick={() => {
            setModalData(null); // clear modal data for create
            setIsModalOpen(true);
          }}
          className="text-white bg-black px-4 py-2 rounded hover:bg-gray-800 transition"
          style={{ whiteSpace: "nowrap" }}
        >
          Add Category
        </button>
            </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">SR.NO</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
               <td colSpan="5" className="text-center py-4">
    <img src="/oder.jpg" alt="" className="inline-block w-70 h-70" />
  </td>
              </tr>
            ) : (
              categories.map((category, index) => (
                <tr
                  key={category.id}
                  className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {category.name}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        handleStatusToggle(category.id, category.status)
                      }
                      className={`px-3 py-1 rounded ${
                        category.status === 1
                          ? "bg-green-500"
                          : "bg-red-500"
                      } text-white hover:opacity-80 transition`}
                    >
                      {category.status === 1 ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                      <button
                    onClick={() => {
                      setModalData(category); 
                      setIsModalOpen(true);
                    }}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Edit
                  </button>
                      <button
                    onClick={() => handleDelete(category.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
         <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={modalData}
      />
    </div>
  );
};

export default CategoryList;
