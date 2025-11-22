"use client";

import { useState } from "react";

interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  status: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  orderType: string;
  estimatedPrepTime: number;
  createdAt: string;
}

export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const trackOrder = async () => {
    if (!orderNumber.trim()) {
      setError("Please enter an order number");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/orders/track/${orderNumber}`);
      if (response.ok) {
        const result = await response.json();
        if (result.ok) {
          setOrder(result.data);
        } else {
          setError("Order not found");
          setOrder(null);
        }
      } else {
        setError("Order not found");
        setOrder(null);
      }
    } catch (error) {
      setError("Error tracking order");
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const calculateRemainingTime = (
    createdAt: string,
    estimatedPrepTime: number
  ) => {
    const orderTime = new Date(createdAt).getTime();
    const now = new Date().getTime();
    const elapsedMinutes = Math.floor((now - orderTime) / 60000);
    return Math.max(0, estimatedPrepTime - elapsedMinutes);
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "600px",
        margin: "0 auto",
        minHeight: "50vh",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        Track My Order
      </h1>

      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="Enter your order number (e.g., ORD-123456789)"
            style={{
              flex: 1,
              padding: "0.75rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              fontSize: "1rem",
            }}
            onKeyPress={(e) => e.key === "Enter" && trackOrder()}
          />
          <button
            onClick={trackOrder}
            disabled={loading}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#ea580c",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            {loading ? "Tracking..." : "Track Order"}
          </button>
        </div>
        {error && (
          <div
            style={{
              color: "#ef4444",
              marginTop: "0.5rem",
              fontSize: "0.875rem",
            }}
          >
            {error}
          </div>
        )}
      </div>

      {order && (
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
            padding: "1.5rem",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "1rem",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                Order #{order.orderNumber}
              </h2>
              <p style={{ color: "#6b7280" }}>Customer: {order.customerName}</p>
              <p style={{ color: "#6b7280" }}>Type: {order.orderType}</p>
            </div>
            <div
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#22c55e",
                color: "white",
                borderRadius: "0.375rem",
                fontWeight: "bold",
              }}
            >
              ⏱️{" "}
              {calculateRemainingTime(order.createdAt, order.estimatedPrepTime)}
              m remaining
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <h3 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
              Items:
            </h3>
            {order.items.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.25rem",
                }}
              >
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span>${(item.quantity * item.price).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid #e5e7eb",
              paddingTop: "1rem",
            }}
          >
            <div>
              <strong>Total: ${order.total.toFixed(2)}</strong>
            </div>
            <div
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#3b82f6",
                color: "white",
                borderRadius: "0.375rem",
                fontWeight: "bold",
              }}
            >
              Status: {order.status.toUpperCase()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
