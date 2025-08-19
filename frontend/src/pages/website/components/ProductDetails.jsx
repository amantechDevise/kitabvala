import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem("wishlistItems");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/products/details/${id}`
        );
        setProduct(response.data.data);
        setSelectedImage(response.data.data.image);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const isInCart = (productId) => {
    return cartItems.includes(productId);
  };

  const isInWishlist = (productId) => {
    return wishlistItems.includes(productId);
  };

  const handleCartToggle = async () => {
    const user_id = 1; // Replace with actual user ID

    if (isInCart(product.id)) {
      // Remove from cart
      try {
        await axios.delete(`${API_BASE_URL}/api/cart/remove`, {
          data: { product_id: product.id },
        });
        setCartItems((prev) => prev.filter((id) => id !== product.id));
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    } else {
      // Add to cart
      try {
        await axios.post(`${API_BASE_URL}/api/add/cart`, {
          user_id,
          product_id: product.id,
          quantity: quantity,
        });
        setCartItems((prev) => [...prev, product.id]);
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  const handleWishlistToggle = async () => {
    const user_id = 1;

    try {
      const response = await axios.post(`${API_BASE_URL}/api/add/wishList`, {
        user_id,
        product_id: product.id,
      });

      if (response.data.removed) {
        setWishlistItems((prev) => prev.filter((id) => id !== product.id));
      } else {
        setWishlistItems((prev) => [...prev, product.id]);
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-8">Product not found</div>;
  }

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          {/* Product Images */}
          <div className="w-full md:w-1/2 px-4 mb-8">
            <img
              src={`${API_BASE_URL}${
                typeof selectedImage === "string"
                  ? selectedImage
                  : selectedImage?.images || ""
              }`}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-md mb-4"
            />
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {product.images?.map((image, index) => (
                <img
                  key={index}
                  src={`${API_BASE_URL}${
                    typeof image === "string" ? image : image?.images || ""
                  }`}
                  alt={`Thumbnail ${index + 1}`}
                  className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          </div>
          {/* Product Details */}
          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
            {/* <p className="text-gray-600 mb-4">SKU: {product.sku || "N/A"}</p> */}
            <div className="mb-4">
              <span className="text-2xl font-bold mr-2">${product.price}</span>
              {product.oldPrice && (
                <span className="text-gray-500 line-through">
                  ${product.oldPrice}
                </span>
              )}
            </div>
            <div className="flex items-center mb-4">
              {Array.from({ length: 5 }, (_, i) => (
                <i
                  key={i}
                  className={`${
                    i < Math.floor(product.rating)
                      ? "ri-star-fill text-yellow-500"
                      : i < product.rating
                      ? "ri-star-half-fill text-yellow-500"
                      : "ri-star-line text-yellow-500"
                  }`}
                />
              ))}
              <span className="ml-2 text-gray-600">
                {product.rating} ({product.reviews || 0} reviews)
              </span>
            </div>
            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="mb-6">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-12 text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="flex space-x-4 mb-6">
              <button
                onClick={handleCartToggle}
                className={`flex gap-2 items-center px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isInCart(product.id)
                    ? "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
                }`}
              >
                <i className="ri-shopping-bag-line" />
                {isInCart(product.id) ? "Remove from Cart" : "Add to Cart"}
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`flex gap-2 items-center px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isInWishlist(product.id)
                    ? "bg-rose-500 text-white hover:bg-rose-600 focus:ring-rose-500"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500"
                }`}
              >
                <i
                  className={
                    isInWishlist(product.id) ? "ri-heart-fill" : "ri-heart-line"
                  }
                />
                Wishlist
              </button>
            </div>
            {product.features && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
