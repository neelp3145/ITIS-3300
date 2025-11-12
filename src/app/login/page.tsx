"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
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
  Alert
} from "@chakra-ui/react";
import NextLink from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
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
              <Heading size="lg" color="gray.800">Welcome back</Heading>
              <Text color="gray.600">Sign in to your FastBite account</Text>
            </Stack>

            {error && (
              <Alert.Root>
                <Alert.Content>
                  <Alert.Title>Error</Alert.Title>
                  <Alert.Description>{error}</Alert.Description>
                </Alert.Content>
              </Alert.Root> 
            )}

            <Stack as="form" gap={4} onSubmit={handleSubmit}>
              <Field.Root>
                <Field.Label htmlFor="email" color="gray.700">
                  <Field.RequiredIndicator />
                  Email address
                </Field.Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  bg="white"
                  borderColor="gray.300"
                  _hover={{ borderColor: "gray.400" }}
                  _focusVisible={{
                    borderColor: "#ff6b35",
                    boxShadow: "0 0 0 1px #ff6b35"
                  }}
                />
              </Field.Root>

              <Field.Root>
                <Field.Label htmlFor="password" color="gray.700">
                  <Field.RequiredIndicator />
                  Password
                </Field.Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  bg="white"
                  borderColor="gray.300"
                  _hover={{ borderColor: "gray.400" }}
                  _focusVisible={{
                    borderColor: "#ff6b35",
                    boxShadow: "0 0 0 1px #ff6b35"
                  }}
                />
              </Field.Root>

              <Flex justify="space-between" align="center">
                <Checkbox.Root color="gray.700">
                  <Checkbox.HiddenInput id="remember" />
                  <Checkbox.Control />
                  <Checkbox.Label>Remember me</Checkbox.Label>
                </Checkbox.Root>
                <Link as={NextLink} href="/forgot-password" color="#ff6b35" fontWeight="semibold">
                  Forgot password?
                </Link>
              </Flex>

              <Button
                type="submit"
                loading={isLoading}
                bg="orange.500"
                color="white"
                fontWeight="bold"
                _hover={{
                  bg: "orange.600",
                }}
                _active={{
                  bg: "orange.700"
                }}
                size="lg"
              >
                Sign in
              </Button>
            </Stack>

            <Text fontSize="sm" color="gray.600" textAlign="center">
              Don&apos;t have an account?{" "}
              <Link as={NextLink} href="/signup" color="orange.500" fontWeight="semibold">
                Sign up
              </Link>
            </Text>

            {/* Demo Credentials */}
            <Box mt={4} p={4} bg="gray.50" borderRadius="md">
              <Text fontSize="sm" color="gray.600" fontWeight="bold" mb={2}>
                Demo Credentials:
              </Text>
              <Text fontSize="sm" color="gray.600">
                Customer: demo@fastbite.com / demo123
              </Text>
              <Text fontSize="sm" color="gray.600">
                Admin: admin@fastbite.com / admin123
              </Text>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Container>
  );
};

export default Login;