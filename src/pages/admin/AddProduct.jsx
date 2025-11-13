import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";

const AddProduct = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    title: "",
    price: "",
    brand: "",
    category: "",
    description: "",
    thumbnail: "",
    stock: "",
  });

  const [errors, setErrors] = useState({});
  const [previewImg, setPreviewImg] = useState("");

  const validate = () => {
    const err = {};

    if (!form.title.trim()) err.title = "Title is required";
    if (!form.price || form.price <= 0) err.price = "Valid price required";
    if (!form.brand.trim()) err.brand = "Brand is required";
    if (!form.category.trim()) err.category = "Category is required";
    if (!form.description.trim()) err.description = "Description required";
    if (!form.thumbnail.trim()) err.thumbnail = "Image URL required";
    if (!form.stock || form.stock <= 0) err.stock = "Stock must be a positive number";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "thumbnail") {
      setPreviewImg(value);
    }
  };

  const handleSubmit = () => {
    if (!validate()) {
      showToast("Please fix errors in form", "error");
      return;
    }

    const newProduct = {
      id: Date.now(),
      title: form.title,
      price: Number(form.price),
      brand: form.brand,
      category: form.category,
      description: form.description,
      thumbnail: form.thumbnail,
      images: [form.thumbnail],
      rating: 4.3,
      stock: Number(form.stock),
    };

    const previous = JSON.parse(localStorage.getItem("adminProducts")) || [];
    previous.push(newProduct);

    localStorage.setItem("adminProducts", JSON.stringify(previous));

    showToast("Product added successfully!", "success");
    navigate("/admin/products");
  };

  return (
    <div className="max-w-3xl mx-auto mt-28 p-4">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>

      <div className="grid grid-cols-1 gap-4">

        <input
          name="title"
          className="input input-bordered"
          placeholder="Product Title"
          onChange={handleChange}
        />
        {errors.title && <p className="text-red-400">{errors.title}</p>}

        <input
          name="price"
          type="number"
          className="input input-bordered"
          placeholder="Price"
          onChange={handleChange}
        />
        {errors.price && <p className="text-red-400">{errors.price}</p>}

        <input
          name="brand"
          className="input input-bordered"
          placeholder="Brand"
          onChange={handleChange}
        />
        {errors.brand && <p className="text-red-400">{errors.brand}</p>}

        <input
          name="category"
          className="input input-bordered"
          placeholder="Category"
          onChange={handleChange}
        />
        {errors.category && <p className="text-red-400">{errors.category}</p>}

        <textarea
          name="description"
          className="textarea textarea-bordered"
          placeholder="Product Description"
          onChange={handleChange}
        ></textarea>
        {errors.description && <p className="text-red-400">{errors.description}</p>}

        <input
          name="thumbnail"
          className="input input-bordered"
          placeholder="Thumbnail Image URL"
          onChange={handleChange}
        />
        {errors.thumbnail && <p className="text-red-400">{errors.thumbnail}</p>}

        {/* Image Preview */}
        {previewImg && (
          <img
            src={previewImg}
            alt="preview"
            className="w-40 h-40 object-cover rounded-lg shadow"
          />
        )}

        <input
          name="stock"
          type="number"
          className="input input-bordered"
          placeholder="Stock"
          onChange={handleChange}
        />
        {errors.stock && <p className="text-red-400">{errors.stock}</p>}

        <button className="btn btn-primary mt-4" onClick={handleSubmit}>
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
