import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const cart = useCart();
  console.log(cart);
  

  const fetchProduct = async () => {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await res.json();
    setProduct(data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div className="flex justify-center border-2 border-purple-500/30">
      <div className="card bg-base-100 w-96 shadow-sm ">
        <figure>
          <img src={product?.thumbnail} alt={product?.title} />
        </figure>
        <div className="card-body items-center">
          <h2 className="card-title text-2xl font-medium  text-purple-400">
            {product?.title}
          </h2>
          <h2 className="text-2xl font-semibold text-gray-400">
            ${product?.price}
          </h2>
          <p>{product?.rating} / 5</p>
          <p className="text-center">{product?.description}</p>
          <div className="card-actions justify-end">
            <div
              className="badge badge-outline btn btn-primary hover:shadow-lg hover:shadow-purple-500/50"
              onClick={() => cart.setItems([...cart.items, {name: product?.title, price: product?.price}])}
            >
              Add to Cart
            </div>
            <div className="badge badge-outline btn btn-primary hover:shadow-lg hover:shadow-purple-500/50">
              Buy Now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
