"use client";

import React from "react";
import Image from "next/image";
import fastbiteLogo from "@/assets/fastbite-logo.png";
import { Box, Flex, HStack, Link, Button, Badge } from "@chakra-ui/react";
import { useCart } from '@/contexts/CartContext';
import { CartDialog } from '@/components/cart/cartDialog';
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

  // Consistent button style for both Login and Cart - Orange with white text
  const buttonStyle = {
    bg: "orange.500",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    _hover: {
      bg: "orange.600",
      color: "white",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      textDecoration: "none"
    },
    _active: {
      bg: "#cc4a1a",
      color: "white",
      transform: "translateY(0)"
    }
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
              <Link as={NextLink} href="/track-order" css={linkStyle}>
                Track My Order
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

        <Box {...flexItemStyle} gap={3}>
          {/* Restaurant Dashboard Button */}
          <Button css={buttonStyle}>
            <Link as={NextLink} style={{listStyle: "none"}} href="/restaurant/dashboard">
              Restaurant Dashboard
            </Link>
          </Button>

          {/* Login Button - Orange with white text */}
          <Button css={buttonStyle}>
            <Link as={NextLink} style={{listStyle: "none"}} href="/login">Login</Link>
          </Button>

          {/* Cart Button - Orange with white text */}
          <Button
            onClick={() => setIsOpen(true)}
            css={buttonStyle}
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