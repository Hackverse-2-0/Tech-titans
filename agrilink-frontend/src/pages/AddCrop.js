import { useState } from "react";
import api from "../services/api";

function AddCrop() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async () => {
    try {
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

      console.log(res.data);
      alert(" Product Added Successfully");

      setTitle("");
      setDescription("");
      setPrice("");

    } catch (error) {
      console.log(error.response?.data);
      alert("Error adding product");
    }
  };

  return (
    <div style={{ margin: 50 }}>
      <h2>Add Product</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br /><br />

      <button onClick={handleSubmit}>Add Product</button>
    </div>
  );
}

export default AddCrop;