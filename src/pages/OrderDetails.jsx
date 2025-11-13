import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const order = orders.find((o) => o.id.toString() === id.toString());

  if (!order) {
    return (
      <div className="mt-28 text-center">
        <h2 className="text-xl font-semibold">Order Not Found</h2>
        <button onClick={() => navigate("/orders")} className="btn btn-primary mt-4">
          Back to Orders
        </button>
      </div>
    );
  }

  const reorder = () => {
    order.items.forEach((item) => addToCart(item));
    navigate("/cart");
  };

  return (
    <div className="max-w-5xl mx-auto mt-28 px-4 pb-14">
      <h1 className="text-3xl font-bold mb-4">Order Details</h1>

      <div className="bg-base-200 p-5 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold">Order #{order.id}</h2>
        <p className="text-gray-500 text-sm mt-1">{order.date}</p>
        <p className="font-bold mt-2 text-lg">Total: ${order.amount}</p>
      </div>

      <h3 className="text-xl font-semibold mb-3">Items</h3>

      <div className="space-y-4">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-base-200 p-4 rounded-lg shadow gap-4"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-20 h-20 object-cover rounded-md"
            />

            <div className="flex-1">
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-gray-500">{item.qty} × ${item.price}</p>
            </div>

            <p className="font-bold text-lg">${(item.qty * item.price).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <button className="btn btn-primary mt-6 w-full" onClick={reorder}>
        Reorder Items
      </button>
    </div>
  );
};

export default OrderDetails;
