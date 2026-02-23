import { useEffect, useState } from "react";
import axios from "axios";

function CropList() {
  const [products, setProducts] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Fetch Products Error:", error);
    }
  };

  const placeOrder = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!token || !user) {
        alert("Please login as Buyer first");
        return;
      }

      if (user.role !== "buyer") {
        alert("Only buyers can place orders");
        return;
      }

      setLoadingId(productId);

      await axios.post(
        "http://localhost:5000/api/orders",
        {
          productId: productId,
          quantity: 1, // default quantity (you can add input later)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(" Order Placed Successfully!");
      setLoadingId(null);
    } catch (error) {
      console.error("Order Error:", error.response?.data || error.message);
      alert("Failed to place order");
      setLoadingId(null);
    }
  };

  return (
    <div style={{ margin: 50 }}>
      <h2>All Crops 🌾</h2>

      {products.length === 0 ? (
        <p>No crops available</p>
      ) : (
        products.map((product) => (
          <div
            key={product.id}
            style={{
              marginBottom: 20,
              padding: 15,
              border: "1px solid #ddd",
              borderRadius: 10,
              background: "#fff",
            }}
          >
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p><strong>Price:</strong> ₹{product.price}</p>
            <p><strong>Farmer:</strong> {product.farmer?.name}</p>

           
            <button
              onClick={() => placeOrder(product.id)}
              disabled={loadingId === product.id}
              style={{
                marginTop: 10,
                padding: "8px 16px",
                backgroundColor: loadingId === product.id ? "gray" : "green",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              {loadingId === product.id ? "Placing..." : "🛒 Place Order"}
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default CropList;