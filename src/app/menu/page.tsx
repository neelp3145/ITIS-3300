"use client";

import React, { useState, useEffect } from "react";
import { useCart } from '@/contexts/CartContext'; // Import the cart context
import Image from "next/image";

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  image: string;
}

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useCart(); // Use the cart context

  // State to track which categories are expanded
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  // Fetch menu items from API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        console.log('Fetching menu items from API...');

        const response = await fetch('/api/menuItem');
        console.log('API Response status:', response.status);

        const result = await response.json();
        console.log('API Response data:', result);

        if (result.ok && result.data) {
          setMenuItems(result.data);
          console.log(`Loaded ${result.data.length} menu items`);

          // Initialize expanded state for categories that have items
          const categoriesWithItems = [...new Set(result.data.map((item: MenuItem) => item.category))];
          const initialExpandedState: Record<string, boolean> = {};
          categoriesWithItems.forEach(category => {
            initialExpandedState[category] = true; // Expand all categories by default
          });
          setExpandedCategories(initialExpandedState);
        } else {
          setError(result.message || 'Failed to load menu items');
        }
      } catch (err) {
        console.error('Error fetching menu items:', err);
        setError('Error connecting to server. Please try again later.');
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

  // Updated Add to Cart function using context
  const addToCart = (item: MenuItem) => {
    console.log('Adding to cart:', item);

    const cartItem = {
      id: item._id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image
    };

    // Use the cart context to add item - this will automatically update all cart components
    addItem(cartItem);

    // Show success message
    alert(`Added ${item.name} to cart!`);
  };

  // Filter only available items and group by category
  const availableItems = menuItems.filter(item => item.available);

  // Group items by category dynamically
  const categories: Record<string, MenuItem[]> = {};
  availableItems.forEach(item => {
    if (!categories[item.category]) {
      categories[item.category] = [];
    }
    categories[item.category].push(item);
  });

  // Sort categories for consistent display
  const sortedCategories = Object.keys(categories).sort();

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
        <p style={{ fontSize: "20px", color: "white" }}>
          Discover our delicious food selection! ({availableItems.length} items available)
        </p>
      </div>

      {/* Menu by Categories with Dropdowns */}
      {sortedCategories.map((category) => {
        const items = categories[category];

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
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "10px"
                    }}>
                      {item.image ? (
                        <Image
                          src={`/assets/${item.image}`}
                          alt={item.name}
                          fill={true}
                          objectFit="contain"
                          objectPosition="center"
                          onError={(e) => {
                            // If image fails to load, show fallback
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          color: "#888",
                          fontSize: "16px",
                          flexDirection: "column"
                        }}>
                          No Image
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

      {/* Show message if no items available */}
      {availableItems.length === 0 && !loading && (
        <div style={{
          textAlign: "center",
          padding: "60px 20px",
          color: "white"
        }}>
          <div style={{ fontSize: "48px", marginBottom: "20px" }}>🍽️</div>
          <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>No Menu Items Available</h2>
          <p style={{ fontSize: "18px" }}>Check back later for our delicious offerings!</p>
        </div>
      )}

      {/* Special Offers */}
      <div style={{
        backgroundColor: "#fffaf0",
        padding: "30px",
        borderRadius: "12px",
        border: "2px solid #ff6b35",
        marginTop: "40px"
      }}>
        <h3 style={{
          fontSize: "28px",
          margin: "0 0 20px 0",
          color: "#ff6b35",
          textAlign: "center"
        }}>
          Special Offers & Combos
        </h3>
        <div style={{
          fontSize: "18px",
          color: "#666",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "15px"
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "8px",
            borderLeft: "4px solid #ff6b35"
          }}>
            <strong>Classic Combo:</strong> Any burger + fries + drink for <strong>$12.99</strong>
          </div>
          <div style={{
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "8px",
            borderLeft: "4px solid #ff6b35"
          }}>
            <strong>Family Pack:</strong> 4 classic burgers + 2 large fries + 4 drinks for <strong>$32.99</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;