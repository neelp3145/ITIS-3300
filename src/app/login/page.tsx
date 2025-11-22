"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "@/app/actions/auth";

const Login = () => {
  const [state, loginAction] = useActionState(login, undefined);

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

            <form action={loginAction}>
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
                    bg="white"
                    color="black"
                    borderColor="gray.300"
                    _hover={{ borderColor: "gray.400" }}
                    _focusVisible={{
                      borderColor: "#ff6b35",
                      boxShadow: "0 0 0 1px #ff6b35",
                    }}
                  />
                </Field.Root>
                {state?.errors?.email && <Text color="red.600">{state.errors.email}</Text>}

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
                    bg="white"
                    color="black"
                    borderColor="gray.300"
                    _hover={{ borderColor: "gray.400" }}
                    _focusVisible={{
                      borderColor: "#ff6b35",
                      boxShadow: "0 0 0 1px #ff6b35",
                    }}
                  />
                </Field.Root>
                {state?.errors?.password && <Text color="red.600">{state.errors.password}</Text>}

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
                
                <SubmitButton />
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

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      loading={pending}
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
      Log in
    </Button>
  );
}

export default Login;
