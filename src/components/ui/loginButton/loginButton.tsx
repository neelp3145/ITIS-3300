import { Button, Link } from "@chakra-ui/react";

const LoginButton = () => {
  return (
    <Link href="/login" style={{ textDecoration: "none" }}>
      <Button size="md">Login</Button>
    </Link>
  );
};

export default LoginButton;
