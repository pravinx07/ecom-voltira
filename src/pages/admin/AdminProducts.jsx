import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("adminProducts")) || [];
    setProducts(stored);
  }, []);

  const deleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("adminProducts", JSON.stringify(updated));
  };

  return (
    <div className="max-w-6xl mx-auto mt-28 px-4 pb-10">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

      <Link to="/admin/add-product" className="btn btn-primary mb-4">
        Add New Product
      </Link>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Price</th>
              <th>Brand</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  <img src={p.thumbnail} className="w-14 rounded" />
                </td>
                <td>{p.title}</td>
                <td>${p.price}</td>
                <td>{p.brand}</td>
                <td className="flex gap-2">
                  <Link to={`/admin/edit-product/${p.id}`} className="btn btn-sm btn-warning">
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => deleteProduct(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No admin products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
