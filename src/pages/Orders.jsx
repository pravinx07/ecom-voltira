import React from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  if (orders.length === 0) {
    return (
      <div className="mt-28 flex flex-col items-center p-4 min-h-[60vh]">
        <h2 className="text-2xl mb-3 font-semibold">No Orders Yet 🛍️</h2>
        <p className="text-gray-500 mb-6 text-center max-w-md">
          You haven’t placed any orders yet. Start shopping now!
        </p>
        <Link to="/" className="btn btn-primary">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-28 px-4 pb-10">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-base-200 p-5 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div>
              <h3 className="font-semibold text-lg">Order #{order.id}</h3>
              <p className="text-gray-500 text-sm">{order.date}</p>
              <p className="font-bold mt-1">Total: ${order.amount}</p>
            </div>

            <div className="flex gap-3 mt-3 md:mt-0">
              <Link
                to={`/orders/${order.id}`}
                className="btn btn-sm btn-primary"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
