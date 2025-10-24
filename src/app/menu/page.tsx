"use client";

import React, { useState } from "react";
import Image from "next/image";

import classicCheeseburger from "@/assets/images/classic-cheeseburger.jpg";
import chickenBurger from "@/assets/images/chicken-burger.jpeg";
import baconDeluxe from "@/assets/images/bacon-deluxe.jpeg";
import goldenFries from "@/assets/images/golden-fries.jpeg";
import onionRings from "@/assets/images/onion-rings.jpeg";
import applePie from "@/assets/images/Apple Pie.jpeg";
import bbqSauce from "@/assets/images/BBQ Sauce.jpeg";
import chocolateBrownie from "@/assets/images/Chocolate Brownie.jpeg";
import chocolateMilkshake from "@/assets/images/Chocolate Milkshake.jpeg";
import garlicAioli from "@/assets/images/Garlic Aioli.jpeg";
import honeyMustard from "@/assets/images/Honey Mustard.jpeg";
import iceCreamSundae from "@/assets/images/Ice Cream Sundae.jpeg";
import icedCoffee from "@/assets/images/Iced Coffee.jpeg";
import mozzarellaSticks from "@/assets/images/Mozzarella Sticks.jpeg";
import mushroomSwissBurger from "@/assets/images/Mushroom Swiss Burger.jpeg";
import softDrinks from "@/assets/images/Soft Drinks.jpeg";
import spicyMayo from "@/assets/images/Spicy Mayo.jpeg";
import strawberrySmoothie from "@/assets/images/Strawberry Smoothie.jpeg";
import sweetPotatoFries from "@/assets/images/Sweet Potato Fries.jpeg";
import vanillaMilkshake from "@/assets/images/Vanilla Milkshake.jpeg";
import veggieSupreme from "@/assets/images/Veggie Supreme.jpeg";

const Menu: React.FC = () => {
  // State to track which categories are expanded
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    "Burgers": true, // Start with Burgers expanded
    "Sides": false,
    "Drinks": false,
    "Sauces": false,
    "Desserts": false
  });

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Expanded menu data with more categories and items
  const menuItems = [
    // Burgers
    {
      id: 1,
      name: "Classic Cheeseburger",
      description: "Juicy beef patty with melted cheese, fresh lettuce, and special sauce",
      price: "$10.99",
      category: "Burgers",
      image: classicCheeseburger,
      isPopular: true
    },
    {
      id: 2,
      name: "Crispy Chicken Burger",
      description: "Crispy fried chicken with mayo and coleslaw in a soft bun",
      price: "$11.99",
      category: "Burgers",
      image: chickenBurger,
      isPopular: false
    },
    {
      id: 3,
      name: "Bacon Deluxe",
      description: "Double beef patty with crispy bacon and BBQ sauce",
      price: "$15.99",
      category: "Burgers",
      image: baconDeluxe,
      isPopular: true
    },
    {
      id: 4,
      name: "Mushroom Swiss Burger",
      description: "Beef patty with sautéed mushrooms and melted Swiss cheese",
      price: "$13.99",
      category: "Burgers",
      image: mushroomSwissBurger,
      isPopular: false
    },
    {
      id: 5,
      name: "Veggie Supreme",
      description: "Plant-based patty with avocado and fresh vegetables",
      price: "$12.99",
      category: "Burgers",
      image: veggieSupreme,
      isPopular: false
    },

    // Sides
    {
      id: 6,
      name: "Golden Fries",
      description: "Crispy golden fries with sea salt",
      price: "$4.99",
      category: "Sides",
      image: goldenFries,
      isPopular: false
    },
    {
      id: 7,
      name: "Onion Rings",
      description: "Beer-battered onion rings with dipping sauce",
      price: "$5.99",
      category: "Sides",
      image: onionRings,
      isPopular: true
    },
    {
      id: 8,
      name: "Sweet Potato Fries",
      description: "Crispy sweet potato fries with cinnamon sugar",
      price: "$5.49",
      category: "Sides",
      image: sweetPotatoFries,
      isPopular: false
    },
    {
      id: 9,
      name: "Mozzarella Sticks",
      description: "Breaded mozzarella sticks with marinara sauce",
      price: "$6.99",
      category: "Sides",
      image: mozzarellaSticks,
      isPopular: true
    },

    // Drinks
    {
      id: 10,
      name: "Chocolate Milkshake",
      description: "Creamy chocolate milkshake with whipped cream",
      price: "$5.99",
      category: "Drinks",
      image: chocolateMilkshake,
      isPopular: true
    },
    {
      id: 11,
      name: "Vanilla Milkshake",
      description: "Classic vanilla milkshake with cherry on top",
      price: "$5.99",
      category: "Drinks",
      image: vanillaMilkshake,
      isPopular: false
    },
    {
      id: 12,
      name: "Strawberry Smoothie",
      description: "Fresh strawberry smoothie with yogurt",
      price: "$4.99",
      category: "Drinks",
      image: strawberrySmoothie,
      isPopular: false
    },
    {
      id: 13,
      name: "Soft Drinks",
      description: "Coke, Sprite, Fanta, or Dr. Pepper",
      price: "$2.99",
      category: "Drinks",
      image: softDrinks,
      isPopular: false
    },
    {
      id: 14,
      name: "Iced Coffee",
      description: "Chilled coffee with cream and sugar",
      price: "$3.99",
      category: "Drinks",
      image: icedCoffee,
      isPopular: false
    },

    // Sauces
    {
      id: 15,
      name: "BBQ Sauce",
      description: "Sweet and smoky barbecue sauce",
      price: "$0.99",
      category: "Sauces",
      image: bbqSauce,
      isPopular: false
    },
    {
      id: 16,
      name: "Garlic Aioli",
      description: "Creamy garlic mayonnaise dip",
      price: "$0.99",
      category: "Sauces",
      image: garlicAioli,
      isPopular: true
    },
    {
      id: 17,
      name: "Spicy Mayo",
      description: "Mayonnaise with a kick of heat",
      price: "$0.99",
      category: "Sauces",
      image: spicyMayo,
      isPopular: false
    },
    {
      id: 18,
      name: "Honey Mustard",
      description: "Sweet and tangy honey mustard",
      price: "$0.99",
      category: "Sauces",
      image: honeyMustard,
      isPopular: false
    },

    // Desserts
    {
      id: 19,
      name: "Chocolate Brownie",
      description: "Warm chocolate brownie with ice cream",
      price: "$6.99",
      category: "Desserts",
      image: chocolateBrownie,
      isPopular: true
    },
    {
      id: 20,
      name: "Apple Pie",
      description: "Classic apple pie with cinnamon",
      price: "$5.99",
      category: "Desserts",
      image: applePie,
      isPopular: false
    },
    {
      id: 21,
      name: "Ice Cream Sundae",
      description: "Vanilla ice cream with chocolate sauce and nuts",
      price: "$4.99",
      category: "Desserts",
      image: iceCreamSundae,
      isPopular: false
    }
  ];

  // Group items by category
  const categories = {
    "Burgers": menuItems.filter(item => item.category === "Burgers"),
    "Sides": menuItems.filter(item => item.category === "Sides"),
    "Drinks": menuItems.filter(item => item.category === "Drinks"),
    "Sauces": menuItems.filter(item => item.category === "Sauces"),
    "Desserts": menuItems.filter(item => item.category === "Desserts")
  };

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
          Discover our delicious food selection with burgers, sides, drinks, and more!
        </p>
      </div>

      {/* Menu by Categories with Dropdowns */}
      {Object.entries(categories).map(([category, items]) => (
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
                  key={item.id}
                  style={{
                    border: "1px solid #ddd",
                    padding: "20px",
                    borderRadius: "12px",
                    backgroundColor: "white",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease"
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
                      {item.isPopular && (
                        <span style={{
                          backgroundColor: "#ff6b35",
                          color: "white",
                          padding: "3px 10px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          display: "inline-block"
                        }}>
                          Popular
                        </span>
                      )}
                    </div>
                    <span style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#ff6b35"
                    }}>
                      {item.price}
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
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{
                        objectFit: "contain",
                        objectPosition: "center",
                        padding: "10px"
                      }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={item.isPopular}
                    />
                  </div>

                  {/* Description Section */}
                  <p style={{
                    color: "#666",
                    margin: "0",
                    fontSize: "14px",
                    lineHeight: "1.5"
                  }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

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
            <strong>Classic Combo:</strong> Any burger + fries + drink for <strong>$18.99</strong>
          </div>
          <div style={{
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "8px",
            borderLeft: "4px solid #ff6b35"
          }}>
            <strong>Family Pack:</strong> 4 burgers + 2 large fries + 4 drinks for <strong>$39.99</strong>
          </div>
          <div style={{
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "8px",
            borderLeft: "4px solid #ff6b35"
          }}>
            <strong>Dessert Deal:</strong> Any burger + dessert + drink for <strong>$19.99</strong>
          </div>
          <div style={{
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "8px",
            borderLeft: "4px solid #ff6b35"
          }}>
            <strong>Sauce Lover:</strong> Any meal + 3 extra sauces for <strong>$12.99</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;