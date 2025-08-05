

function FeaturedProducts(){
    return(
        <section className="py-16">
  <div className="container mx-auto px-4">
    <div className="flex justify-between items-center mb-12">
      <h2 className="text-3xl font-bold">Featured Products</h2>
      <div className="flex space-x-1 px-1 py-1 bg-gray-100 rounded-full">
        <button className="px-4 py-1.5 bg-white text-gray-800 rounded-full shadow-sm text-sm font-medium whitespace-nowrap">
          All
        </button>
        <button className="px-4 py-1.5 text-gray-600 rounded-full text-sm font-medium hover:bg-white hover:shadow-sm transition whitespace-nowrap">
          New Arrivals
        </button>
        <button className="px-4 py-1.5 text-gray-600 rounded-full text-sm font-medium hover:bg-white hover:shadow-sm transition whitespace-nowrap">
          Best Sellers
        </button>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Product 1 */}
      <div className="group">
        <div className="relative overflow-hidden rounded-lg mb-4">
          <span className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded">
            New
          </span>
          <img
            src="https://readdy.ai/api/search-image?query=elegant%20white%20blouse%20on%20minimal%20light%20background%2C%20professional%20fashion%20photography%2C%20high%20quality%20product%20image%2C%20detailed%20fabric%20texture&width=500&height=600&seq=prod4&orientation=portrait"
            alt="White Blouse"
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
          <h3 className="font-medium text-gray-900 mb-1">
            Elegant White Blouse
          </h3>
          <div className="flex items-center mb-1">
            <div className="flex text-amber-400 text-sm">
              <i className="ri-star-fill" />
              <i className="ri-star-fill" />
              <i className="ri-star-fill" />
              <i className="ri-star-fill" />
              <i className="ri-star-half-fill" />
            </div>
            <span className="text-xs text-gray-500 ml-1">(42)</span>
          </div>
          <p className="text-gray-900 font-medium">$49.99</p>
        </div>
      </div>
      {/* Product 2 */}
      <div className="group">
        <div className="relative overflow-hidden rounded-lg mb-4">
          <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs px-2 py-1 rounded">
            Best Seller
          </span>
          <img
            src="https://readdy.ai/api/search-image?query=premium%20denim%20jeans%20on%20minimal%20light%20background%2C%20professional%20fashion%20photography%2C%20high%20quality%20product%20image%2C%20detailed%20fabric%20texture&width=500&height=600&seq=prod5&orientation=portrait"
            alt="Denim Jeans"
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
          <h3 className="font-medium text-gray-900 mb-1">
            Premium Denim Jeans
          </h3>
          <div className="flex items-center mb-1">
            <div className="flex text-amber-400 text-sm">
              <i className="ri-star-fill" />
              <i className="ri-star-fill" />
              <i className="ri-star-fill" />
              <i className="ri-star-fill" />
              <i className="ri-star-fill" />
            </div>
            <span className="text-xs text-gray-500 ml-1">(128)</span>
          </div>
          <p className="text-gray-900 font-medium">$79.99</p>
        </div>
      </div>
      {/* Product 3 */}
      <div className="group">
        <div className="relative overflow-hidden rounded-lg mb-4">
          <img
            src="https://readdy.ai/api/search-image?query=stylish%20leather%20jacket%20on%20minimal%20light%20background%2C%20professional%20fashion%20photography%2C%20high%20quality%20product%20image%2C%20detailed%20leather%20texture&width=500&height=600&seq=prod6&orientation=portrait"
            alt="Leather Jacket"
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
          <h3 className="font-medium text-gray-900 mb-1">
            Classic Leather Jacket
          </h3>
          <div className="flex items-center mb-1">
            <div className="flex text-amber-400 text-sm">
              <i className="ri-star-fill" />
              <i className="ri-star-fill" />
              <i className="ri-star-fill" />
              <i className="ri-star-fill" />
              <i className="ri-star-line" />
            </div>
            <span className="text-xs text-gray-500 ml-1">(76)</span>
          </div>
          <p className="text-gray-900 font-medium">$199.99</p>
        </div>
      </div>
      {/* Product 4 */}
      <div className="group">
        <div className="relative overflow-hidden rounded-lg mb-4">
          <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs px-2 py-1 rounded">
            Sale
          </span>
          <img
            src="https://readdy.ai/api/search-image?query=elegant%20summer%20dress%20on%20minimal%20light%20background%2C%20professional%20fashion%20photography%2C%20high%20quality%20product%20image%2C%20detailed%20fabric%20texture&width=500&height=600&seq=prod7&orientation=portrait"
            alt="Summer Dress"
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
          <h3 className="font-medium text-gray-900 mb-1">
            Floral Summer Dress
          </h3>
          <div className="flex items-center mb-1">
            <div className="flex text-amber-400 text-sm">
              <i className="ri-star-fill" />
              <i className="ri-star-fill" />
              <i className="ri-star-fill" />
              <i className="ri-star-fill" />
              <i className="ri-star-half-fill" />
            </div>
            <span className="text-xs text-gray-500 ml-1">(54)</span>
          </div>
          <div className="flex items-center">
            <p className="text-gray-900 font-medium">$59.99</p>
            <p className="text-gray-500 line-through text-sm ml-2">$79.99</p>
          </div>
        </div>
      </div>
    </div>
    <div className="text-center mt-12">
      <a
        href="#"
        className="inline-block py-3 px-8 border border-gray-300 text-gray-800 font-medium rounded-button hover:bg-gray-50 transition-colors whitespace-nowrap"
      >
        View All Products
      </a>
    </div>
  </div>
</section>

    )
}
  export default FeaturedProducts;