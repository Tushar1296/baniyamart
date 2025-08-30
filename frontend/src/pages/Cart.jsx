import React from "react";
import { useCart } from "../components/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  } = useCart();

  const navigate = useNavigate();

  // --- DELIVERY FEE LOGIC ---
  const cartTotal = getCartTotal();
  const deliveryFee = cartTotal > 199 ? 0 : 50;
  const orderTotal = cartTotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Your Cart is Empty
          </h2>
          <p className="text-gray-300 mb-6">
            Add some products to get started!
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Shopping Cart</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - Takes 2/3 width */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-md"
                >
                  <div className="flex items-center">
                    <img
                      src={item.imageUrl || "/placeholder-image.jpg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md mr-6"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-white mb-1">
                        {item.name}
                      </h3>
                      <p className="text-gray-400">₹{item.price} each</p>
                    </div>

                    <div className="flex items-center space-x-3 mx-6">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="bg-gray-600 text-white w-10 h-10 rounded-md hover:bg-gray-500 flex items-center justify-center font-bold text-lg"
                      >
                        −
                      </button>
                      <span className="w-16 h-10 bg-gray-700 text-white rounded-md flex items-center justify-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="bg-gray-600 text-white w-10 h-10 rounded-md hover:bg-gray-500 flex items-center justify-center font-bold text-lg"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right min-w-[120px]">
                      <p className="font-bold text-white text-lg">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-300 text-sm mt-1 underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={clearCart}
                className="text-red-400 hover:text-red-300 bg-red-900/20 px-4 py-2 rounded-md text-sm"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary - Takes 1/3 width */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-md sticky top-4">
              <h3 className="text-xl font-bold mb-4 text-white">
                Order Summary
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Items ({getCartItemsCount()})</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Delivery</span>
                  <span>₹{deliveryFee.toFixed(2)}</span>
                </div>
                <hr className="border-gray-600" />
                <div className="flex justify-between font-bold text-xl text-white">
                  <span>Total</span>
                  <span>₹{orderTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 font-semibold text-lg mb-4"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={() => navigate("/products")}
                className="w-full border border-green-600 text-green-400 py-2 rounded-md hover:bg-green-600 hover:text-white transition-colors"
              >
                Add More Items
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
