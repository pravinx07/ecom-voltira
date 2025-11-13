import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "UPI",
  });

  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    if (!form.name || !form.phone || !form.address || !form.city || !form.pincode) {
      alert("Please fill all the address fields.");
      return;
    }

    // Create order object
    const order = {
      id: Date.now(),
      items,
      amount: total,
      address: form,
      date: new Date().toLocaleString(),
    };

    // Save to Order History
    const history = JSON.parse(localStorage.getItem("orders")) || [];
    history.push(order);
    localStorage.setItem("orders", JSON.stringify(history));

    // Clear cart
    clearCart();

    navigate("/order-success");
  };

  if (items.length === 0) {
    return (
      <div className="mt-28 text-center text-xl p-4">
        Your cart is empty.  
        <button onClick={() => navigate("/")} className="btn btn-primary ml-3">
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-28 px-4 pb-10">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Address Form */}
        <div className="md:col-span-2 bg-base-200 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

          <div className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="input input-bordered w-full"
              onChange={onChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="input input-bordered w-full"
              onChange={onChange}
            />

            <input
              type="text"
              name="address"
              placeholder="Full Address"
              className="input input-bordered w-full"
              onChange={onChange}
            />

            <div className="flex gap-3">
              <input
                type="text"
                name="city"
                placeholder="City"
                className="input input-bordered w-full"
                onChange={onChange}
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                className="input input-bordered w-full"
                onChange={onChange}
              />
            </div>
          </div>

          {/* Payment Method */}
          <h2 className="text-xl font-semibold mt-6 mb-2">Payment Method</h2>

          <select
            name="payment"
            className="select select-bordered w-full"
            onChange={onChange}
          >
            <option value="UPI">UPI</option>
            <option value="COD">Cash on Delivery</option>
            <option value="Card">Credit / Debit Card</option>
          </select>
        </div>

        {/* Order Summary */}
        <div className="bg-base-200 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.title}</span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            className="btn btn-primary w-full mt-4"
            onClick={placeOrder}
          >
            Place Order
          </button>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
