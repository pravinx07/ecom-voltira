import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { RecentlyViewedProvider } from "./context/RecentlyViewedContext";

createRoot(document.getElementById("root")).render(
   <ToastProvider>
  <CartProvider>
    <WishlistProvider>
      <RecentlyViewedProvider>
          <App />
      </RecentlyViewedProvider>
    </WishlistProvider>
  </CartProvider>
</ToastProvider>
);
