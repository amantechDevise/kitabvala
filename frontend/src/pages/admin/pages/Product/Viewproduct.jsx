import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";

function ViewProduct() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const { id: productId } = useParams();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    punjabi_name: "",
    price: "",
    stock: "",
    category_id: "",
    description: "",
  });
  const [oldImageUrl, setOldImageUrl] = useState(null);

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

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/admin/products/details/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      console.log(res);

      const product = res.data.data;
      setFormData({
        name: product.name,
        punjabi_name: product.punjabi_name,
        price: product.price,
        stock: product.stock,
        category_id: product.category_id,
        description: product.description,
      });
      setRatings(product.ratings || []);
      if (product.ratings && product.ratings.length > 0) {
        const total = product.ratings.reduce((sum, r) => sum + r.rating, 0);
        const avg = total / product.ratings.length;
        setAverageRating(avg.toFixed(1)); // Rounded to 1 decimal place
      } else {
        setAverageRating(null);
      }
      setOldImageUrl(`${API_BASE_URL}/${product.image}`);
      setRatings(product.ratings || []); // Set ratings here
    } catch (err) {
      console.error("Error fetching product:", err);
      toast.error("Failed to load product details");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProduct();
  }, []);

  const getCategoryName = (id) => {
    const category = categories.find((c) => c.id === id);
    return category ? category.name : "";
  };

  return (
    <>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-full bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Product Details</h2>

          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2 mb-5">
              <p className="font-medium text-[#07074D] mb-1">Name:</p>
              <p className="text-[#6B7280]">{formData.name}</p>
            </div>

            <div className="w-full px-3 sm:w-1/2 mb-5">
              <p className="font-medium text-[#07074D] mb-1">Punjabi Name:</p>
              <p className="text-[#6B7280]">{formData.punjabi_name}</p>
            </div>
          </div>

          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2 mb-5">
              <p className="font-medium text-[#07074D] mb-1">Price:</p>
              <p className="text-[#6B7280]">₹{formData.price}</p>
            </div>

            <div className="w-full px-3 sm:w-1/2 mb-5">
              <p className="font-medium text-[#07074D] mb-1">Stock:</p>
              <p className="text-[#6B7280]">{formData.stock}</p>
            </div>
          </div>

          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2 mb-5">
              <p className="font-medium text-[#07074D] mb-1">Image:</p>
              {oldImageUrl && (
                <img
                  src={oldImageUrl}
                  alt="Product"
                  className="h-32 w-40 rounded-md border"
                />
              )}
            </div>

            <div className="w-full px-3 sm:w-1/2 mb-5">
              <p className="font-medium text-[#07074D] mb-1">Category:</p>
              <p className="text-[#6B7280]">
                {getCategoryName(formData.category_id)}
              </p>
            </div>
          </div>

          <div className="mb-5">
            <p className="font-medium text-[#07074D] mb-1">Description:</p>
            <p className="text-[#6B7280] whitespace-pre-wrap">
              {formData.description}
            </p>
          </div>
          <div className="mb-5">
            <p className="font-medium text-[#07074D] mb-1"> Average Rating:</p>
            {averageRating !== null && (
              <div className="mb-4">
                <p className="text-lg font-medium text-[#07074D]">
                  ⭐ Average Rating:{" "}
                  <span className="text-[#6B7280]">{averageRating} / 5</span>
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-6">
            <Link
              to="/admin/products"
              className="text-[#6A64F1] font-semibold hover:underline"
            >
              Back
            </Link>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-5 ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Ratings</h2>
        </div>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">SR.NO</th>
              <th className="px-6 py-3">User Name</th>
              <th className="px-6 py-3">Rating</th>
              <th className="px-6 py-3">Review</th>
            </tr>
          </thead>
          <tbody>
            {ratings.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No ratings found.
                </td>
              </tr>
            ) : (
              ratings.map((rating, index) => (
                <tr
                  key={rating.id}
                  className="bg-white border-b hover:bg-gray-100"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">
                    {rating.user?.name || "Unknown"}
                  </td>
                  <td className="px-6 py-4 flex items-center space-x-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(rating.rating)
                              ? "fill-current"
                              : "text-gray-300"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.538 1.118l-3.388-2.462a1 1 0 00-1.175 0l-3.388 2.462c-.783.57-1.838-.197-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
                        </svg>
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-4">{rating.review}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ViewProduct;
