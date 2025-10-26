"use client";

import { Box, Link, Badge } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { CiShoppingCart } from "react-icons/ci";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const Cart = () => {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    // Load cart from localStorage
    const loadCart = () => {
      const savedCart = localStorage.getItem('fastbite-cart');
      if (savedCart) {
        const items = JSON.parse(savedCart);
        const totalItems = items.reduce((total: number, item: CartItem) => total + item.quantity, 0);
        setItemCount(totalItems);
      }
    };

    loadCart();
    window.addEventListener('cart-updated', loadCart);

    return () => {
      window.removeEventListener('cart-updated', loadCart);
    };
  }, []);

  return (
    <Link
      href="/cart"
      display="flex"
      alignItems="center"
      gap={2}
      p={3}
      borderRadius="md"
      bg="#ff6b35"
      color="white"
      textDecoration="none"
      position="relative"
      _hover={{
        bg: "#e55b25",
        textDecoration: "none"
      }}
    >
      <CiShoppingCart size="1.5em" />
      <Box as="span" fontWeight="bold">Cart</Box>
      {itemCount > 0 && (
        <Badge
          bg="white"
          color="#ff6b35"
          borderRadius="full"
          px={2}
          py={1}
          fontSize="xs"
          fontWeight="bold"
          position="absolute"
          top="-8px"
          right="-8px"
          minW="20px"
          textAlign="center"
        >
          {itemCount}
        </Badge>
      )}
    </Link>
  );
};

export default Cart;