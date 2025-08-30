import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-green-600 mb-2">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600">
            Thank you for shopping with BaniyaMart
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-gray-700">
            Your order has been placed successfully. You will receive a
            confirmation email shortly.
          </p>

          <div className="flex flex-col space-y-3">
            <button
              onClick={() => navigate("/products")}
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
