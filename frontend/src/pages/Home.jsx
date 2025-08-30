import { useCart } from "../components/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import productService from "../services/productService";
import categoryService from "../services/categoryService";

function Home() {
  const navigate = useNavigate();
  const { getCartItemsCount } = useCart();

  const handleBrowseProducts = () => {
    window.scrollTo(0, 0); // Scroll to top first
    navigate("/products"); // React Router way
  };

  // Cart Icon Component
  const CartIcon = () => (
    <button
      onClick={() => navigate("/cart")}
      className="fixed top-4 right-4 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 z-50"
    >
      🛒
      {getCartItemsCount() > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
          {getCartItemsCount()}
        </span>
      )}
    </button>
  );

  //Other methods to handle button clicks for navigation
  {
    //   // Opens EXTERNAL websites in new tab
    // const ExternalLinkButton = () => {
    // const handleClick = () => {
    //   window.open('https://www.example.com', '_blank', 'noopener,noreferrer');
    // };
    // Navigate WITHIN your app
    // const handleBrowseProducts = () => {
    //   window.location.href = "/products"; // Redirect to products page
    // };
  }

  const [featuredProducts, setFeaturedProducts] = useState([]);

  console.log("🔄 Current featuredProducts length:", featuredProducts.length);

  // Fetch featured products from API
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        console.log("📡 Calling getFeaturedProducts API");
        const featuredProducts = await productService.getFeaturedProducts();
        console.log("✅ Received featured products:", featuredProducts);
        setFeaturedProducts(featuredProducts);
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      }
    };
    fetchFeaturedProducts();
  }, []);

  ////// Fetch categories for the sidebar
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await categoryService.getAllCategories();
        setCategories(categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category.id}`);
  };

  // State management for carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // Safe navigation functions
  const goToNext = () => {
    const maxIndex = Math.max(0, featuredProducts.length - itemsPerPage);
    console.log("🔄 Going to next products, current index:", currentIndex);
    console.log("🔄 Max index for carousel:", maxIndex);
    setCurrentIndex((prev) => Math.min(maxIndex, prev + itemsPerPage));
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - itemsPerPage));
  };

  // ✅ Complete carousel with dot navigation
  const goToPage = (pageIndex) => {
    const targetIndex = pageIndex * itemsPerPage;
    const maxIndex = Math.max(0, featuredProducts.length - itemsPerPage);
    setCurrentIndex(Math.min(targetIndex, maxIndex));
  };

  // Reset carousel when products or itemsPerPage changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [featuredProducts.length, itemsPerPage]);

  // Button states
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex + itemsPerPage < featuredProducts.length;

  // Safe product slicing
  const displayedProducts = featuredProducts.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <div>
      <CartIcon />
      <div className="home min-h-screen">
        {/* Hero Section */}
        <HeroSection
          title="Welcome to BaniyaMart"
          subtitle="Your one-stop shop for all your needs!"
          onButtonClick={handleBrowseProducts}
        />

        {/* Featured Products Section with Carousel - FIXED */}
        {featuredProducts.length > 0 && (
          <section className="px-8 py-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">
              Featured Products
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-green-600 to-transparent mx-auto mb-8"></div>

            {/* Carousel Container - FIXED */}
            <div className="relative max-w-6xl mx-auto">
              {/* Left Arrow - FIXED POSITIONING */}
              {featuredProducts.length > itemsPerPage && (
                <button
                  onClick={goToPrevious}
                  disabled={!canGoBack}
                  className={`absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-lg transition-all ${
                    canGoBack
                      ? "bg-white hover:bg-gray-50 text-gray-700 border hover:shadow-xl"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <span className="text-2xl font-bold">‹</span>
                </button>
              )}

              {/* Right Arrow - FIXED POSITIONING */}
              {featuredProducts.length > itemsPerPage && (
                <button
                  onClick={goToNext}
                  disabled={!canGoForward}
                  className={`absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-lg transition-all ${
                    canGoForward
                      ? "bg-white hover:bg-gray-50 text-gray-700 border hover:shadow-xl"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <span className="text-2xl font-bold">›</span>
                </button>
              )}

              {/* Products Grid - SINGLE GRID ONLY */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-300">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            {/* Dot Indicators */}
            {featuredProducts.length > itemsPerPage && (
              <div className="flex justify-center mt-8 space-x-2">
                {/* Add debug info */}
                <div className="text-xs text-gray-500 mr-4">
                  Current Index: {currentIndex}, Page:{" "}
                  {Math.floor(currentIndex / itemsPerPage)}
                </div>

                {Array.from({
                  length: Math.ceil(featuredProducts.length / itemsPerPage),
                }).map((_, pageIndex) => (
                  <button
                    key={pageIndex}
                    onClick={() => goToPage(pageIndex)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      Math.floor(currentIndex / itemsPerPage) === pageIndex
                        ? "bg-green-600"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* View All Button */}
            <div className="text-center mt-8">
              <button
                onClick={handleBrowseProducts}
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                View All Products →
              </button>
            </div>
          </section>
        )}

        {/* Shop by Categories */}
        {categories.length > 0 && (
          <section className="px-8 py-12">
            <h2 className=" text-3xl font-bold text-center mb-8 text-white">
              Shop by Category
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-green-600 to-transparent mx-auto mb-8"></div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onCategorySelect={handleCategoryClick}
                />
              ))}
            </div>
          </section>
        )}

        {/* Why Choose Us Section */}
        <section className="bg-gray-50 py-16">
          <div className="px-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Why Choose BaniyaMart?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-green-600 to-transparent mx-auto mb-8"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center bg-white p-6 rounded-lg shadow-sm">
                <div className="text-4xl mb-3">🚚</div>
                <h3 className="font-semibold mb-2 text-gray-800">
                  Fast Delivery
                </h3>
                <p className="text-gray-600 text-sm">
                  Get your groceries delivered in 2 hours
                </p>
              </div>
              <div className="text-center bg-white p-6 rounded-lg shadow-sm">
                <div className="text-4xl mb-3">🥕</div>
                <h3 className="font-semibold mb-2 text-gray-800">
                  Fresh Products
                </h3>
                <p className="text-gray-600 text-sm">
                  Farm fresh vegetables & fruits daily
                </p>
              </div>
              <div className="text-center bg-white p-6 rounded-lg shadow-sm">
                <div className="text-4xl mb-3">💰</div>
                <h3 className="font-semibold mb-2 text-gray-800">
                  Best Prices
                </h3>
                <p className="text-gray-600 text-sm">
                  Lowest prices guaranteed
                </p>
              </div>
              <div className="text-center bg-white p-6 rounded-lg shadow-sm">
                <div className="text-4xl mb-3">🛒</div>
                <h3 className="font-semibold mb-2 text-gray-800">
                  Wide Selection
                </h3>
                <p className="text-gray-600 text-sm">
                  1000+ products across 8 categories
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final Call to Action */}
        <section className="bg-green-600 text-white text-center py-16">
          <h2 className="text-3xl font-bold mb-4">Start Shopping Today!</h2>
          <p className="text-xl mb-6">Join thousands of happy customers</p>
          <button
            onClick={handleBrowseProducts}
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
          >
            Browse All Products →
          </button>
        </section>
      </div>
    </div>
  );
}
export default Home;
