import React, { useState } from "react";
import { useCart } from "../components/CartContext";
import { useNavigate } from "react-router-dom";
import orderService from "../services/orderService";

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [paymentCategory, setPaymentCategory] = useState("cod"); // "cod" or "online"
  const [paymentProvider, setPaymentProvider] = useState(""); // "paypal" etc.
  const [isProcessing, setIsProcessing] = useState(false);

  const cartTotal = getCartTotal();
  const deliveryFee = cartTotal > 199 ? 0 : 50;
  const orderTotal = cartTotal + deliveryFee;

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const selectedPaymentMethod =
      paymentCategory === "online" ? paymentProvider : paymentCategory;

    try {
      // ✅ Transform cartItems to match OrderItem fields
      const orderItems = cartItems.map((item) => ({
        productId: item.id, // Map id -> productId
        productName: item.name, // Map name -> productName
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.price * item.quantity, // Calculate totalPrice
      }));

      console.log("cartTotal:", cartTotal);
      console.log("deliveryFee:", deliveryFee);
      console.log("orderTotal:", orderTotal);

      const orderData = {
        items: orderItems,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        customerAddress: customerInfo.address,
        customerCity: customerInfo.city,
        customerPincode: customerInfo.pincode,
        totalAmount: orderTotal,
        paymentMethod: selectedPaymentMethod,
        status: "PENDING", // Fixed the enum case
      };

      console.log(
        "📦 Order data being sent:",
        JSON.stringify(orderData, null, 2)
      );

      const response = await orderService.createOrder(orderData);
      alert("Order placed successfully!");
      clearCart();
      navigate("/order-success");
    } catch (error) {
      console.error("💥 Order error:", error);
      alert(
        "Order failed: " + (error.response?.data?.message || error.message)
      );
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Your cart is empty
          </h2>
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
        <h2 className="text-3xl font-bold mb-8 text-white text-center">
          Checkout
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-white">
                  Delivery Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    className="bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-3 placeholder-gray-400 focus:border-green-500 focus:outline-none w-full"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    className="bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-3 placeholder-gray-400 focus:border-green-500 focus:outline-none w-full"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    className="bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-3 placeholder-gray-400 focus:border-green-500 focus:outline-none w-full"
                    required
                  />
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={customerInfo.pincode}
                    onChange={handleInputChange}
                    className="bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-3 placeholder-gray-400 focus:border-green-500 focus:outline-none w-full"
                    required
                  />
                </div>

                <input
                  type="text"
                  name="address"
                  placeholder="Full Address"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  className="bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-3 w-full mb-4 placeholder-gray-400 focus:border-green-500 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={customerInfo.city}
                  onChange={handleInputChange}
                  className="bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-3 w-full placeholder-gray-400 focus:border-green-500 focus:outline-none"
                  required
                />
              </div>

              <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-white">
                  Payment Method
                </h3>

                <div className="space-y-4 payment-methods">
                  {/* Cash on Delivery */}
                  <label className="flex items-center text-gray-300 cursor-pointer p-3 rounded-md hover:bg-gray-700">
                    <input
                      type="radio"
                      name="paymentCategory"
                      value="cod"
                      checked={paymentCategory === "cod"}
                      onChange={() => {
                        setPaymentCategory("cod");
                        setPaymentProvider(""); // Clear provider if COD
                      }}
                      className="mr-4 w-4 h-4 text-green-600"
                    />
                    <span className="text-lg text-white">Cash on Delivery</span>
                  </label>

                  {/* Online Payment Group */}
                  <label className="flex items-center text-gray-300 cursor-pointer p-3 rounded-md hover:bg-gray-700">
                    <input
                      type="radio"
                      name="paymentCategory"
                      value="online"
                      checked={paymentCategory === "online"}
                      onChange={() => setPaymentCategory("online")}
                      className="mr-4 w-4 h-4 text-green-600"
                    />
                    <span className="text-lg text-white">Online Payment</span>
                  </label>
                  {paymentCategory === "online" && (
                    <div className="mt-4 space-y-3 ml-8">
                      <label className="flex items-center text-gray-300 cursor-pointer p-3 rounded-md hover:bg-gray-700">
                        <input
                          type="radio"
                          name="paymentProvider"
                          value="paypal"
                          checked={paymentProvider === "paypal"}
                          onChange={(e) => setPaymentProvider(e.target.value)}
                          className="mr-4 w-4 h-4 text-green-600"
                        />
                        <span className="text-lg text-white">PayPal</span>
                      </label>
                      <label className="flex items-center text-gray-300 cursor-pointer p-3 rounded-md hover:bg-gray-700">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="stripe"
                          checked={paymentProvider === "stripe"}
                          onChange={(e) => setPaymentProvider(e.target.value)}
                          className="mr-4 w-4 h-4 text-green-600"
                        />
                        <span className="text-lg text-white">Stripe</span>
                      </label>
                      <label className="flex items-center text-gray-300 cursor-pointer p-3 rounded-md hover:bg-gray-700">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="payu"
                          checked={paymentProvider === "payu"}
                          onChange={(e) => setPaymentProvider(e.target.value)}
                          className="mr-4 w-4 h-4 text-green-600"
                        />
                        <span className="text-lg text-white">PayU</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-green-600 text-white py-4 rounded-md hover:bg-green-700 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-4 lg:h-fit">
            <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-white">
                Order Summary
              </h3>

              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center text-gray-300 border-b border-gray-600 pb-3"
                  >
                    <div>
                      <span className="font-medium text-white text-sm">
                        {item.name}
                      </span>
                      <span className="text-gray-400 ml-2 text-sm">
                        x{item.quantity}
                      </span>
                    </div>
                    <span className="text-white font-semibold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <hr className="my-4 border-gray-600" />

              <div className="space-y-3">
                <div className="flex justify-between text-gray-300 text-lg">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300 text-lg">
                  <span>Delivery</span>
                  <span>₹{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-xl text-white border-t border-gray-600 pt-3">
                  <span>Total</span>
                  <span>₹{orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
