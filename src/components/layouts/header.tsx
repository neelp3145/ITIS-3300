import React from "react";
import Image from "next/image";
import fastbiteLogo from "@/assets/images/fastbite-logo.png";
import { Box, Flex, HStack, Link } from "@chakra-ui/react";
import Cart from "@/components/ui/cart/cart";
import LoginButton from "@/components/ui/loginButton/loginButton";
import NextLink from "next/link";

const Header = () => {
  const headerStyle = {
    bg: "gray.800",
    color: "white",
    py: 2,
    top: 0,
    width: "100%",
    height: "100px",
    position: "sticky",
    zIndex: 1000,
  };

  const linkStyle = {
    _hover: { textDecoration: "underline", color: "gray.300" },
  };

  const flexStyle = {
    maxW: "1200px",
    mx: "auto",
    my: "auto",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
    direction: "row",
  };

  const flexItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: 4,
  };

  return (
    <Box as="header" role="contentinfo" css={headerStyle}>
      <Flex {...flexStyle}>
        <Box {...flexItemStyle} gap={8}>
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
              <Link as={NextLink} href="/" css={linkStyle}>
                Home
              </Link>
              <Link as={NextLink} href="/menu" css={linkStyle}>
                Menu
              </Link>
              <Link as={NextLink} href="/contact" css={linkStyle}>
                Contact
              </Link>
              <Link as={NextLink} href="/about" css={linkStyle}>
                About Us
              </Link>
            </HStack>
          </nav>
        </Box>

        <Box {...flexItemStyle}>
          <LoginButton />
          <Cart />
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
