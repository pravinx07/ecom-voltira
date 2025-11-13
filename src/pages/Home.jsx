import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useWishlist } from "../context/WishlistContext";
import { useRecentlyViewed } from "../context/RecentlyViewedContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [limit, setLimit] = useState(12);
  const [sort, setSort] = useState("");

  const { wishlist, toggleWishlist } = useWishlist();
  const { recent } = useRecentlyViewed();

  const { search } = useLocation();
  const navigate = useNavigate();

  // URL Query Params
  const query = new URLSearchParams(search).get("search") || "";
  const categoryQuery = new URLSearchParams(search).get("category") || "";

  // ------------------------------
  // Fetch Products
  // ------------------------------
  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "https://dummyjson.com/products?limit=100&select=id,title,price,rating,category,thumbnail,images"
      );
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error("Product fetch failed:", err);
      setProducts([]);
    }
  };

  // ------------------------------
  // Fetch Categories
  // ------------------------------
  const fetchCategories = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products/categories");
      const data = await res.json();
      setCategories(data || []);
    } catch (err) {
      console.error("Categories fetch failed:", err);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Show loading if products not ready
  if (products.length === 0) return <Loading />;

  // ------------------------------
  // FILTERING
  // ------------------------------
  let filtered = products.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  if (categoryQuery) {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === categoryQuery.toLowerCase()
    );
  }

  // ------------------------------
  // SORTING
  // ------------------------------
  if (sort === "low") filtered.sort((a, b) => a.price - b.price);
  if (sort === "high") filtered.sort((a, b) => b.price - a.price);
  if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);

  // Pagination
  const visible = filtered.slice(0, limit);

  // ===============================
  // UI
  // ===============================
  return (
    <div className="max-w-7xl mx-auto px-4 mt-28">

      {/* HERO BANNER */}
      <div className="w-full h-[230px] md:h-[350px] rounded-xl overflow-hidden shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format"
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* CATEGORY + SORTING */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          <button className="btn btn-sm" onClick={() => navigate("/")}>
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat.slug}
              className={`btn btn-sm ${
                categoryQuery === cat.slug ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => navigate(`/?category=${cat.slug}`)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sorting */}
        <select
          className="select select-bordered"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
          <option value="rating">Rating: High First</option>
        </select>
      </div>

      {/* NO RESULTS */}
      {filtered.length === 0 && (
        <p className="text-center text-gray-400 mt-10">
          No products found for{" "}
          <span className="text-purple-300">
            "{query || categoryQuery}"
          </span>
        </p>
      )}

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {visible.map((item) => (
          <div key={item.id} className="relative">
            <Link to={`/product/${item.id}`}>
              <div
                className="card bg-base-200 rounded-xl shadow-md border border-purple-500/10 
                           transform transition duration-300 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl"
              >
                <figure className="h-52 overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </figure>

                <div className="card-body">
                  <h2 className="card-title text-lg line-clamp-2">{item.title}</h2>
                  <p className="text-purple-300 font-bold text-xl">${item.price}</p>
                  <p className="text-sm text-gray-400">{item.rating} ⭐</p>
                </div>
              </div>
            </Link>

            {/* Wishlist Heart */}
            <button
              onClick={() => toggleWishlist(item)}
              className={`absolute right-3 top-3 text-xl ${
                wishlist.find((w) => w.id === item.id)
                  ? "text-red-400"
                  : "text-white/80"
              } drop-shadow-lg`}
            >
              {wishlist.find((w) => w.id === item.id) ? "❤️" : "🤍"}
            </button>
          </div>
        ))}
      </div>

      {/* LOAD MORE */}
      {limit < filtered.length && (
        <div className="text-center mt-8">
          <button
            className="btn btn-primary"
            onClick={() => setLimit(limit + 12)}
          >
            Load More
          </button>
        </div>
      )}

      {/* ⭐ RECENTLY VIEWED SECTION */}
      {recent.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-3">Recently Viewed</h2>

          <div className="flex gap-4 overflow-x-auto pb-4">
            {recent.map((item) => (
              <Link to={`/product/${item.id}`} key={item.id}>
                <div className="min-w-[180px] bg-base-200 rounded-lg shadow hover:scale-105 transition">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-32 w-full object-cover rounded-t-lg"
                  />
                  <div className="p-2">
                    <h3 className="text-sm font-semibold line-clamp-2">{item.title}</h3>
                    <p className="text-purple-300 font-bold mt-1">${item.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;
