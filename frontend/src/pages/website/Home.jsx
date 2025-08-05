import FeaturedProducts from "./components/FeaturedProducts";
import NewArrivals from "./components/NewArrivals";
import SpecialOffer from "./components/SpecialOffer";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function Home() {
   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/category`);
        setCategories(response.data.data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Static image URLs for each category
  const images = [
       {
      src: "https://readdy.ai/api/search-image?query=stylish%20mens%20clothing%20collection%2C%20minimal%20background%2C%20professional%20fashion%20photography%2C%20soft%20lighting%2C%20high-end%20apparel%20displayed%20neatly&width=400&height=500&seq=cat2&orientation=portrait",
      alt: "Women's Collection"
    },
    {
      src: "https://readdy.ai/api/search-image?query=elegant%20womens%20clothing%20collection%2C%20minimal%20background%2C%20professional%20fashion%20photography%2C%20soft%20lighting%2C%20high-end%20apparel%20displayed%20neatly&width=400&height=500&seq=cat1&orientation=portrait",
      alt: "Men's Collection"
    },
 
    {
      src: "https://readdy.ai/api/search-image?query=premium%20accessories%20collection%20including%20bags%2C%20jewelry%2C%20watches%2C%20minimal%20background%2C%20professional%20product%20photography%2C%20soft%20lighting%2C%20high-end%20items%20displayed%20neatly&width=400&height=500&seq=cat3&orientation=portrait",
      alt: "Accessories Collection"
    },
    {
      src: "https://readdy.ai/api/search-image?query=luxury%20footwear%20collection%20including%20shoes%2C%20boots%2C%20sneakers%2C%20minimal%20background%2C%20professional%20product%20photography%2C%20soft%20lighting%2C%20high-end%20items%20displayed%20neatly&width=400&height=500&seq=cat4&orientation=portrait",
      alt: "Footwear Collection"
    },
  ];
  return (
    <div>
      <section
        className="Home relative bg-cover bg-center bg-no-repeat bg-black/70 "
        style={{ backgroundImage: "url('/home.jpg')" }}
      >
        <div className="container mx-auto px-4 py-24 md:py-32 w-full ">
          <div className="max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Summer Collection 2025
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Discover our latest arrivals designed for comfort and style.
              Premium quality that lasts.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="py-3 px-6 bg-primary text-white font-medium rounded-button hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Shop Now
              </a>
              <a
                href="#"
                className="py-3 px-6 bg-white text-gray-800 font-medium rounded-button border border-gray-200 hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Explore Collection
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group cursor-pointer"
              onClick={() => navigate(`/category/${category.id}`)}
            >
              <div className="relative overflow-hidden rounded-lg aspect-[3/4]">
                <img
                  src={images[index]?.src}
                  alt={images[index]?.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-sm">View Collection</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      <FeaturedProducts />
      <SpecialOffer />
      <NewArrivals />
    </div>
  );
}
export default Home;
