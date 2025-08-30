import CategoryCard from "./CategoryCard";

const CategoryList = ({ categories, loading, onCategorySelect }) => {
  if (loading) return <div>Loading categories...</div>;
  if (!categories.length) return <div>No categories found</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onCategorySelect={onCategorySelect}
        />
      ))}
    </div>
  );
};
export default CategoryList;
