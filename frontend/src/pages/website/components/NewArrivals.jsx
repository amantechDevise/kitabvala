import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(3); // Initial 3 products
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/getAll`);
        setProducts(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Check if there are more products to show
    setHasMore(visibleProducts < products.length);
  }, [visibleProducts, products]);

  const loadMore = () => {
    setVisibleProducts(prev => prev + 6); // Load 6 more products
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

    return(
      <>
 <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">New Arrivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, visibleProducts).map(product => (
            <div key={product.id} className="group">
              <div className="relative overflow-hidden rounded-lg mb-4">
                {product.isNew && (
                  <span className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded">
                    New
                  </span>
                )}
                <img
                  src={`${API_BASE_URL}${product.image}`}
                  alt={product.name}
                  className="w-full h-80 object-cover object-top"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-white text-gray-900 w-10 h-10 rounded-full flex items-center justify-center shadow-md mx-1 hover:bg-gray-100 transition">
                    <i className="ri-eye-line" />
                  </button>
                  <button className="bg-white text-gray-900 w-10 h-10 rounded-full flex items-center justify-center shadow-md mx-1 hover:bg-gray-100 transition">
                    <i className="ri-heart-line" />
                  </button>
                  <button className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md mx-1 hover:bg-primary/90 transition">
                    <i className="ri-shopping-bag-line" />
                  </button>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                <div className="flex items-center mb-1">
                  <div className="flex text-amber-400 text-sm">
                    {[1, 2, 3, 4, 5].map(star => (
                      <i 
                        key={star}
                        className={
                          star <= Math.floor(product.averageRating || 0) 
                            ? 'ri-star-fill' 
                            : star === Math.ceil(product.averageRating || 0) && (product.averageRating || 0) % 1 > 0
                              ? 'ri-star-half-fill'
                              : 'ri-star-line'
                        }
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">
                    ({product.ratings?.length || 0})
                  </span>
                </div>
                <p className="text-gray-900 font-medium">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
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
    </section>
<section className="py-16 bg-gray-900 text-white">
  <div className="container mx-auto px-4">
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
      <p className="text-gray-300 mb-8">
        Stay updated with our latest collections, exclusive offers, and style
        tips.
      </p>
      <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Your email address"
          className="flex-1 px-4 py-3 rounded-button border-none text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-primary text-white font-medium rounded-button hover:bg-primary/90 transition-colors whitespace-nowrap"
        >
          Subscribe
        </button>
      </form>
      <p className="text-sm text-gray-400 mt-4">
        By subscribing, you agree to our Privacy Policy and consent to receive
        updates from our company.
      </p>
    </div>
  </div>
</section>
</>
    )
}
  export default NewArrivals;