import React from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart, cartItems, updateQuantity } = useCart();
  const navigate = useNavigate();

  const cartItem = cartItems.find((item) => item.id === product.id);
  const isInCart = !!cartItem;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleIncrement = () => {
    updateQuantity(product.id, cartItem.quantity + 1);
  };

  const handleDecrement = () => {
    updateQuantity(product.id, cartItem.quantity - 1);
  };

  const handleViewCart = () => {
    navigate("/cart");
  };

  return (
    <div className="product-card border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <img
        src={product.imageUrl || "/placeholder-image.jpg"}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-3"
        onClick={() => navigate(`/product/${product.id}`)}
        style={{ cursor: "pointer" }}
      />
      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
      <p className="text-green-600 font-bold text-xl mb-2">₹{product.price}</p>
      <p className="text-gray-600 mb-3">{product.description}</p>

      {!isInCart ? (
        <button
          onClick={handleAddToCart}
          className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Add to Cart
        </button>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-center space-x-3">
            <button
              onClick={handleDecrement}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300"
            >
              -
            </button>
            <span className="font-semibold">{cartItem.quantity}</span>
            <button
              onClick={handleIncrement}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300"
            >
              +
            </button>
          </div>
          <button
            onClick={handleViewCart}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            View Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
