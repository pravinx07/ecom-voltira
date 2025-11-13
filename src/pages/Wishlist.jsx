import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // move item to cart (and remove from wishlist)
  const moveToCart = (product) => {
    if (!product || !product.id) return;
    addToCart(product);
    removeFromWishlist(product.id);
    // optional: navigate to cart or show toast
    // navigate("/cart");
  };

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center mt-28 px-4">
        <h2 className="text-2xl font-semibold mb-3">Your wishlist is empty 💔</h2>
        <p className="text-gray-400 mb-6 text-center max-w-md">
          Save products you love and access them later from this page.
        </p>
        <Link to="/">
          <button className="btn btn-primary">Shop Products</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-28 px-4 pb-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Your Wishlist</h1>
        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-500">{wishlist.length} items</span>
          <button onClick={() => clearWishlist()} className="btn btn-sm btn-warning">
            Clear Wishlist
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => {
          if (!item || !item.id) return null;
          return (
            <div key={item.id} className="bg-base-200 rounded-xl shadow-md overflow-hidden">
              <div className="h-56 overflow-hidden">
                <img
                  src={item.thumbnail || item.images?.[0] || ""}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="p-4 flex flex-col gap-3">
                <div>
                  <h3 className="font-semibold text-lg line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{item.brand || item.category}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 font-bold text-lg">${item.price}</p>
                    <p className="text-sm text-gray-400">{item.rating} ⭐</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => moveToCart(item)}
                      className="btn btn-sm btn-primary"
                    >
                      Move to Cart
                    </button>

                    <div className="flex gap-2">
                      <Link to={`/product/${item.id}`} className="btn btn-sm btn-ghost">
                        View
                      </Link>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="btn btn-sm btn-error"
                        aria-label={`Remove ${item.title} from wishlist`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
