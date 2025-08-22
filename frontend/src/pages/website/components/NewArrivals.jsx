import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams, Link } from "react-router-dom";
import { useCart } from "../services/CartContext";
import DetailsModal from "./DetailsModal";
import { motion, AnimatePresence } from "framer-motion";
function NewArrivals() {
  const { id } = useParams();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(3);
  const [hasMore, setHasMore] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [quantities, setQuantities] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

  const { updateCartCount } = useCart();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const user_id = 1; // TODO: replace with logged-in user id

  /** --------------------------
   * Fetch products + cart + wishlist
   ----------------------------*/
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Products
        const response = await axios.get(`${API_BASE_URL}/api/getAll`);
        const productsData = response.data.data || [];
        setProducts(productsData);

        // Initial quantities
        const initialQuantities = {};
        productsData.forEach((p) => (initialQuantities[p.id] = 1));
        setQuantities(initialQuantities);

        // Cart
        const cartResponse = await axios.get(`${API_BASE_URL}/api/items`, {
          params: { user_id },
        });
        setCartItems(cartResponse.data.data.map((item) => item.product_id));

        // Wishlist
        const wishlistResponse = await axios.get(
          `${API_BASE_URL}/api/wishlist/items`,
          { params: { user_id } }
        );
        setWishlistItems(
          wishlistResponse.data.data.map((item) => item.product_id)
        );

        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load products");
        setLoading(false);
      }
    };

    fetchData();
  }, [API_BASE_URL]);

  /** --------------------------
   * Check helpers
   ----------------------------*/
  const isInCart = (id) => cartItems.includes(id);
  const isInWishlist = (id) => wishlistItems.includes(id);

    const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
  /** --------------------------
   * Cart toggle
   ----------------------------*/
  const handleCartToggle = async (productId) => {
    try {
      if (isInCart(productId)) {
        // Remove from cart
        await axios.delete(`${API_BASE_URL}/api/cart/remove`, {
          data: { product_id: productId, user_id },
        });
        setCartItems((prev) => prev.filter((id) => id !== productId));
        updateCartCount(-1);
      } else {
        // Add to cart
        await axios.post(`${API_BASE_URL}/api/add/cart`, {
          user_id,
          product_id: productId,
          quantity: quantities[productId] || 1,
        });
        setCartItems((prev) => [...prev, productId]);
        updateCartCount(1);
      }
    } catch (err) {
      console.error("Cart toggle error:", err);
    }
  };

  /** --------------------------
   * Wishlist toggle
   ----------------------------*/
  const handleWishlistToggle = async (productId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/add/wishList`, {
        user_id,
        product_id: productId,
      });

      if (response.data.removed) {
        // Removed
        setWishlistItems((prev) => prev.filter((id) => id !== productId));
      } else {
        // Added
        setWishlistItems((prev) => [...prev, productId]);
      }
    } catch (err) {
      console.error("Wishlist toggle error:", err);
    }
  };

  /** --------------------------
   * Quantity change
   ----------------------------*/
  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, value),
    }));
  };

  /** --------------------------
   * Load more / full list
   ----------------------------*/
  useEffect(() => {
    if (location.pathname === "/new-arrivals") {
      setVisibleProducts(products.length);
      setHasMore(false);
    } else {
      setHasMore(visibleProducts < products.length);
    }
  }, [location.pathname, visibleProducts, products]);

  const loadMore = () => setVisibleProducts((prev) => prev + 6);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">New Arrivals</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, visibleProducts).map((product) => (
            <div key={product.id} className="group relative">
              {/* IMAGE + ACTIONS */}
              <div className="overflow-hidden rounded-lg mb-4 relative">
                {product.isNew && (
                  <span className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded">
                    New
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
                  {/* Quick View */}
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
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md mx-1 transition ${
                      isInCart(product.id)
                        ? "bg-green-500 text-white"
                        : "bg-primary text-white"
                    }`}
                    onClick={() => handleCartToggle(product.id)}
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

              {/* DETAILS */}
              <div>
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-medium text-gray-900 mb-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-1">
                    <div className="flex text-amber-400 text-sm">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i
                          key={star}
                          className={
                            star <= Math.floor(product.averageRating || 0)
                              ? "ri-star-fill"
                              : star ===
                                  Math.ceil(product.averageRating || 0) &&
                                (product.averageRating || 0) % 1 > 0
                              ? "ri-star-half-fill"
                              : "ri-star-line"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">
                      ({product.ratings?.length || 0})
                    </span>
                  </div>
                  <p className="text-gray-900 font-medium">
                    ${product.price}
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              className="inline-block py-3 px-8 border border-gray-300 text-gray-800 font-medium rounded-button hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              Load More Products
            </button>
          </div>
        )}
      </div>
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
}

export default NewArrivals;
