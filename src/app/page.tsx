import React from "react";
import Image from 'next/image'
import heroImage from '@/assets/images/hero-image.jpg'
import { Box, Link, Heading, Text, Button, AbsoluteCenter} from "@chakra-ui/react";


const Home: React.FC = () => {

  return (
    <Box as="main" role="contentInfo" height="80vh" width="100%" position="relative" overflow="hidden">
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
      <Box color="white" textAlign="center" position="relative" zIndex={1} top="50%" transform="translateY(-50%)" px={4}>
          <Heading size="6xl" m={2}>FastBite</Heading>
          <Text textStyle="3xl" m={2}>Your go-to spot for midnight cravings</Text>
          <Button size="lg" bg="#ff6b35" _hover={{ bg: "#e55b25" }} m={4}>
            <Link href="/menu" target="_self" position="relative">
              <Text>Explore Our Menu</Text>
            </Link>
          </Button>
      </Box>
    </Box>
  );
};

export default Home;