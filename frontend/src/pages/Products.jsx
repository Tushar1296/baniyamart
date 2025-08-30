import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import productService from "../services/productService";
import categoryService from "../services/categoryService";
import ProductList from "../components/ProductList";
import CategorySidebar from "../components/CategorySidebar";
import SearchBar from "../components/SearchBar";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");

  // ✅ Add category states
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ✅ Add filtered products state
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Add search term state

  // ✅ Add search loading state
  const [searchLoading, setSearchLoading] = useState(false);

  // useEffect to fetch product data
  // API call using productService
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAllProducts();
        console.log(data);
        setProducts(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  useEffect(() => {
    if (categoryId && categories.length > 0) {
      // Find and set the selected category based on URL parameter
      // When there's a category in URL, select it
      const category = categories.find((cat) => cat.id === categoryId);
      setSelectedCategory(category || null); // Fallback to null if not found
      // ✅ Clear search when category changes
      setFilteredProducts([]);
      setSearchTerm("");
    } else {
      //When no category in URL, clear selection
      // Clear selection when no category in URL
      setSelectedCategory(null);
      // ✅ Clear search when showing all products
      setFilteredProducts([]);
      setSearchTerm("");
    }
  }, [categoryId, categories]);

  // ✅ IMPROVED: Combined filtering logic
  const getDisplayProducts = () => {
    let baseProducts = products;

    // First apply category filter
    if (selectedCategory) {
      baseProducts = products.filter(
        (product) => product.categoryId === selectedCategory.id
      );
    }

    // Then apply search filter if search term exists
    if (searchTerm.trim().length > 0) {
      return baseProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return baseProducts;
  };

  // ✅ category fetching
  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoryData = await categoryService.getAllCategories();
        setCategories(categoryData);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError(err);
      }
    };
    getCategories();
  }, []);

  // // filtering logic
  // const filterProducts = selectedCategory
  //   ? products.filter((product) => product.categoryId === selectedCategory.id)
  //   : products;

  const handleSearch = (searchTerm) => {
    // Filter your products based on search term
    console.log("🔍 Search triggered:", searchTerm);
    setSearchTerm(searchTerm);
    setSearchLoading(true);
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setSearchLoading(false);
  };

  // ✅ UPDATED: Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // Clear search when selecting category
    setSearchTerm("");
    setFilteredProducts([]);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      {/* Search Bar - Top center */}
      <div className="flex justify-center mb-6">
        <SearchBar
          onSearch={handleSearch}
          products={products}
          searchTerm={searchTerm} // Pass current search term
          loading={searchLoading}
        />
      </div>

      {/* // In Products component, show what's being displayed */}
      {searchTerm && (
        <div className="mb-4 text-sm text-gray-600">
          Showing search results for: "<strong>{searchTerm}</strong>"
          {selectedCategory && ` in ${selectedCategory.name}`}
        </div>
      )}

      {/* Main content with sidebar - FIXED */}
      <div className="flex gap-6 items-start">
        {/* Sidebar with consistent positioning */}
        <div className="sticky top-6">
          <CategorySidebar
            categories={categories}
            onCategorySelect={handleCategorySelect}
            selectedCategory={selectedCategory}
          />
        </div>

        {/* Products area with minimum height */}
        <div className="flex-1 min-h-screen">
          <ProductList products={getDisplayProducts()} loading={loading} />
        </div>
      </div>
    </div>
  );
}
export default Products;
