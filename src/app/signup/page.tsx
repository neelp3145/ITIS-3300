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
    Input,
    Link,
    Button,
    Alert
} from "@chakra-ui/react";
import NextLink from "next/link";

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName,  setLastName]  = useState("");
    const [email,     setEmail]     = useState("");
    const [password,  setPassword]  = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error,     setError]     = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName, lastName, email, password })
            });

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                setError(data?.message || "Signup failed");
                return;
            }

            const signInResult = await signIn("credentials", {
                email,
                password,
                redirect: false
            });

            if (signInResult?.error) {
                setError("Account created. Please sign in.");
                router.push("/login");
            } else {
                router.push("/");
                router.refresh();
            }
        } catch {
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
                            <Heading size="lg" color="gray.800">Create your account</Heading>
                            <Text color="gray.600">Sign up for FastBite</Text>
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
                                <Field.Label htmlFor="firstName" color="gray.700">
                                    <Field.RequiredIndicator />
                                    First name
                                </Field.Label>
                                <Input
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    bg="white"
                                    borderColor="gray.300"
                                    color="black"
                                    _hover={{ borderColor: "gray.400" }}
                                    _focusVisible={{ borderColor: "#ff6b35", boxShadow: "0 0 0 1px #ff6b35" }}
                                />
                            </Field.Root>

                            <Field.Root>
                                <Field.Label htmlFor="lastName" color="gray.700">
                                    <Field.RequiredIndicator />
                                    Last name
                                </Field.Label>
                                <Input
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    bg="white"
                                    color="black"
                                    borderColor="gray.300"
                                    _hover={{ borderColor: "gray.400" }}
                                    _focusVisible={{ borderColor: "#ff6b35", boxShadow: "0 0 0 1px #ff6b35" }}
                                />
                            </Field.Root>

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
                                    required
                                    bg="white"
                                    borderColor="gray.300"
                                    color="black"
                                    _hover={{ borderColor: "gray.400" }}
                                    _focusVisible={{ borderColor: "#ff6b35", boxShadow: "0 0 0 1px #ff6b35" }}
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
                                    required
                                    bg="white"
                                    borderColor="gray.300"
                                    color="black"
                                    _hover={{ borderColor: "gray.400" }}
                                    _focusVisible={{ borderColor: "#ff6b35", boxShadow: "0 0 0 1px #ff6b35" }}
                                />
                            </Field.Root>

                            <Button
                                type="submit"
                                loading={isLoading}
                                bg="orange.500"
                                color="white"
                                fontWeight="bold"
                                _hover={{ bg: "orange.600" }}
                                _active={{ bg: "orange.700" }}
                                size="lg"
                            >
                                Sign up
                            </Button>
                        </Stack>

                        <Text fontSize="sm" color="gray.600" textAlign="center">
                            Already have an account?{" "}
                            <Link as={NextLink} href="/login" color="orange.500" fontWeight="semibold">
                                Sign in
                            </Link>
                        </Text>
                    </Stack>
                </Box>
            </Flex>
        </Container>
    );
};

export default Signup;