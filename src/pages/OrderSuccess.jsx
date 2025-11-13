import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="mt-28 flex flex-col items-center p-6">
      <img
        src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
        className="w-32 mb-4"
        alt="success"
      />
      <h1 className="text-2xl font-bold mb-3">Order Placed Successfully! 🎉</h1>
      <p className="text-gray-500 mb-6">
        Thank you for shopping with us. Your order is confirmed.
      </p>

      <Link to="/orders" className="btn btn-secondary mb-3">
        View Orders
      </Link>

      <Link to="/" className="btn btn-primary">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;
