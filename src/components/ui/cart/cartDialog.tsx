import { Box, Text, Dialog, Portal, Button, Link } from "@chakra-ui/react";

type CartDialogProps = {
  cartItems: any[];
  visible: boolean;
  onClose: () => void;
};

const CartDialog = ({ cartItems, visible, onClose }: CartDialogProps) => {
  const dialogStyles = {
    maxW: "600px",
    width: "100%",
    position: "relative",
    p: 4,
    margin: "0 auto",
  };

  const exitButtonStyles = {
    position: "absolute",
    top: 4,
    right: 4,
  };

  if (!visible) return null;

  return (
    <Box>
      <Dialog.Root
        size={{ mdDown: "full", md: "lg" }}
        open={visible}
        placement="center"
      >
        <Portal>
          <Dialog.Backdrop>
            <Dialog.Positioner css={dialogStyles}>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title textStyle="lg">Cart</Dialog.Title>
                  <Button onClick={onClose} css={exitButtonStyles}>
                    X
                  </Button>
                </Dialog.Header>
                <Dialog.Body>
                  {cartItems.length == 0 ? (
                    <Box textAlign="center" py={4} px={4}>
                      <Text textStyle="lg" mb={4}>
                        Looks like your cart is empty.
                      </Text>
                      <Link
                        href="/menu"
                        color="black"
                        style={{ textDecoration: "none" }}
                      >
                        <Button>Start Your Order</Button>
                      </Link>
                    </Box>
                  ) : (
                    <Box>{/* Cart items would go here */}</Box>
                  )}
                </Dialog.Body>
              </Dialog.Content>
            </Dialog.Positioner>
          </Dialog.Backdrop>
        </Portal>
      </Dialog.Root>
    </Box>
  );
};

export default CartDialog;
