import ProductCard from "./ProductCard";

const ProductList = ({ products, loading }) => {
  if (loading) return <div>Loading...</div>;
  if (!products.length) return <div>No products found</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
