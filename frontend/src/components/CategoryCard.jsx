const CategoryCard = ({ category, onCategorySelect }) => {
  return (
    <div
      className="border rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onCategorySelect(category)}
    >
      <div className="w-full h-32 flex items-center justify-center bg-gray-50 rounded-t-lg">
        {category?.icon ? (
          <span className="text-6xl">{category.icon}</span> // Display emoji
        ) : (
          <span className="text-gray-400 text-xl">📦</span> // Default icon
        )}
      </div>

      <h3 className="text-center mt-2 font-medium ">{category?.name}</h3>
    </div>
  );
};

export default CategoryCard;
