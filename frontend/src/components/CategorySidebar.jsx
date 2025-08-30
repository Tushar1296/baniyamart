// import { useNavigate, useLocation } from "react-router-dom";

const CategorySidebar = ({
  categories,
  onCategorySelect,
  selectedCategory,
}) => {
  // const navigate = useNavigate();
  // const location = useLocation();

  // const handleCategoryClick = (category) => {
  //   // Navigate to the products page with the selected category
  //   // Update URL with category parameter
  //   navigate(`/products?category=${category.id}`);
  //   onCategorySelect(category);
  // };

  // const handleAllProducts = () => {
  //   navigate("/products");
  //   onCategorySelect(null);
  // };

  return (
    // ✅ Fixed version
    <div className="category-sidebar w-64">
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold mb-4 text-gray-800">Categories</h3>

        {/* All Products option */}
        <div
          onClick={() => onCategorySelect(null)}
          className={`p-3 rounded-lg cursor-pointer transition-colors ${
            !selectedCategory
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-gray-50 text-gray-700 hover:bg-gray-100"
          }`}
        >
          All Products
        </div>

        {/* Individual categories */}
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => onCategorySelect(category)}
            className={`p-3 rounded-lg cursor-pointer transition-colors ${
              selectedCategory?.id === category.id
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {category.icon} {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySidebar;
