import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items, increaseQty, decreaseQty, removeItem } = useCart();

  console.log("CART ITEMS:", items); // 🧪 DEBUG

  // ❌ fix: correct empty cart check
  if (!items || items.length === 0) {
    return (
      <div className="mt-28 min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl mb-4">Your cart is empty 🛒</h2>
        <Link to="/" className="btn btn-primary">Shop Now</Link>
      </div>
    );
  }

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="max-w-4xl mx-auto mt-28 px-4 pb-10">
      <h1 className="text-center text-3xl font-semibold mb-6">Your Cart</h1>

      <ul className="space-y-4">
        {items.map((item) => {
          if (!item.id) return null; // 🚨 Prevent crashes

          return (
            <li key={item.id} className="bg-base-200 p-4 rounded-lg shadow flex items-center gap-4">
              {/* Image */}
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-md"
              />

              {/* Title & Price */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-400">${item.price}</p>
              </div>

              {/* Qty */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="btn btn-sm btn-outline"
                >
                  -
                </button>

                <span className="font-semibold">{item.qty}</span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="btn btn-sm btn-outline"
                >
                  +
                </button>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeItem(item.id)}
                className="btn btn-error btn-sm"
              >
                X
              </button>

              {/* Subtotal */}
              <p className="text-lg font-bold text-green-500">
                ${(item.price * item.qty).toFixed(2)}
              </p>
            </li>
          );
        })}
      </ul>

      {/* Total */}
      <div className="text-center mt-6">
        <h3 className="text-xl font-bold">Grand Total: ${total.toFixed(2)}</h3>
        <Link to="/checkout">
          <button className="btn btn-primary mt-3">Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
