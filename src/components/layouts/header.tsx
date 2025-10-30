"use client";

import React from "react";
import Image from "next/image";
import fastbiteLogo from "@/assets/images/fastbite-logo.png";
import { Box, Flex, HStack, Link, Button, Badge } from "@chakra-ui/react";
import { useCart } from '@/contexts/CartContext';
import { CartDialog } from '@/components/cart/cartDialog';
import LoginButton from "@/components/ui/loginButton/loginButton";
import NextLink from "next/link";

const Header = () => {
  const { setIsOpen, getTotalItems } = useCart();

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

  // Consistent button style for both Login and Cart - Orange with black text
  const buttonStyle = {
    bg: "#ff6b35", // Orange background
    color: "black", // Black text
    fontWeight: "bold",
    fontSize: "16px",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    _hover: {
      bg: "#e55b25", // Darker orange on hover
      color: "black", // Keep text black on hover
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
    },
    _active: {
      bg: "#cc4a1a", // Even darker orange when pressed
      color: "black", // Keep text black when pressed
      transform: "translateY(0)"
    }
  };

  return (
    <Box as="header" role="contentinfo" sx={headerStyle}>
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
              <Link as={NextLink} href="/" sx={linkStyle}>
                Home
              </Link>
              <Link as={NextLink} href="/menu" sx={linkStyle}>
                Menu
              </Link>
              <Link as={NextLink} href="/contact" sx={linkStyle}>
                Contact
              </Link>
              <Link as={NextLink} href="/about" sx={linkStyle}>
                About Us
              </Link>
            </HStack>
          </nav>
        </Box>

        <Box {...flexItemStyle} gap={3}>
          {/* Login Button - Orange with black text */}
          <Button
            as={NextLink}
            href="/login"
            sx={buttonStyle}
          >
            Login
          </Button>

          {/* Cart Button - Orange with black text */}
          <Button
            onClick={() => setIsOpen(true)}
            sx={buttonStyle}
            position="relative"
          >
            Cart
            {getTotalItems() > 0 && (
              <Badge
                position="absolute"
                top="-8px"
                right="-8px"
                bg="red.500"
                color="white"
                borderRadius="full"
                minW="20px"
                height="20px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="12px"
                fontWeight="bold"
              >
                {getTotalItems()}
              </Badge>
            )}
          </Button>
        </Box>
      </Flex>

      {/* Cart Dialog */}
      <CartDialog />
    </Box>
  );
};

export default Header;