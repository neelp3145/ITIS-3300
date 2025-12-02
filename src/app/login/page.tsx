"use client";

import {
  Container,
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  Field,
  Checkbox,
  Input,
  Link,
  Button,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const inputStyles = {
  bg: "white",
  color: "black",
  borderColor: "gray.300",
  _hover: { borderColor: "gray.400" },
  _focusVisible: {
    borderColor: "#ff6b35",
    boxShadow: "0 0 0 1px #ff6b35",
  },
};

const Login = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFormError(null);
      setLoading(true);

      const formData = new FormData(e.currentTarget);
      const email = String(formData.get("email") || "").toLowerCase();
      const password = String(formData.get("password") || "");

      const isEmployee = email.endsWith("@fastbite.com");
      const endpoint = isEmployee ? "/api/employees/login" : "/api/customers/login";

      const payload = { email, password };

      try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (!res.ok || data.ok === false) {
        const msg = Array.isArray(data?.errors)
        ? data.errors.map((error: any) => error.msg).join(", ")
        : data?.msg || "Login failed";
        setFormError(msg);
        setLoading(false);
        return;
      }

      router.push("/");
      } catch (err) {
      console.error("Login error:", err);
      setFormError("Unexpected error during login. Please try again.");
      setLoading(false);
      }
    };
  

  return (
    <Container maxW="lg" py={12}>
      <Flex align="center" justify="center">
        <Box
          w="full"
          p={{ base: 6, md: 8 }}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="sm"
          bg="white"
          borderColor="gray.200"
        >
          <Stack gap={6}>
            <Stack gap={1} textAlign="center">
              <Heading size="lg" color="gray.800">
                Welcome back
              </Heading>
              <Text color="gray.600">Sign in to your FastBite account</Text>
            </Stack>

            {formError && (
              <Box
                bg="red.50"
                border="1px solid"
                borderColor="red.200"
                color="red.700"
                borderRadius="md"
                p={3}
              >
                {formError}
              </Box>
            )}

            <form onSubmit={handleSubmit}>
              <Stack gap={4}>
                <Field.Root>
                  <Field.Label htmlFor="email" color="gray.700">
                    <Field.RequiredIndicator />
                    Email address
                  </Field.Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    {...inputStyles}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label htmlFor="password" color="gray.700">
                    <Field.RequiredIndicator />
                    Password
                  </Field.Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    css={inputStyles}
                  />
                </Field.Root>

                <Flex justify="space-between" align="center">
                  <Checkbox.Root color="gray.700" name="remember">
                    <Checkbox.HiddenInput id="remember" />
                    <Checkbox.Control />
                    <Checkbox.Label>Remember me</Checkbox.Label>
                  </Checkbox.Root>
                  <Link
                    as={NextLink}
                    href="/forgot-password"
                    color="#ff6b35"
                    fontWeight="semibold"
                  >
                    Forgot password?
                  </Link>
                </Flex>

                <Button
                  type="submit"
                  disabled={loading}
                  mt={6}
                  bg="orange.500"
                  color="white"
                  fontWeight="bold"
                  _hover={{
                    bg: "orange.600",
                  }}
                  _active={{
                    bg: "orange.700",
                  }}
                  size="lg"
                >
                  {loading ? "Logging in..." : "Log In"}
                </Button>
              </Stack>
            </form>
            <Text fontSize="sm" color="gray.600" textAlign="center">
              Don&apos;t have an account?{" "}
              <Link
                as={NextLink}
                href="/signup"
                color="orange.500"
                fontWeight="semibold"
              >
                Sign up
              </Link>
            </Text>

            {/* Demo Credentials */}
            {process.env.NODE_ENV !== "production" && (
              <Box mt={4} p={4} bg="gray.50" borderRadius="md">
                <Text fontSize="sm" color="gray.600" fontWeight="bold" mb={2}>
                  Demo Credentials:
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Customer: fastbyte.demo@example.com / Password123!
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Admin: admin@fastbyte.com / admin123
                </Text>
              </Box>
            )}
          </Stack>
        </Box>
      </Flex>
    </Container>
  );
};

export default Login;
