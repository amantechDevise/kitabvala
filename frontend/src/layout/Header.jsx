
import  { useEffect, useState } from 'react';
import axios from 'axios';
  import { Link } from "react-router-dom";
function Header() {
    const [cartCount, setCartCount] = useState(0);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    // Initial load
    const fetchCartCount = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/home`);
        const count = res.data.data.cartItemCount;
        setCartCount(count);
        localStorage.setItem('cartCount', count);
      } catch (err) {
        console.error('Error fetching cart count:', err);
      }
    };

    fetchCartCount();

    // Listen for storage events
    const handleStorageChange = () => {
      const count = localStorage.getItem('cartCount');
      if (count) setCartCount(Number(count));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const [menuOpen, setMenuOpen] = useState(false);
  return (
  <header className="sticky top-0 z-50 bg-white shadow-sm">
  <div className="container mx-auto px-4 py-4 flex items-center justify-between">
    {/* Logo */}
    <a href="#" className="font-['Pacifico'] text-2xl text-primary">
      logo
    </a>
    {/* Main Navigation */}
    <nav className="hidden md:flex space-x-8">
      <a
        href="#"
        className="text-gray-900 font-medium hover:text-primary transition-colors"
      >
        Home
      </a>
      <div className="relative group">
        <button className="text-gray-900 font-medium hover:text-primary transition-colors flex items-center">
          Shop
          <div className="w-4 h-4 ml-1 flex items-center justify-center">
            <i className="ri-arrow-down-s-line" />
          </div>
        </button>
        <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded hidden group-hover:block">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Women
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Men
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Accessories
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Footwear
          </a>
        </div>
      </div>
      <a
        href="#"
        className="text-gray-900 font-medium hover:text-primary transition-colors"
      >
        New Arrivals
      </a>
      <a
        href="#"
        className="text-gray-900 font-medium hover:text-primary transition-colors"
      >
        Sale
      </a>
      <a
        href="#"
        className="text-gray-900 font-medium hover:text-primary transition-colors"
      >
        About
      </a>
    </nav>
    {/* Utility Icons */}
    <div className="flex items-center space-x-6">
      {/* Search */}
      <div className="relative">
        <button
          id="searchToggle"
          className="w-10 h-10 flex items-center justify-center text-black hover:text-primary transition-colors"
        >
          <i className="ri-search-line text-xl" />
        </button>
        <div
          id="searchDropdown"
          className="hidden absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-4"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 flex items-center justify-center text-gray-400">
              <i className="ri-search-line" />
            </div>
          </div>
        </div>
      </div>
      {/* Account */}
      <div className="relative group">
        <button className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-primary transition-colors">
          <i className="ri-user-line text-xl" />
        </button>
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded hidden group-hover:block">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Sign In
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Register
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            My Account
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Orders
          </a>
        </div>
      </div>
      {/* Cart */}
      <div className="relative">
  
            <Link to="/cart" className="relative w-10 h-10 text-gray-700 hover:text-primary transition-colors">
              <i className="ri-shopping-bag-line text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-3 -right-3 bg-primary text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
        <div
          id="cartDropdown"
          className="hidden absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4"
        >
          <h3 className="font-medium text-gray-900 mb-3">Your Cart (3)</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            <div className="flex items-center space-x-3">
              <img
                src="https://readdy.ai/api/search-image?query=minimalist%20white%20t-shirt%20on%20clean%20background%2C%20professional%20product%20photography%2C%20high%20quality%2C%20detailed%20fabric%20texture&width=80&height=80&seq=prod1&orientation=squarish"
                alt="Product"
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="text-sm font-medium">Essential White T-Shirt</h4>
                <p className="text-xs text-gray-500">Size: M | Qty: 1</p>
                <p className="text-sm font-medium">$24.99</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <i className="ri-close-line" />
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <img
                src="https://readdy.ai/api/search-image?query=minimalist%20black%20jeans%20on%20clean%20background%2C%20professional%20product%20photography%2C%20high%20quality%2C%20detailed%20fabric%20texture&width=80&height=80&seq=prod2&orientation=squarish"
                alt="Product"
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="text-sm font-medium">Slim Fit Black Jeans</h4>
                <p className="text-xs text-gray-500">Size: 32 | Qty: 1</p>
                <p className="text-sm font-medium">$59.99</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <i className="ri-close-line" />
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <img
                src="https://readdy.ai/api/search-image?query=minimalist%20leather%20watch%20on%20clean%20background%2C%20professional%20product%20photography%2C%20high%20quality%2C%20detailed%20texture&width=80&height=80&seq=prod3&orientation=squarish"
                alt="Product"
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="text-sm font-medium">Classic Leather Watch</h4>
                <p className="text-xs text-gray-500">Color: Brown | Qty: 1</p>
                <p className="text-sm font-medium">$129.99</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <i className="ri-close-line" />
              </button>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex justify-between mb-3">
              <span className="text-sm text-gray-600">Subtotal</span>
              <span className="text-sm font-medium">$214.97</span>
            </div>
            <div className="space-y-2">
              <a
                href="#"
                className="block w-full py-2 px-4 bg-primary text-white text-center font-medium rounded-button hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Checkout
              </a>
              <a
                href="#"
                className="block w-full py-2 px-4 bg-gray-100 text-gray-800 text-center font-medium rounded-button hover:bg-gray-200 transition-colors whitespace-nowrap"
              >
                View Cart
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Menu Toggle */}
      <button
        id="mobileMenuToggle"
        className="md:hidden w-10 h-10 flex items-center justify-center text-gray-700"
      >
        <i className="ri-menu-line text-2xl" />
      </button>
    </div>
  </div>
  {/* Mobile Menu */}
  <div
    id="mobileMenu"
    className="hidden md:hidden bg-white border-t border-black"
  >
    <div className="container mx-auto px-4 py-3 space-y-3">
      <a href="#" className="block py-2 text-black font-medium">
        Home
      </a>
      <div>
        <button
          id="mobileShopToggle"
          className="flex items-center justify-between w-full py-2 text-gray-900 font-medium"
        >
          Shop
          <i className="ri-arrow-down-s-line" />
        </button>
        <div id="mobileShopMenu" className="hidden pl-4 space-y-2 mt-1">
          <a href="#" className="block py-1 text-gray-700">
            Women
          </a>
          <a href="#" className="block py-1 text-gray-700">
            Men
          </a>
          <a href="#" className="block py-1 text-gray-700">
            Accessories
          </a>
          <a href="#" className="block py-1 text-gray-700">
            Footwear
          </a>
        </div>
      </div>
      <a href="#" className="block py-2 text-gray-900 font-medium">
        New Arrivals
      </a>
      <a href="#" className="block py-2 text-gray-900 font-medium">
        Sale
      </a>
      <a href="#" className="block py-2 text-gray-900 font-medium">
        About
      </a>
    </div>
  </div>
</header>

  );
}
export default Header;
