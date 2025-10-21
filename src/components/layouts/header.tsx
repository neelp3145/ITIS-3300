import React from "react";
import Image from "next/image";
import fastbiteLogo from "@/assets/images/fastbite-logo.png";

import { Box, Flex, HStack, Link } from "@chakra-ui/react";

const Header = () => {
  const headerStyle = {
    bg: "gray.800",
    color: "white",
    py: 4,
  };

  const linkStyle = {
    _hover: { textDecoration: "underline", color: "gray.300" },
  };

  const flexStyle = {
    maxW: "1200px",
    mx: "auto",
    align: "center",
    justify: "space-between",
  };

  return (
    <Box as="header" role="contentinfo" css={headerStyle}>
      <Flex {...flexStyle}>
        {/* Logo */}
        <Link href="/" display="flex" alignItems="center">
          <Image
            src={fastbiteLogo}
            alt="FastBite Logo"
            width={100}
            height={40}
            priority
          />
        </Link>

        {/* Navigation Links */}
        <nav>
          <HStack gap={6} align="center">
            <Link href="/" css={linkStyle}>
              Home
            </Link>
            <Link href="/menu" css={linkStyle}>
              Menu
            </Link>
            <Link href="/contact" css={linkStyle}>
              Contact
            </Link>
            <Link href="/about" css={linkStyle}>
              About Us
            </Link>
          </HStack>
        </nav>
      </Flex>
    </Box>
  );
};

export default Header;
