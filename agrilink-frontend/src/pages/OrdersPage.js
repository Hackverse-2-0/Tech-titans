import { useEffect, useState } from "react";
import api from "../services/api";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const storedUser = JSON.parse(localStorage.getItem("user"));

      setUser(storedUser);

      if (!token || !storedUser) {
        console.log("Not logged in");
        return;
      }

      let endpoint = "";

      if (storedUser.role === "buyer") {
        endpoint = "/orders/buyer";
      } else if (storedUser.role === "farmer") {
        endpoint = "/orders/farmer";
      }

      const res = await api.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (error) {
      console.log("ERROR:", error.response?.data || error.message);
    }
  };

  
  const updateStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/orders/${orderId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`Order status updated to ${status}`);
      fetchOrders(); 
    } catch (error) {
      console.log(
        "Status Update Error:",
        error.response?.data || error.message
      );
    }
  };

 
  const getStep = (status) => {
    if (status === "PENDING") return 1;
    if (status === "ACCEPTED") return 2;
    if (status === "DELIVERED") return 3;
    return 1;
  };

  
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 50 }}>
      <h2 style={{ marginBottom: 30 }}>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => {
          const step = getStep(order.status || "PENDING");

          return (
            <div
              key={order.id}
              style={{
                marginBottom: 25,
                padding: 25,
                borderRadius: 14,
                background: "#111827",
                color: "white",
                boxShadow: "0 6px 15px rgba(0,0,0,0.35)",
              }}
            >
              
              <p>
                <strong>Product:</strong> {order.product?.title}
              </p>
              <p>
                <strong>Quantity:</strong> {order.quantity}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color:
                      order.status === "DELIVERED"
                        ? "#22c55e"
                        : order.status === "ACCEPTED"
                        ? "#3b82f6"
                        : order.status === "REJECTED"
                        ? "#ef4444"
                        : "#f59e0b",
                    fontWeight: "bold",
                  }}
                >
                  {order.status || "PENDING"}
                </span>
              </p>

              
              {order.buyer && (
                <p>
                  <strong>Buyer:</strong> {order.buyer.name}
                </p>
              )}

             
              <div
                style={{
                  display: "flex",
                  marginTop: 25,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    textAlign: "center",
                    borderBottom:
                      step >= 1
                        ? "4px solid #f59e0b"
                        : "4px solid gray",
                    paddingBottom: 8,
                    fontWeight: step >= 1 ? "bold" : "normal",
                  }}
                >
                  🕒 Pending
                </div>

                <div
                  style={{
                    flex: 1,
                    textAlign: "center",
                    borderBottom:
                      step >= 2
                        ? "4px solid #3b82f6"
                        : "4px solid gray",
                    paddingBottom: 8,
                    fontWeight: step >= 2 ? "bold" : "normal",
                  }}
                >
                  👍 Accepted
                </div>

                <div
                  style={{
                    flex: 1,
                    textAlign: "center",
                    borderBottom:
                      step >= 3
                        ? "4px solid #22c55e"
                        : "4px solid gray",
                    paddingBottom: 8,
                    fontWeight: step >= 3 ? "bold" : "normal",
                  }}
                >
                  📦 Delivered
                </div>
              </div>

             
              {order.status === "REJECTED" && (
                <p
                  style={{
                    color: "#ef4444",
                    fontWeight: "bold",
                    marginTop: 10,
                  }}
                >
                  ❌ Order Rejected by Farmer
                </p>
              )}

              
              {user?.role === "farmer" && order.status !== "REJECTED" && (
                <div style={{ marginTop: 20 }}>
                  
                  {order.status === "PENDING" && (
                    <>
                      <button
                        onClick={() =>
                          updateStatus(order.id, "ACCEPTED")
                        }
                        style={{
                          marginRight: 10,
                          padding: "8px 14px",
                          backgroundColor: "#22c55e",
                          color: "white",
                          border: "none",
                          borderRadius: 6,
                          cursor: "pointer",
                        }}
                      >
                        Accept Order
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(order.id, "REJECTED")
                        }
                        style={{
                          padding: "8px 14px",
                          backgroundColor: "#ef4444",
                          color: "white",
                          border: "none",
                          borderRadius: 6,
                          cursor: "pointer",
                        }}
                      >
                        Reject Order
                      </button>
                    </>
                  )}

                  
                  {order.status === "ACCEPTED" && (
                    <button
                      onClick={() =>
                        updateStatus(order.id, "DELIVERED")
                      }
                      style={{
                        padding: "8px 14px",
                        backgroundColor: "#3b82f6",
                        color: "white",
                        border: "none",
                        borderRadius: 6,
                        cursor: "pointer",
                      }}
                    >
                      Mark as Delivered
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default OrdersPage;