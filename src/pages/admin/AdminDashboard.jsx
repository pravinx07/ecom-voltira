import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto mt-28 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Link to="/admin/products">
          <div className="card bg-base-200 shadow-md p-6 rounded-xl hover:scale-105 transition">
            <h2 className="text-xl font-semibold mb-2">Manage Products</h2>
            <p>View, Edit, Delete all products</p>
          </div>
        </Link>

        <Link to="/admin/add-product">
          <div className="card bg-base-200 shadow-md p-6 rounded-xl hover:scale-105 transition">
            <h2 className="text-xl font-semibold mb-2">Add Product</h2>
            <p>Create new products</p>
          </div>
        </Link>

      </div>
    </div>
  );
};

export default AdminDashboard;
