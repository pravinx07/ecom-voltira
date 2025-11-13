import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const Navbar = () => {
  const { items } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  // Close suggestion dropdown if clicked outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // 🔎 Debounced API search
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search.trim().length > 0) {
        fetchSuggestions(search); 
      } else {
        setSuggestions([]);
      }
    }, 350);

    return () => clearTimeout(timeout);
  }, [search]);

  const fetchSuggestions = async (q) => {
    try {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(q)}`
      );
      const data = await res.json();
      setSuggestions(data.products.slice(0, 6));
      setShowDropdown(true);
    } catch {
      setSuggestions([]);
    }
  };

  // 🔥 FIX: navigate ONLY here, NOT in useEffect
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim().length === 0) {
      navigate("/");
    } else {
      navigate(`/?search=${encodeURIComponent(value)}`);
    }
  };

  const clearSearch = () => {
    setSearch("");
    setSuggestions([]);
    setShowDropdown(false);
    navigate("/");
  };

  const goToProduct = (id) => {
    setSearch("");
    setSuggestions([]);
    setShowDropdown(false);
    navigate(`/product/${id}`);
  };

  // Dark mode toggle
  const toggleTheme = () => {
    const curr = document.documentElement.getAttribute("data-theme") || "light";
    document.documentElement.setAttribute("data-theme", curr === "light" ? "dark" : "light");
  };

  return (
    <div className="navbar bg-base-100 shadow-md fixed top-0 left-0 w-full z-50 px-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-2xl text-secondary">🛍️ ShopEase</Link>
      </div>

      <div className="flex gap-4 items-center" ref={dropdownRef}>
        {/* Search Input */}
        <div className="relative w-full max-w-xs md:w-96">
          <input
            type="text"
            placeholder="Search products..."
            className="input input-bordered w-full"
            value={search}
            onChange={handleSearchInput}
            onFocus={() => search && setShowDropdown(true)}
          />

          {/* Clear button */}
          {search && (
            <button className="absolute right-3 top-3 text-gray-400" onClick={clearSearch}>
              ✖
            </button>
          )}

          {/* Suggestions */}
          {showDropdown && suggestions.length > 0 && (
            <ul className="absolute bg-base-100 border border-gray-700 w-full mt-1 rounded-lg shadow-xl z-50">
              {suggestions.map((item) => (
                <li
                  key={item.id}
                  className="p-2 flex items-center gap-3 hover:bg-base-300 cursor-pointer"
                  onClick={() => goToProduct(item.id)}
                >
                  <img src={item.thumbnail} className="w-10 h-10 rounded object-cover" />
                  <span className="truncate">{item.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart">
          <div className="btn btn-ghost btn-circle">
            <div className="indicator">
              <span className="badge badge-sm badge-primary indicator-item">{items.length}</span>
              🛒
            </div>
          </div>
        </Link>

        {/* Wishlist */}
        <Link to="/wishlist">
          <div className="btn btn-ghost btn-circle">
            <div className="indicator">
              <span className="badge badge-sm badge-secondary indicator-item">{wishlist.length}</span>
              ❤️
            </div>
          </div>
        </Link>

        {/* Dark mode */}
        <button className="btn btn-ghost btn-circle" onClick={toggleTheme}>
          🌗
        </button>

        {/* Avatar */}
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
