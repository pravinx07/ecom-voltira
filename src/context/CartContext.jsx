import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product) => {
  if (!product || !product.id || typeof product.id !== "number") {
    console.error("❌ INVALID PRODUCT PASSED TO CART:", product);
    return; // BLOCK it
  }

  setItems((prev) => {
    const exists = prev.find((p) => p.id === product.id);

    if (exists) {
      return prev.map((p) =>
        p.id === product.id ? { ...p, qty: p.qty + 1 } : p
      );
    }

    return [...prev, { ...product, qty: 1 }];
  });
};


  const increaseQty = (id) =>
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p))
    );

  const decreaseQty = (id) =>
    setItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: p.qty - 1 } : p))
        .filter((p) => p.qty > 0)
    );

  const removeItem = (id) =>
    setItems((prev) => prev.filter((p) => p.id !== id));

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider
      value={{ items, addToCart, increaseQty, decreaseQty, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;