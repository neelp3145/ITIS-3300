"use client";

import { useActionState, useState } from "react";
import { signup } from "@/app/actions/signup";

import {
  Container,
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  Field,
  Input,
  Link,
  Button,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useFormStatus } from "react-dom";

const inputStyles = {
  bg: "white",
  color: "black",
  borderColor: "gray.300",
  marginBottom: "12px",
  _hover: { borderColor: "gray.400" },
  _focusVisible: {
    borderColor: "#ff6b35",
    boxShadow: "0 0 0 1px #ff6b35",
  },
};

const Signup = () => {
  const [state, signupAction] = useActionState(signup, undefined);
  const [nextPressed, setNextPressed] = useState(false);

  const toggleNext = () => {
    setNextPressed((nextPressed) => !nextPressed);
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
                Create your account
              </Heading>
              <Text color="gray.600">Sign up for FastBite</Text>
            </Stack>

            <form action={signupAction}>
              <Box hidden={nextPressed ? true : false}>
                <Field.Root>
                  <Field.Label htmlFor="firstName" color="gray.700">
                    <Field.RequiredIndicator />
                    First name
                  </Field.Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    css={inputStyles}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label htmlFor="lastName" color="gray.700">
                    <Field.RequiredIndicator />
                    Last name
                  </Field.Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    css={inputStyles}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label htmlFor="email" color="gray.700">
                    <Field.RequiredIndicator />
                    Email address
                  </Field.Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    css={inputStyles}
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
                    required
                    css={inputStyles}
                  />
                </Field.Root>
              </Box>
              <Button
                type="submit"
                bg="orange.500"
                hidden={nextPressed ? true : false}
                onClick={toggleNext}
                color="white"
                fontWeight="bold"
                _hover={{ bg: "orange.600" }}
                _active={{ bg: "orange.700" }}
                size="lg"
              >
                Next
              </Button>

              {/* Form for address, CHECK FOR VALIDATION ON SIGN UP */}
              <Box hidden={nextPressed ? false : true}>
                <Field.Root>
                  <Field.Label htmlFor="street" color="gray.700">
                    <Field.RequiredIndicator />
                    Street Address
                  </Field.Label>
                  <Input
                    id="street"
                    type="text"
                    required
                    name="street"
                    css={inputStyles}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label htmlFor="city" color="gray.700">
                    <Field.RequiredIndicator />
                    City
                  </Field.Label>
                  <Input
                    id="city"
                    type="text"
                    required
                    name="city"
                    css={inputStyles}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label htmlFor="state" color="gray.700">
                    <Field.RequiredIndicator />
                    State
                  </Field.Label>
                  <Input
                    id="state"
                    type="text"
                    required
                    name="state"
                    css={inputStyles}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label htmlFor="zip" color="gray.700">
                    <Field.RequiredIndicator />
                    ZIP Code
                  </Field.Label>
                  <Input
                    id="zip"
                    type="text"
                    required
                    name="zip"
                    css={inputStyles}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label htmlFor="phone" color="gray.700">
                    <Field.RequiredIndicator />
                    Phone Number
                  </Field.Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    name="phone"
                    css={inputStyles}
                  />
                </Field.Root>
                <SubmitButton nextPressed={nextPressed} />
              </Box>
            </form>

            <Text fontSize="sm" color="gray.600" textAlign="center">
              Already have an account?{" "}
              <Link
                as={NextLink}
                href="/login"
                color="orange.500"
                fontWeight="semibold"
              >
                Sign in
              </Link>
            </Text>
          </Stack>
        </Box>
      </Flex>
    </Container>
  );
};

function SubmitButton({ nextPressed }: { nextPressed: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      hidden={nextPressed ? false : true}
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
      Sign Up
    </Button>
  );
}
export default Signup;
