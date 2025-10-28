"use client";

import { Box, Button, Icon } from "@chakra-ui/react";
import { useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import CartDialog from "@/components/ui/cart/cartDialog";

type CartProps = {
  CartItems?: any[];
};

const Cart = ({ CartItems = [] }: CartProps) => {
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
        visible={DialogVisible}
        onClose={handleToggleDialog}
        CartItems={CartItems}
      />
    </Box>
  );
};
export default Cart;
