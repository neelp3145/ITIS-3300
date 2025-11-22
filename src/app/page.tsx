import React from "react";
import Image from "next/image";
import heroImage from "@/assets/hero-image.jpg";
import NextLink from "next/link";
import { Box, Link, Heading, Text, Button } from "@chakra-ui/react";

const Home: React.FC = () => {
  const mainStyle = {
    position: "relative",
    width: "100%",
    height: "80vh",
    overflow: "hidden",
  };

  const mainContentStyle = {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
    top: "50%",
    transform: "translateY(-50%)",
    color: "white",
    px: 4,
  };

  const buttonStyle = {
    size: "lg",
    bg: "orange.500",
    color: "white",
    m: 4,
    _hover: { bg: "orange.600" },
  };

  return (
    <Box as="main" role="contentInfo" css={mainStyle}>
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
      <Box css={mainContentStyle}>
        <Heading size="6xl" m={2}>
          FastBite
        </Heading>
        <Text textStyle="3xl" m={2}>
          Your go-to spot for midnight cravings
        </Text>
        <NextLink href="/menu">
          <Button css={buttonStyle}>Explore Our Menu</Button>
        </NextLink>
      </Box>
    </Box>
  );
};

export default Home;
