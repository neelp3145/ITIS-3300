"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load cart from localStorage
    const loadCart = () => {
      const savedCart = localStorage.getItem('fastbite-cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
      setLoading(false);
    };

    loadCart();

    // Listen for cart updates from other pages
    window.addEventListener('cart-updated', loadCart);

    return () => {
      window.removeEventListener('cart-updated', loadCart);
    };
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedCart);
    localStorage.setItem('fastbite-cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('fastbite-cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('fastbite-cart');
    window.dispatchEvent(new Event('cart-updated'));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (loading) {
    return (
      <div style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <div style={{ fontSize: "24px", color: "#ff6b35" }}>
          Loading cart...
        </div>
      </div>
    );
  }

  return (
    <div style={{
      padding: "20px",
      maxWidth: "1200px",
      margin: "0 auto",
      minHeight: "100vh"
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ color: "#ff6b35", fontSize: "48px", marginBottom: "10px" }}>
          Your Cart
        </h1>
        <p style={{ fontSize: "20px", color: "#666" }}>
          Review your order before checkout
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "60px 20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "12px",
          border: "2px dashed #ddd"
        }}>
          <div style={{ fontSize: "64px", marginBottom: "20px" }}>🛒</div>
          <h2 style={{ color: "#666", fontSize: "28px", marginBottom: "10px" }}>
            Your cart is empty
          </h2>
          <p style={{ color: "#888", fontSize: "16px", marginBottom: "30px" }}>
            Add some delicious items from our menu!
          </p>
          <a
            href="/menu"
            style={{
              backgroundColor: "#ff6b35",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: "bold",
              display: "inline-block"
            }}
          >
            Browse Menu
          </a>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div style={{ marginBottom: "40px" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px"
            }}>
              <h2 style={{ fontSize: "24px", color: "white" }}>
                Cart Items ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})
              </h2>
              <button
                onClick={clearCart}
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                Clear Cart
              </button>
            </div>

            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px"
            }}>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    border: "1px solid #ddd",
                    padding: "20px",
                    borderRadius: "12px",
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    gap: "20px"
                  }}
                >
                  {/* Item Image */}
                  <div style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "8px",
                    border: "1px solid #e0e0e0",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: 0
                  }}>
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        color: "#888",
                        fontSize: "12px"
                      }}>
                        🍔
                      </div>
                    )}
                  </div>

                  {/* Item Details */}
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: "18px",
                      margin: "0 0 5px 0",
                      color: "#333"
                    }}>
                      {item.name}
                    </h3>
                    <p style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#ff6b35",
                      margin: "0"
                    }}>
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                  }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #ddd",
                        width: "32px",
                        height: "32px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "16px"
                      }}
                    >
                      -
                    </button>
                    <span style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      minWidth: "30px",
                      textAlign: "center"
                    }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #ddd",
                        width: "32px",
                        height: "32px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "16px"
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* Item Total & Remove */}
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "10px"
                  }}>
                    <p style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#333",
                      margin: "0"
                    }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "#dc3545",
                        cursor: "pointer",
                        fontSize: "12px",
                        textDecoration: "underline"
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div style={{
            backgroundColor: "#fffaf0",
            padding: "25px",
            borderRadius: "12px",
            border: "2px solid #ff6b35"
          }}>
            <h3 style={{
              fontSize: "24px",
              margin: "0 0 20px 0",
              color: "#ff6b35",
              textAlign: "center"
            }}>
              Order Summary
            </h3>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
              marginBottom: "25px"
            }}>
              <div>
                <p style={{ margin: "5px 0", color: "#666" }}>Subtotal:</p>
                <p style={{ margin: "5px 0", color: "#666" }}>Tax (8%):</p>
                <p style={{ margin: "5px 0", color: "#666" }}>Total:</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ margin: "5px 0", color: "#666" }}>${getTotalPrice().toFixed(2)}</p>
                <p style={{ margin: "5px 0", color: "#666" }}>${(getTotalPrice() * 0.08).toFixed(2)}</p>
                <p style={{ margin: "5px 0", fontSize: "20px", fontWeight: "bold", color: "#ff6b35" }}>
                  ${(getTotalPrice() * 1.08).toFixed(2)}
                </p>
              </div>
            </div>

            <button
              style={{
                backgroundColor: "#ff6b35",
                color: "white",
                border: "none",
                padding: "15px 30px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "bold",
                width: "100%",
                transition: "background-color 0.3s ease"
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
        </>
      )}
    </div>
  );
};

export default Cart;