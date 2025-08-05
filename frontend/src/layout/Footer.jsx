

 function Footer(){
    return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
      {/* Column 1: About */}
      <div className="lg:col-span-2">
        <a
          href="#"
          className="font-['Pacifico'] text-2xl text-primary inline-block mb-4"
        >
          logo
        </a>
        <p className="text-gray-600 mb-6 max-w-md">
          We offer premium quality clothing and accessories for men and women.
          Our mission is to provide sustainable fashion that lasts.
        </p>
        <div className="flex space-x-4">
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <i className="ri-facebook-fill" />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <i className="ri-instagram-line" />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <i className="ri-twitter-x-line" />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <i className="ri-pinterest-line" />
          </a>
        </div>
      </div>
      {/* Column 2: Shop */}
      <div>
        <h3 className="text-gray-900 font-semibold mb-4">Shop</h3>
        <ul className="space-y-3">
          <li>
            <a
              href="#"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Women
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Men
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Accessories
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Footwear
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              New Arrivals
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Sale
            </a>
          </li>
        </ul>
      </div>
      {/* Column 3: Help */}
      <div>
        <h3 className="text-gray-900 font-semibold mb-4">Help</h3>
        <ul className="space-y-3">
          <li>
            <a
              href="#"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Customer Service
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              My Account
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Find a Store
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Shipping &amp; Returns
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              FAQs
            </a>
          </li>
        </ul>
      </div>
      {/* Column 4: About */}
      <div>
        <h3 className="text-gray-900 font-semibold mb-4">About</h3>
        <ul className="space-y-3">
          <li>
            <a
              href="#"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              About Us
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Sustainability
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Careers
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Press
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="mt-12 pt-8 border-t border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-500 text-sm mb-4 md:mb-0">
          © 2025 ShopEase. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#" className="text-gray-500 text-sm hover:text-gray-700">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-500 text-sm hover:text-gray-700">
            Terms of Service
          </a>
          <a href="#" className="text-gray-500 text-sm hover:text-gray-700">
            Cookies Settings
          </a>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <i className="ri-visa-fill text-2xl text-gray-600" />
          <i className="ri-mastercard-fill text-2xl text-gray-600" />
          <i className="ri-paypal-fill text-2xl text-gray-600" />
          <i className="ri-apple-fill text-2xl text-gray-600" />
        </div>
      </div>
    </div>
  </div>
</footer>


    )
 }

export default Footer;