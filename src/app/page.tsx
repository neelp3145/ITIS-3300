import React from "react";
import Image from 'next/image'
import heroImage from '@/assets/images/hero-image.jpg'
import { Box, Link, Heading, Text, Button, AbsoluteCenter} from "@chakra-ui/react";


const Home: React.FC = () => {

  const mainStyle = {
    position: "relative",
    width: "100%",
    height: "80vh",
    overflow: "hidden",
  }

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
    bg: "#ff6b35",
    m: 4,
    _hover: { bg: "#e55b25" },
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
        <Heading size="6xl" m={2}>FastBite</Heading>
          <Text textStyle="3xl" m={2}>Your go-to spot for midnight cravings</Text>
          <Button css={buttonStyle}>
            <Link href="/menu" target="_self" position="relative">
              <Text>Explore Our Menu</Text>
            </Link>
          </Button>
      </Box>
    </Box>
  );
};

export default Home;