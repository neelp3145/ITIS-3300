import { Button, Link } from "@chakra-ui/react";

const LoginButton = () => {
  return (
    <Link href="/login" style={{ textDecoration: "none" }}>
      <Button size="md" css={{ bg: "orange.500", _hover: { bg: "orange.600" } }}>
        Login
      </Button>
    </Link>
  );
};

export default LoginButton;
