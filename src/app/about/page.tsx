"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// This page now fetches from: /api/menuItem
// Which uses: ../../../lib/domains/menuItem/controller

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  imageUrl: string;
}

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State to track which categories are expanded
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    "Pizza": true,
    "Burger": false,
    "Wings": false,
    "Drink": false,
    "Dessert": false,
    "Sides": false,
    "Other": false
  });

  // Fetch menu items from API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/menuItem');
        const result = await response.json();

        if (result.ok) {
          setMenuItems(result.data);
        } else {
          setError('Failed to load menu items');
        }
      } catch (err) {
        setError('Error fetching menu items');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Filter only available items and group by category
  const availableItems = menuItems.filter(item => item.available);

  // Group items by category
  const categories = {
    "Pizza": availableItems.filter(item => item.category === "Pizza"),
    "Burger": availableItems.filter(item => item.category === "Burger"),
    "Wings": availableItems.filter(item => item.category === "Wings"),
    "Drink": availableItems.filter(item => item.category === "Drink"),
    "Dessert": availableItems.filter(item => item.category === "Dessert"),
    "Sides": availableItems.filter(item => item.category === "Sides"),
    "Other": availableItems.filter(item => item.category === "Other")
  };

  // Add to cart function
  const addToCart = (item: MenuItem) => {
    console.log('Adding to cart:', item);

    const cartItem = {
      id: item._id,
      name: item.name,
      price: item.price,
      quantity: 1,
      imageUrl: item.imageUrl
    };

    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('fastbite-cart') || '[]');

    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex((cartItem: any) => cartItem.id === item._id);

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      existingCart.push(cartItem);
    }

    // Save back to localStorage
    localStorage.setItem('fastbite-cart', JSON.stringify(existingCart));

    // Show success message
    alert(`Added ${item.name} to cart!`);

    // Optional: Dispatch event for other components to listen to
    window.dispatchEvent(new Event('cart-updated'));
  };

  // Get emoji for category
  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case "Pizza": return "🍕";
      case "Burger": return "🍔";
      case "Wings": return "🍗";
      case "Drink": return "🥤";
      case "Dessert": return "🍰";
      case "Sides": return "🍟";
      default: return "🍽️";
    }
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
        alignItems: "center",
        flexDirection: "column"
      }}>
        <div style={{ fontSize: "24px", color: "#ff6b35", marginBottom: "20px" }}>
          Loading menu...
        </div>
        <div style={{ fontSize: "48px" }}>🍔</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}>
        <div style={{ fontSize: "24px", color: "#ff6b35", marginBottom: "20px" }}>
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          style={{
            backgroundColor: "#ff6b35",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Try Again
        </button>
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
          Our Menu
        </h1>
        <p style={{ fontSize: "20px", color: "#666" }}>
          Discover our delicious food selection!
        </p>
      </div>

      {/* Menu by Categories with Dropdowns */}
      {Object.entries(categories).map(([category, items]) => {
        // Only show categories that have items
        if (items.length === 0) return null;

        return (
          <div key={category} style={{ marginBottom: "20px" }}>
            {/* Category Header - Clickable for dropdown */}
            <div
              style={{
                backgroundColor: "#ff6b35",
                color: "white",
                padding: "15px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: expandedCategories[category] ? "20px" : "0",
                transition: "all 0.3s ease"
              }}
              onClick={() => toggleCategory(category)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#e55b25";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ff6b35";
              }}
            >
              <h2 style={{
                fontSize: "24px",
                margin: "0",
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}>
                <span>
                  {getCategoryEmoji(category)}
                </span>
                {category} ({items.length} items)
              </h2>
              <span style={{
                fontSize: "20px",
                fontWeight: "bold",
                transition: "transform 0.3s ease",
                transform: expandedCategories[category] ? "rotate(180deg)" : "rotate(0deg)"
              }}>
                ▼
              </span>
            </div>

            {/* Category Items - Collapsible */}
            {expandedCategories[category] && (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                gap: "20px"
              }}>
                {items.map((item) => (
                  <div
                    key={item._id}
                    style={{
                      border: "1px solid #ddd",
                      padding: "20px",
                      borderRadius: "12px",
                      backgroundColor: "white",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      transition: "all 0.3s ease",
                      position: "relative"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                    }}
                  >
                    {/* Name and Price Section */}
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "15px"
                    }}>
                      <div>
                        <h3 style={{
                          fontSize: "20px",
                          margin: "0 0 8px 0",
                          color: "#333"
                        }}>
                          {item.name}
                        </h3>
                      </div>
                      <span style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#ff6b35"
                      }}>
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Image Section */}
                    <div style={{
                      width: "100%",
                      height: "200px",
                      backgroundColor: "#f5f5f5",
                      borderRadius: "8px",
                      marginBottom: "15px",
                      border: "1px solid #e0e0e0",
                      position: "relative",
                      overflow: "hidden"
                    }}>
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          style={{
                            objectFit: "contain",
                            objectPosition: "center",
                            padding: "10px"
                          }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          color: "#888",
                          fontSize: "16px"
                        }}>
                          {getCategoryEmoji(item.category)} No Image
                        </div>
                      )}
                    </div>

                    {/* Description Section */}
                    {item.description && (
                      <p style={{
                        color: "#666",
                        margin: "0 0 15px 0",
                        fontSize: "14px",
                        lineHeight: "1.5"
                      }}>
                        {item.description}
                      </p>
                    )}

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => addToCart(item)}
                      style={{
                        backgroundColor: "#ff6b35",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "14px",
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
                      Add to Cart - ${item.price.toFixed(2)}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
  </div>
  );
};

export default Menu;