"use client";

import React from "react";
import { useCart } from "@/contexts/CartContext";
import { Cart } from "./cart";

export const CartDialog: React.FC = () => {
  const { isOpen, setIsOpen } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 999,
        }}
        onClick={() => setIsOpen(false)}
      />

      {/* Cart Dialog */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "400px",
          height: "100vh",
          backgroundColor: "white",
          boxShadow: "-2px 0 20px rgba(0,0,0,0.1)",
          zIndex: 1000,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Dialog Header */}
        <div
          style={{
            padding: "20px",
            borderBottom: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "20px",
              color: "#333",
            }}
          >
            Your Cart
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              backgroundColor: "transparent",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#666",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f0f0f0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            ×
          </button>
        </div>

        {/* Cart Content */}
        <div style={{ flex: 1 }}>
          <Cart />
        </div>
      </div>
    </>
  );
};
