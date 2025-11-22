"use client";

import React from "react";
import { useCart } from "@/contexts/CartContext";

export const Cart: React.FC = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart,
  } = useCart();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
  };

  // Empty cart state
  if (items.length === 0) {
    return (
      <div
        style={{
          padding: "40px 20px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "200px",
        }}
      >
        <div
          style={{
            fontSize: "64px",
            marginBottom: "20px",
            opacity: 0.5,
          }}
        >
          🛒
        </div>
        <h3
          style={{
            fontSize: "20px",
            color: "#666",
            marginBottom: "10px",
          }}
        >
          Your cart is empty
        </h3>
        <p
          style={{
            fontSize: "14px",
            color: "#888",
            margin: 0,
          }}
        >
          Add some delicious items from our menu!
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      {/* Cart Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          borderBottom: "2px solid #ff6b35",
          paddingBottom: "15px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "24px",
            color: "#333",
          }}
        >
          Shopping Cart ({getTotalItems()}{" "}
          {getTotalItems() === 1 ? "item" : "items"})
        </h2>
        <button
          onClick={clearCart}
          style={{
            backgroundColor: "transparent",
            color: "#ff6b35",
            border: "1px solid #ff6b35",
            padding: "6px 12px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "bold",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#ff6b35";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#ff6b35";
          }}
        >
          Clear Cart
        </button>
      </div>

      {/* Cart Items */}
      <div style={{ marginBottom: "20px" }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "15px 0",
              borderBottom: "1px solid #eee",
              gap: "15px",
            }}
          >
            {/* Item Image */}
            <div
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <span style={{ fontSize: "20px", opacity: 0.5 }}>🍔</span>
              )}
            </div>

            {/* Item Details */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h4
                style={{
                  margin: "0 0 5px 0",
                  fontSize: "16px",
                  color: "#333",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.name}
              </h4>
              <p
                style={{
                  margin: 0,
                  color: "#ff6b35",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                ${item.price.toFixed(2)}
              </p>
            </div>

            {/* Quantity Controls */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexShrink: 0,
              }}
            >
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                style={{
                  backgroundColor: "#f0f0f0",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                -
              </button>

              <span
                style={{
                  minWidth: "30px",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                {item.quantity}
              </span>

              <button
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                style={{
                  backgroundColor: "#f0f0f0",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                +
              </button>

              <button
                onClick={() => handleRemoveItem(item.id)}
                style={{
                  backgroundColor: "#ff4444",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "6px 10px",
                  marginLeft: "10px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Footer */}
      <div
        style={{
          borderTop: "2px solid #ff6b35",
          paddingTop: "20px",
          backgroundColor: "#f9f9f9",
          margin: "0 -20px -20px -20px",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          <span style={{ color: "#333" }}>Total:</span>
          <span style={{ color: "#ff6b35" }}>
            ${getTotalPrice().toFixed(2)}
          </span>
        </div>

        <button
          style={{
            backgroundColor: "#ff6b35",
            color: "white",
            border: "none",
            padding: "15px 24px",
            borderRadius: "8px",
            cursor: "pointer",
            width: "100%",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "background-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#e55b25";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#ff6b35";
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};
