import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import DetailsModal from "./components/DetailsModal";
import { useCart } from "./services/CartContext";
import { motion, AnimatePresence } from "framer-motion";
const Productpage = () => {
  const { id } = useParams();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // States
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Cart Context
  const { updateCartCount } = useCart();

  const user_id = 1; // TODO: replace with actual logged-in user later

  /** --------------------------
   *  Helpers
   ----------------------------*/
  const isInCart = (productId) => cartItems.includes(productId);
  const isInWishlist = (productId) => wishlistItems.includes(productId);

  /** --------------------------
   *  Cart Handlers
   ----------------------------*/
  const handleCartToggle = async (productId) => {
    try {
      if (isInCart(productId)) {
        // Remove from cart
        await axios.delete(`${API_BASE_URL}/api/cart/remove`, {
          data: { user_id, product_id: productId },
        });
        setCartItems((prev) => prev.filter((id) => id !== productId));
        updateCartCount(-1);
      } else {
        // Add to cart
        await axios.post(`${API_BASE_URL}/api/add/cart`, {
          user_id,
          product_id: productId,
          quantity: 1,
        });
        setCartItems((prev) => [...prev, productId]);
        updateCartCount(1);
      }
    } catch (error) {
      console.error("Error toggling cart:", error);
    }
  };

  /** --------------------------
   *  Wishlist Handlers
   ----------------------------*/
  const handleWishlistToggle = async (productId) => {
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

  /** --------------------------
   *  Fetch Data
   ----------------------------*/
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/items`, {
          params: { user_id },
        });
        setCartItems(data.data.map((item) => item.product_id));
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    const fetchWishlistItems = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/wishlist/items`, {
          params: { user_id },
        });
        setWishlistItems(data.data.map((item) => item.product_id));
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
      }
    };

    fetchCartItems();
    fetchWishlistItems();
  }, []);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/categories/${id}`
        );
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductsByCategory();
  }, [id]);

  /** --------------------------
   *  Modal Handlers
   ----------------------------*/
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  /** --------------------------
   *  Render
   ----------------------------*/
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-center w-full">
            Category Products
          </h2>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div className="group" key={product.id}>
                {/* Product Image + Overlay Actions */}
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

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {/* View */}
                    <button
                      onClick={() => openModal(product)}
                      className="bg-white text-gray-900 w-10 h-10 rounded-full flex items-center justify-center shadow-md mx-1 hover:bg-gray-100 transition"
                    >
                      <i className="ri-eye-line" />
                    </button>

                    {/* Wishlist */}
                    <button
                      className={`bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md mx-1 hover:bg-gray-100 transition ${
                        isInWishlist(product.id)
                          ? "text-red-500"
                          : "text-gray-900"
                      }`}
                      onClick={() => handleWishlistToggle(product.id)}
                    >
                      <i
                        className={
                          isInWishlist(product.id)
                            ? "ri-heart-fill"
                            : "ri-heart-line"
                        }
                      />
                    </button>

                    {/* Cart */}
                    <button
                      onClick={() => handleCartToggle(product.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md mx-1 transition ${
                        isInCart(product.id)
                          ? "bg-green-500 text-white"
                          : "bg-primary text-white hover:bg-primary/90"
                      }`}
                    >
                      <i
                        className={
                          isInCart(product.id)
                            ? "ri-shopping-cart-fill"
                            : "ri-shopping-bag-line"
                        }
                      />
                    </button>
                  </div>
                </div>

                {/* Product Details */}
                <div>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-medium text-gray-900 mb-1 hover:text-primary">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center text-amber-400 text-sm">
                      {Array.from({ length: 5 }, (_, i) => (
                        <i
                          key={i}
                          className={
                            i < Math.floor(product.rating)
                              ? "ri-star-fill"
                              : i < product.rating
                              ? "ri-star-half-fill"
                              : "ri-star-line"
                          }
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">
                        ({product.reviews})
                      </span>
                    </div>

                    {/* Price */}
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

      {/* Modal */}
    {isModalOpen && selectedProduct && (
  <AnimatePresence>
    <motion.div
      key="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 bg-opacity-70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
    >
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.7, rotateX: -30 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.7, rotateX: -30 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        <DetailsModal
          product={selectedProduct}
          onClose={closeModal}
          cartItems={cartItems}
          setCartItems={setCartItems}
          wishlistItems={wishlistItems}
          setWishlistItems={setWishlistItems}
        />
      </motion.div>
    </motion.div>
  </AnimatePresence>
)}
    </section>
  );
};

export default Productpage;
