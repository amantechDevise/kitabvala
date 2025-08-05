import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AddCart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user_id = 1;

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/items?user_id=${user_id}`
        );
        setCartItems(response.data.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

   useEffect(() => {
    localStorage.setItem('cartCount', cartItems.length);
    window.dispatchEvent(new Event('storage'));
  }, [cartItems]);
  const handleQuantityChange = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: parseInt(quantity) } : item
      )
    );
  };

  const handleImageClick = (productId) => {
    navigate(`/admin/products/add-image/${productId}`);
  };

  const handleRemoveItem = async (productId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/cart/remove`, {
        data: { product_id: productId }
      });
      // Remove the item from the local state
      setCartItems(prevItems => prevItems.filter(item => item.product_id !== productId));
    } catch (error) {
      console.error("Error removing item from cart:", error);
      // Optional: Show error message to user
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          <p className="text-center text-lg">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => {
            const imageUrl = item.product?.image
              ? `${API_BASE_URL}${item.product.image}`
              : "https://via.placeholder.com/600x500";

            // Calculate average rating
            const avgRating = item.product?.ratings?.length > 0
              ? item.product.ratings.reduce((acc, curr) => acc + curr.rating, 0) / item.product.ratings.length
              : 0;

            return (
              <div
                key={item.id}
                className="flex flex-wrap -mx-4 mb-8 bg-white p-6 rounded-lg shadow-md relative"
              >
                {/* Remove button (X icon) */}
                <button 
                  onClick={() => handleRemoveItem(item.product_id)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-500 focus:outline-none"
                  aria-label="Remove item"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>

                {/* Rest of your cart item JSX remains the same */}
                {/* Product Images */}
                <div className="w-full md:w-1/2 px-4 mb-8">
                  <img
                    src={imageUrl}
                    alt={item.product?.name}
                    className="w-full h-[500px] object-cover rounded-lg shadow-md mb-4"
                    id={`mainImage-${item.id}`}
                  />
                  {(item.product?.image || item.product?.images?.length > 0) && (
                    <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                      {/* Main image thumbnail */}
                      {item.product.image && (
                        <img
                          src={`${API_BASE_URL}${item.product.image}`}
                          alt="Main thumbnail"
                          className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-100"
                          onClick={() =>
                            (document.getElementById(`mainImage-${item.id}`).src =
                              `${API_BASE_URL}${item.product.image}`)
                          }
                        />
                      )}
                      {/* Additional images */}
                      {item.product?.images?.map((img, index) => (
                        <img
                          key={index}
                          src={`${API_BASE_URL}${img.images}`}
                          alt={`Thumbnail ${index + 1}`}
                          className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                          onClick={() =>
                            (document.getElementById(`mainImage-${item.id}`).src =
                              `${API_BASE_URL}${img.images}`)
                          }
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="w-full md:w-1/2 px-4">
                  <h2 className="text-3xl font-bold mb-2">
                    {item.product?.name}
                  </h2>
                  <div className="mb-4">
                    <span className="text-2xl font-bold mr-2">
                      ${item.product?.price}
                    </span>
                  </div>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => {
                      const starFill = i < Math.round(avgRating) ? "currentColor" : "none";
                      return (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={starFill}
                          stroke="currentColor"
                          className="size-6 text-yellow-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      );
                    })}
                    <span className="ml-2 text-gray-600">
                      {item.product?.ratings?.length > 0
                        ? `${avgRating.toFixed(1)} (${item.product.ratings.length} reviews)`
                        : "No ratings yet"}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-6">
                    {item.product?.description || "No description available."}
                  </p>
                  <div className="mb-6">
                    <label
                      htmlFor={`quantity-${item.id}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Quantity:
                    </label>
                    <input
                      type="number"
                      id={`quantity-${item.id}`}
                      name="quantity"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, e.target.value)
                      }
                      className="w-12 text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div className="flex space-x-4 mb-6">
                    <button className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <i className="ri-shopping-bag-line" />
                      Add to Cart
                    </button>
                    <button className="bg-gray-200 flex gap-2 items-center text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                        <i className="ri-heart-line" />
                      Wishlist
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default AddCart;