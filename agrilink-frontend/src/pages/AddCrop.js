
import { useState } from "react";
import api from "../services/api";

function AddCrop() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description || !price) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await api.post(
        "/products",
        {
          title,
          description,
          price,
          imageUrl: null
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Product Added Successfully");

      setTitle("");
      setDescription("");
      setPrice("");

    } catch (error) {
      console.log(error.response?.data);
      alert("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex justify-center items-start pt-16">

      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10">

        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          Add Product
        </h2>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
          />

          <textarea
            placeholder="Description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddCrop;