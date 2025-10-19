import React from "react";
import {
    Box,
    SimpleGrid,
    Heading,
    Text,
    Link,
    VStack,
    HStack,
    List,
    ListItem,
} from "@chakra-ui/react";

type FooterProps = {
    companyName?: string;
    address?: {
        line1?: string;
        city?: string;
        phone?: string;
        email?: string;
    };
};

const Footer: React.FC<FooterProps> = ({
    companyName = "FastBite",
    address = {
        line1: "9201 University City Blvd",
        city: "Charlotte, NC 28223",
        phone: "(555) 123-4567",
        email: "hello@fastbite.com",
    },
}) => {
    const year = new Date().getFullYear();

    return (
        <Box
            as="footer"
            role="contentinfo"
            aria-label={`${companyName} footer`}
            bgGradient="linear(to-b, #252525, #1b1b1b)"
            color="white"
            py={{ base: 8, md: 10 }}
            px={{ base: 4, md: 6 }}
        >
            <SimpleGrid
                columns={{ base: 1, md: 2, lg: 4 }}
                gap={6}
                maxW="1100px"
                mx="auto"
                alignItems="start"
            >
                {/* Company Info */}
                <VStack align="start" gap={3}>
                    <Heading size="md">{companyName}</Heading>
                    <Text fontSize="sm" color="gray.300" lineHeight="tall">
                        Craving satisfaction at 2 AM? We&apos;ve got you covered. 
                        Gourmet burgers, crispy fries, and cheesy pizza served hot until the early hours. 
                        Your late-night hunger solution.
                    </Text>
                </VStack>

                {/* Hours */}
                <VStack align="start" gap={3}>
                    <Heading size="sm">Hours</Heading>
                    <VStack align="start" gap={1} fontSize="sm" color="gray.300">
                        <Text>Mon-Fri: 11:00 AM — 4:00 AM</Text>
                        <Text>Sat-Sun: 12:00 AM — 4:00 AM</Text>
                    </VStack>
                </VStack>

                {/* Location */}
                <VStack align="start" gap={3}>
                    <Heading size="sm">Location</Heading>
                    <Box as="address" fontStyle="normal" fontSize="sm" color="gray.300">
                        <Text>{address.line1}</Text>
                        <Text>{address.city}</Text>
                        <VStack align="start" gap={1} mt={2}>
                            {address.phone && (
                                <Text>
                                    Phone:{" "}
                                    <Link
                                        href={`tel:${address.phone.replace(/[^\d+]/g, "")}`}
                                        color="white"
                                        textDecoration="none"
                                        _hover={{ textDecoration: "underline" }}
                                    >
                                        {address.phone}
                                    </Link>
                                </Text>
                            )}
                            {address.email && (
                                <Text>
                                    Email:{" "}
                                    <Link
                                        href={`mailto:${address.email}`}
                                        color="white"
                                        textDecoration="none"
                                        _hover={{ textDecoration: "underline" }}
                                    >
                                        {address.email}
                                    </Link>
                                </Text>
                            )}
                        </VStack>
                    </Box>
                </VStack>

                {/* Navigation */}
                <VStack as="nav" align="start" gap={3} aria-label="Footer navigation">
                    <Heading size="sm">Explore</Heading>
                    <List.Root gap={2} fontSize="sm" color="gray.300" listStyleType="none">
                        <ListItem>
                            <Link
                                href="/menu"
                                color="white"
                                textDecoration="none"
                                _hover={{ textDecoration: "underline" }}
                            >
                                Menu
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link
                                href="/contact"
                                color="white"
                                textDecoration="none"
                                _hover={{ textDecoration: "underline" }}
                            >
                                Contact
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link
                                href="/about"
                                color="white"
                                textDecoration="none"
                                _hover={{ textDecoration: "underline" }}
                            >
                                About Us
                            </Link>
                        </ListItem>
                    </List.Root>
                </VStack>
            </SimpleGrid>

            {/* Bottom Section */}
            <Box
                borderTop="1px solid"
                borderColor="whiteAlpha.200"
                mt={8}
                pt={6}
                textAlign="center"
                color="gray.400"
                fontSize="sm"
            >
                <Text>
                    &copy; {year} {companyName}. All rights reserved.
                </Text>
                <HStack justify="center" gap={4} mt={2}>
                    <Link
                        href="/privacy"
                        color="gray.400"
                        textDecoration="none"
                        _hover={{ textDecoration: "underline", color: "white" }}
                    >
                        Privacy
                    </Link>
                    <Link
                        href="/terms"
                        color="gray.400"
                        textDecoration="none"
                        _hover={{ textDecoration: "underline", color: "white" }}
                    >
                        Terms
                    </Link>
                </HStack>
            </Box>
        </Box>
    );
};

export default Footer;