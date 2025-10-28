import { Container, Flex, Box, Stack, Heading, Text, Field, Checkbox, Input, Link, Button } from "@chakra-ui/react";
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Login",
};

const Login = () => {
    return (
        <Container maxW="lg" py={12}>
            <Flex align="center" justify="center">
                <Box w="full" p={{ base: 6, md: 8 }} borderWidth="1px" borderRadius="lg" boxShadow="sm" bg="white" borderColor="gray.200">
                    <Stack gap={6}>
                        <Stack gap={1} textAlign="center">
                            <Heading size="lg" color="gray.600">Welcome back</Heading>
                            <Text color="gray.600">Sign in to your account</Text>
                        </Stack>

                        <Stack as="form" gap={4}>
                            <Field.Root>
                                <Field.Label htmlFor="email" color="gray.600">
                                    <Field.RequiredIndicator />
                                    Email address
                                </Field.Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    bg="gray.900"
                                    color="white"
                                    borderColor="white"
                                    _placeholder={{ color: "whiteAlpha.700" }}
                                    _hover={{ borderColor: "white" }}
                                    _focusVisible={{ borderColor: "white", boxShadow: "none" }}
                                />
                            </Field.Root>

                            <Field.Root>
                                <Field.Label htmlFor="password" color="gray.600">
                                    <Field.RequiredIndicator />
                                    Password
                                </Field.Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    bg="gray.900"
                                    color="white"
                                    borderColor="white"
                                    _placeholder={{ color: "whiteAlpha.700" }}
                                    _hover={{ borderColor: "white" }}
                                    _focusVisible={{ borderColor: "white", boxShadow: "none" }}
                                />
                            </Field.Root>

                            <Flex justify="space-between" align="center">
                                <Checkbox.Root color="gray.600">
                                    <Checkbox.HiddenInput id="remember" />
                                    <Checkbox.Control />
                                    <Checkbox.Label>Remember me</Checkbox.Label>
                                </Checkbox.Root>
                                <Link href="#" color="blue.500" fontWeight="semibold">
                                    Forgot password?
                                </Link>
                            </Flex>

                            <Button size="md" mt={4} type="submit" css={{ bg: "orange.500", _hover: { bg: "orange.600" } }}>
                                Sign in
                            </Button>
                        </Stack>

                        <Text fontSize="sm" color="gray.600" textAlign="center">
                            Don&apos;t have an account?{" "}
                            <Link href="#" color="blue.500" fontWeight="semibold">
                                Sign up
                            </Link>
                        </Text>
                    </Stack>
                </Box>
            </Flex>
        </Container>
    );
};

export default Login;