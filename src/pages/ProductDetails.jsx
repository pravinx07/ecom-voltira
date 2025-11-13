import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
 import { useRecentlyViewed } from "../context/RecentlyViewedContext";


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const { toggleWishlist, wishlist } = useWishlist();

 
const { addViewed } = useRecentlyViewed();

useEffect(() => {
  if (product) {
    addViewed(product);
  }
}, [product]);

  useEffect(() => {
    const fetchOne = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch {
        setProduct(null);
      }
    };
    fetchOne();
  }, [id]);

  if (!product) return <Loading />;

  const inWishlist = wishlist.find((w) => w.id === product.id);

  return (
    <div className="max-w-5xl mx-auto mt-28 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-base-200 p-4 rounded-lg shadow-md">
          <img src={product.images?.[0] || product.thumbnail} alt={product.title} className="w-full h-96 object-cover rounded-lg" />
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {product.images?.map((img, idx) => (
              <img key={idx} src={img} alt={`${product.title}-${idx}`} className="w-24 h-24 object-cover rounded" />
            ))}
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-xl shadow-md border border-purple-500/10">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-sm text-gray-400 mt-1">{product.brand} · {product.category}</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="text-3xl font-bold text-purple-300">${product.price}</div>
            <div className="text-sm text-gray-400">{product.rating} ⭐</div>
          </div>

          <p className="mt-6 text-gray-300">{product.description}</p>

          <div className="mt-6 flex gap-3">
            <button onClick={() => addToCart(product)} className="btn btn-primary">Add to Cart</button>
            <button onClick={() => toggleWishlist(product)} className={`btn btn-outline ${inWishlist ? "btn-error" : ""}`}>
              {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
            <Link to="/checkout" className="ml-auto">
              <button className="btn btn-ghost">Checkout</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
