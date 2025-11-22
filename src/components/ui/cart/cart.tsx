"use client";

import { Box, Button, Icon } from "@chakra-ui/react";
import { useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import CartDialog from "@/components/ui/cart/cartDialog";

const Cart = () => {
  const [DialogVisible, setDialogVisible] = useState(false);
  const handleToggleDialog = () => setDialogVisible(!DialogVisible);

  return (
    <Box>
      <Button
        mx={2}
        aria-label="view-cart"
        onClick={handleToggleDialog}
        bg="orange.500"
        _hover={{ bg: "orange.600" }}
      >
        <Icon>
          <CiShoppingCart size="1.5em" />
        </Icon>
      </Button>
      <CartDialog
        cartItems={[]}
        visible={DialogVisible}
        onClose={handleToggleDialog}
      />
    </Box>
  );
};
export default Cart;
