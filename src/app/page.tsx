import React from "react";
import Image from 'next/image'
import heroImage from '@/assets/images/hero-image.jpg'


const Home: React.FC = () => {
  const bodyStyle: React.CSSProperties = {
     position: 'relative',
     width: '100%', 
     height: '80vh', 
     overflow: 'hidden' 
  };

  const heroContentStyle: React.CSSProperties = {
    color: "white",
    textAlign: "center",
    paddingTop: "10%",
    textShadow: "2px 2px 4px #000000",
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    position: "relative",
  };

  const heroHeadingStyle: React.CSSProperties = {
    fontSize: "5rem",
    marginBottom: "1rem",
  };

  const heroParagraphStyle: React.CSSProperties = {
    fontSize: "1.5rem",
    marginBottom: "2rem",
  };

  const anchorStyle: React.CSSProperties = {
    color: "white",
    textDecoration: "none",
    backgroundColor: "#ff6b35",
    padding: "0.75rem 1.5rem",
    borderRadius: "25px",
    fontWeight: 600,
    fontSize: "1.25rem",
    transition: "all 0.3s ease-in-out",
  };

  return (
    <>
    <div style={bodyStyle}>
      <Image 
        src={heroImage} 
        alt="Hamburger on a wooden table with fries" 
        fill 
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
        priority
      />
      <div style={heroContentStyle}>
        <h2 style={heroHeadingStyle}>FastBite</h2>
        <p style={heroParagraphStyle}>Your go-to spot for midnight cravings</p>
        <a href="/menu" target="_self" style={anchorStyle}>
          <span>Explore Our Menu</span>
        </a>
      </div>
    </div>
  </>
  )
};

export default Home;