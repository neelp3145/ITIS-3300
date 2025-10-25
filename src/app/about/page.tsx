import React from "react";
import Image from "next/image";

const AboutUs: React.FC = () => {
  return (
    <div style={{
      padding: "20px",
      maxWidth: "1200px",
      margin: "0 auto",
      minHeight: "100vh",
      lineHeight: "1.6"
    }}>
      {/* Header Section */}
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1 style={{
          color: "#ff6b35",
          fontSize: "48px",
          marginBottom: "20px"
        }}>
          About FastBite
        </h1>
        <p style={{
          fontSize: "20px",
          color: "#FFFFFF",
          maxWidth: "600px",
          margin: "0 auto"
        }}>
          Serving delicious burgers and satisfying cravings since 2020
        </p>
      </div>

      {/* Our Story Section */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "40px",
        alignItems: "center",
        marginBottom: "60px"
      }}>
        <div>
          <h2 style={{
            color: "#FFFFFF",
            fontSize: "36px",
            marginBottom: "20px"
          }}>
            Our Story
          </h2>
          <p style={{
            fontSize: "16px",
            color: "#FFFFFF",
            marginBottom: "15px"
          }}>
            FastBite was born from a simple idea: everyone deserves a great burger,
            anytime they want one. Founded in 2020 by burger enthusiasts
            we started as a small food truck with a big dream.
          </p>
          <p style={{
            fontSize: "16px",
            color: "#FFFFFF",
            marginBottom: "15px"
          }}>
            What began as late-night cravings turned into a passion for creating
            the perfect burger experience. We spent months perfecting our recipes,
            sourcing the finest ingredients, and developing our signature sauces.
          </p>
          <p style={{
            fontSize: "16px",
            color: "#FFFFFF"
          }}>
            Today, we're proud to serve our community with the same dedication
            and quality that started it all. From our classic cheeseburger to
            our innovative seasonal specials, every bite tells our story.
          </p>
        </div>
        <div style={{
          backgroundColor: "#f5f5f5",
          height: "300px",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#888",
          border: "1px solid #e0e0e0"
        }}>
          Our First Food Truck
        </div>
      </div>

      {/* Our Mission Section */}
      <div style={{
        backgroundColor: "#fffaf0",
        padding: "40px",
        borderRadius: "12px",
        border: "2px solid #ff6b35",
        marginBottom: "60px",
        textAlign: "center"
      }}>
        <h2 style={{
          color: "#ff6b35",
          fontSize: "36px",
          marginBottom: "20px"
        }}>
          Our Mission
        </h2>
        <p style={{
          fontSize: "18px",
          color: "#666",
          fontStyle: "italic",
          maxWidth: "800px",
          margin: "0 auto"
        }}>
          "To create unforgettable burger experiences by combining quality ingredients,
          innovative flavors, and exceptional service, making every customer feel like
          they've found their new favorite spot."
        </p>
      </div>

      {/* Our Values Section */}
      <div style={{ marginBottom: "60px" }}>
        <h2 style={{
          color: "#FFFFFF",
          fontSize: "36px",
          marginBottom: "30px",
          textAlign: "center"
        }}>
          Our Values
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "30px"
        }}>
          {/* Value 1 */}
          <div style={{
            textAlign: "center",
            padding: "20px"
          }}>
            <h3 style={{
              color: "#FFFFFF",
              fontSize: "20px",
              marginBottom: "10px"
            }}>
              Quality Ingredients
            </h3>
            <p style={{
              fontSize: "14px",
              color: "#FFFFFF"
            }}>
              We source locally whenever possible and never compromise on quality.
              From our grass-fed beef to our fresh-baked buns, every ingredient matters.
            </p>
          </div>

          {/* Value 2 */}
          <div style={{
            textAlign: "center",
            padding: "20px"
          }}>
            <h3 style={{
              color: "#FFFFFF",
              fontSize: "20px",
              marginBottom: "10px"
            }}>
              Innovation
            </h3>
            <p style={{
              fontSize: "14px",
              color: "#FFFFFF"
            }}>
              We're constantly experimenting with new flavors and techniques to
              bring you exciting menu items while honoring classic favorites.
            </p>
          </div>

          {/* Value 3 */}
          <div style={{
            textAlign: "center",
            padding: "20px"
          }}>
            <h3 style={{
              color: "#FFFFFF",
              fontSize: "20px",
              marginBottom: "10px"
            }}>
              Community
            </h3>
            <p style={{
              fontSize: "14px",
              color: "#FFFFFF"
            }}>
              We believe in giving back to the community that supports us through
              local partnerships, charity events, and supporting neighborhood initiatives.
            </p>
          </div>

          {/* Value 4 */}
          <div style={{
            textAlign: "center",
            padding: "20px"
          }}>
            <h3 style={{
              color: "#FFFFFF",
              fontSize: "20px",
              marginBottom: "10px"
            }}>
              Customer Experience
            </h3>
            <p style={{
              fontSize: "14px",
              color: "#FFFFFF"
            }}>
              Your satisfaction is our priority. We strive to create a welcoming
              atmosphere where every customer leaves with a smile.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;