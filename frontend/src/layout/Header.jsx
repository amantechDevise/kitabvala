import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from "react-router-dom";
import { useCart } from '../pages/website/services/CartContext';

function Header() {
  const currentUserId = 1;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [shopTimeoutId, setShopTimeoutId] = useState(null);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [userTimeoutId, setUserTimeoutId] = useState(null);
   const userName = localStorage.getItem("userName");
  const { cartCount } = useCart();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/category`);
        setCategories(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, [API_BASE_URL]);

  const handleShopMouseEnter = () => { 
    clearTimeout(shopTimeoutId); 
    setIsShopOpen(true); 
  };
  
  const handleShopMouseLeave = () => {
    const id = setTimeout(() => setIsShopOpen(false), 200);
    setShopTimeoutId(id);
  };

  const handleUserMouseEnter = () => { 
    clearTimeout(userTimeoutId); 
    setIsUserOpen(true); 
  };
  
  const handleUserMouseLeave = () => {
    const id = setTimeout(() => setIsUserOpen(false), 200);
    setUserTimeoutId(id);
  };

    const handleLogout = () => {
    localStorage.removeItem("webToken");
    localStorage.removeItem("userName");
    navigate("/"); // logout ke baad home bhej do
    window.location.reload(); // refresh to update header
  };

  useEffect(() => {
    return () => {
      if (shopTimeoutId) clearTimeout(shopTimeoutId);
      if (userTimeoutId) clearTimeout(userTimeoutId);
    };
  }, [shopTimeoutId, userTimeoutId]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-['Pacifico'] text-2xl text-primary">
          logo
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-900 font-medium hover:text-primary transition-colors">
            Home
          </Link>
          
          <div 
            className="relative"
            onMouseEnter={handleShopMouseEnter}
            onMouseLeave={handleShopMouseLeave}
          >
            <div className="inline-auto">
              <button className="text-gray-900 font-medium hover:text-primary transition-colors flex items-center">
                Shop
                <div className="w-4 h-4 ml-1 flex items-center justify-center">
                  <i className="ri-arrow-down-s-line" />
                </div>
              </button>
            </div>
            
            <div className="absolute left-0 pt-2 w-48">
              <div 
                className={`bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ${isShopOpen ? 'block' : 'hidden'}`}
                onMouseEnter={handleShopMouseEnter}
                onMouseLeave={handleShopMouseLeave}
              >
                {loading ? (
                  <div className="px-4 py-3 text-sm text-gray-700">Loading categories...</div>
                ) : categories.length > 0 ? (
                  categories.map(category => (
                    <Link 
                      key={category.id}
                      to={`/category/${category.id}`}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsShopOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-700">No categories available</div>
                )}
              </div>
            </div>
          </div>
          
          <Link to="/new-arrivals" className="text-gray-900 font-medium hover:text-primary transition-colors">
            New Arrivals
          </Link>
         
          <Link to="" className="text-gray-900 font-medium hover:text-primary transition-colors">
            Sale
          </Link>
          <Link to="/about" className="text-gray-900 font-medium hover:text-primary transition-colors">
            About
          </Link>
        </nav>
        
        <div className="flex items-center space-x-6">
          <div className="relative">
            <button className="w-10 h-10 flex items-center justify-center text-black hover:text-primary transition-colors">
              <i className="ri-search-line text-xl" />
            </button>
          </div>
          
        <div
      className="relative"
      onMouseEnter={handleUserMouseEnter}
      onMouseLeave={handleUserMouseLeave}
    >
      <button className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-primary transition-colors">
        <i className="ri-user-line text-xl" />
      </button>

      <div
        className={`absolute right-0 mt-2 w-48 bg-white shadow-lg rounded transition-all duration-300 ${
          isUserOpen ? "block" : "hidden"
        }`}
      >
        {userName ? (
          <>
            <span className="block px-4 py-3 text-sm text-gray-700 font-semibold">
              👋 {userName}
            </span>
            <Link
              to="/account"
              className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              My Account
            </Link>
            <Link
              to="/orders"
              className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Orders
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
          
          <div className="relative">
            <Link to="/cart" className="relative w-10 h-10 text-gray-700 hover:text-primary transition-colors">
              <i className="ri-shopping-bag-line text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-3 -right-3 bg-primary text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
          
          <button 
            className="md:hidden w-10 h-10 flex items-center justify-center text-gray-700"
            onClick={toggleMobileMenu}
          >
            <i className={`text-2xl ${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}`} />
          </button>
        </div>

        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-200`}>
          <div className="container mx-auto px-4 py-3 space-y-3">
            <Link to="/" className="block py-2 text-black font-medium" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            
            <div>
              <button
                className="flex items-center justify-between w-full py-2 text-gray-900 font-medium"
                onClick={() => document.getElementById('mobileShopMenu').classList.toggle('hidden')}
              >
                Shop
                <i className="ri-arrow-down-s-line" />
              </button>
              <div id="mobileShopMenu" className="hidden pl-4 space-y-2 mt-1">
                {categories.map(category => (
                  <Link 
                    key={category.id}
                    to={`/product/${category.id}`}
                    className="block py-1 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <a href="#" className="block py-2 text-gray-900 font-medium" onClick={() => setMobileMenuOpen(false)}>
              New Arrivals
            </a>
            <a href="#" className="block py-2 text-gray-900 font-medium" onClick={() => setMobileMenuOpen(false)}>
              Sale
            </a>
            <Link to="/about" className="block py-2 text-gray-900 font-medium" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;