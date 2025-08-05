

function NewArrivals(){
    return(
      <>
<section className="py-16">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12">New Arrivals</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Product 1 */}
      <div className="group">
        <div className="relative overflow-hidden rounded-lg mb-4">
          <span className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded">
            New
          </span>
          <img
            src="https://readdy.ai/api/search-image?query=elegant%20silk%20scarf%20on%20minimal%20light%20background%2C%20professional%20fashion%20photography%2C%20high%20quality%20product%20image%2C%20detailed%20fabric%20texture&width=500&height=600&seq=prod8&orientation=portrait"
            alt="Silk Scarf"
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
          <h3 className="font-medium text-gray-900 mb-1">Luxury Silk Scarf</h3>
          <div className="flex items-center mb-1">
            <div className="flex text-amber-400 text-sm">
              <i className="ri-star-fill" />
              <i className="ri-star-fill" />
              <i className="ri-star-fill" />
              <i className="ri-star-fill" />
              <i className="ri-star-line" />
            </div>
            <span className="text-xs text-gray-500 ml-1">(12)</span>
          </div>
          <p className="text-gray-900 font-medium">$39.99</p>
        </div>
      </div>
      {/* Product 2 */}
      <div className="group">
        <div className="relative overflow-hidden rounded-lg mb-4">
          <span className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded">
            New
          </span>
          <img
            src="https://readdy.ai/api/search-image?query=premium%20leather%20handbag%20on%20minimal%20light%20background%2C%20professional%20fashion%20photography%2C%20high%20quality%20product%20image%2C%20detailed%20leather%20texture&width=500&height=600&seq=prod9&orientation=portrait"
            alt="Leather Handbag"
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
            Designer Leather Handbag
          </h3>
          <div className="flex items-center mb-1">
            <div className="flex text-amber-400 text-sm">
              <i className="ri-star-fill" />
              <i className="ri-star-fill" />
              <i className="ri-star-fill" />
              <i className="ri-star-fill" />
              <i className="ri-star-half-fill" />
            </div>
            <span className="text-xs text-gray-500 ml-1">(8)</span>
          </div>
          <p className="text-gray-900 font-medium">$149.99</p>
        </div>
      </div>
      {/* Product 3 */}
      <div className="group">
        <div className="relative overflow-hidden rounded-lg mb-4">
          <span className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded">
            New
          </span>
          <img
            src="https://readdy.ai/api/search-image?query=stylish%20sunglasses%20on%20minimal%20light%20background%2C%20professional%20product%20photography%2C%20high%20quality%20image%2C%20detailed%20texture&width=500&height=600&seq=prod10&orientation=portrait"
            alt="Sunglasses"
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
          <h3 className="font-medium text-gray-900 mb-1">Premium Sunglasses</h3>
          <div className="flex items-center mb-1">
            <div className="flex text-amber-400 text-sm">
              <i className="ri-star-fill" />
              <i className="ri-star-fill" />
              <i className="ri-star-fill" />
              <i className="ri-star-fill" />
              <i className="ri-star-line" />
            </div>
            <span className="text-xs text-gray-500 ml-1">(6)</span>
          </div>
          <p className="text-gray-900 font-medium">$89.99</p>
        </div>
      </div>
    </div>
    <div className="text-center mt-12">
      <a
        href="#"
        className="inline-block py-3 px-8 border border-gray-300 text-gray-800 font-medium rounded-button hover:bg-gray-50 transition-colors whitespace-nowrap"
      >
        View All New Arrivals
      </a>
    </div>
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