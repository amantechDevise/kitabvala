import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import DetailsModal from "./components/DetailsModal";

const Productpage = () => {
  const { id } = useParams();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem("wishlistItems");
    return saved ? JSON.parse(saved) : [];
  });

  // Update localStorage and dispatch events when cartItems changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem('cartCount', cartItems.length);
    window.dispatchEvent(new Event('storage'));
  }, [cartItems]);

  // Update localStorage for wishlist
  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const isInCart = (productId) => {
    return cartItems.includes(productId);
  };

  const isInWishlist = (productId) => {
    return wishlistItems.includes(productId);
  };

  const handleCartToggle = async (productId) => {
    const user_id = 1; // Replace with actual user ID

    if (isInCart(productId)) {
      // Remove from cart
      try {
        await axios.delete(`${API_BASE_URL}/api/cart/remove`, {
          data: { product_id: productId },
        });
        setCartItems((prev) => prev.filter((id) => id !== productId));
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    } else {
      // Add to cart
      try {
        await axios.post(`${API_BASE_URL}/api/add/cart`, {
          user_id,
          product_id: productId,
          quantity: 1,
        });
        setCartItems((prev) => [...prev, productId]);
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  const handleWishlistToggle = async (productId) => {
    const user_id = 1;

    try {
      const response = await axios.post(`${API_BASE_URL}/api/add/wishList`, {
        user_id,
        product_id: productId,
      });

      if (response.data.removed) {
        setWishlistItems((prev) => prev.filter((id) => id !== productId));
      } else {
        setWishlistItems((prev) => [...prev, productId]);
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/categories/${id}`
        );
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductsByCategory();
  }, [id]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-center w-full">
            Category Products
          </h2>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div className="group" key={product.id}>
                <div className="relative overflow-hidden rounded-lg mb-4">
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded">
                      {product.badge}
                    </span>
                  )}
              <Link to={`/product/${product.id}`}>
                    <img
                      src={`${API_BASE_URL}${product.image}`}
                      alt={product.name}
                      className="w-full h-80 object-cover object-top"
                    />
                  </Link>
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                      onClick={() => openModal(product)}
                      className="bg-white text-gray-900 w-10 h-10 rounded-full flex items-center justify-center shadow-md mx-1 hover:bg-gray-100 transition"
                    >
                      <i className="ri-eye-line" />
                    </button>
                    <button
                      onClick={() => handleWishlistToggle(product.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md mx-1 transition ${
                        isInWishlist(product.id)
                          ? "bg-rose-500 text-white hover:bg-rose-600"
                          : "bg-white text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <i
                        className={
                          isInWishlist(product.id)
                            ? "ri-heart-fill"
                            : "ri-heart-line"
                        }
                      />
                    </button>
                    <button
                      onClick={() => handleCartToggle(product.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md mx-1 transition ${
                        isInCart(product.id)
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-primary text-white hover:bg-primary/90"
                      }`}
                    >
                      <i className="ri-shopping-bag-line" />
                    </button>
                  </div>
                </div>
                <div>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-medium text-gray-900 mb-1 hover:text-primary">
                      {product.name}
                    </h3>
                  
                  <div className="flex text-amber-400 text-sm">
                    {Array.from({ length: 5 }, (_, i) => (
                      <i
                        key={i}
                        className={`${
                          i < Math.floor(product.rating)
                            ? "ri-star-fill"
                            : i < product.rating
                            ? "ri-star-half-fill"
                            : "ri-star-line"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">
                    ({product.reviews})
                  </span>
                  <div className="flex items-center">
                    <p className="text-gray-900 font-medium">
                      ${product.price}
                    </p>
                    {product.oldPrice && (
                      <p className="text-gray-500 line-through text-sm ml-2">
                        ${product.oldPrice}
                      </p>
                    )}
                  </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>
        {isModalOpen && selectedProduct && (
      <div className="fixed inset-0 bg-black/50 bg-opacity-70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
         
              <DetailsModal 
                product={selectedProduct} 
                onClose={closeModal}
                cartItems={cartItems}
                setCartItems={setCartItems}
                wishlistItems={wishlistItems}
                setWishlistItems={setWishlistItems}
              />
            </div>
          </div>
        )}
    </section>
  );
};

export default Productpage;