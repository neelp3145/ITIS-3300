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

    const footerStyle = {
        bg: "gray.800",
        color: "white",
        py: { base: 8, md: 10 },
        px: { base: 4, md: 6 },
    }

    const gridStyle = {
        columns: { base: 1, md: 2, lg: 4 },
        gap: 6,
        maxW: "1100px",
        mx: "auto",
        alignItems: "start",
    }

    const linkStyle = {
        color: "white",
        textDecoration: "none",
        _hover: { textDecoration: "underline" },
    };
    
    const companyInfoStyle = {
        fontSize: "sm",
        color: "gray.300",
        lineHeight: "tall" 
    };

    const sectionStyle = {
        fontSize: "sm",
        color: "gray.300",
        listStyleType: "none",
    };
    
    const bottomStyle = {
        borderTop: "1px solid",
        borderColor: "whiteAlpha.200",
        mt: 8,
        pt: 6,
        textAlign: "center",
        color: "gray.400",
        fontSize: "sm"
    };

    const bottomLinkStyle = {
        color: "gray.400",
        textDecoration: "none",
        _hover: { textDecoration: "underline", color: "white" },
    };

    return (
        <Box
            as="footer"
            role="contentinfo"
            aria-label={`${companyName} footer`}
            css={footerStyle}
        >
            <SimpleGrid
                {...gridStyle}
            >
                {/* Company Info */}
                <VStack align="start" gap={3}>
                    <Heading size="md">{companyName}</Heading>
                    <Text {...companyInfoStyle}>
                        Craving satisfaction at 2 AM? We&apos;ve got you covered. 
                        Gourmet burgers, crispy fries, and cheesy pizza served hot until the early hours. 
                        Your late-night hunger solution.
                    </Text>
                </VStack>

                {/* Hours */}
                <VStack align="start" gap={3}>
                    <Heading size="sm">Hours</Heading>
                    <VStack align="start" {...sectionStyle}>
                        <Text>Mon-Fri: 11:00 AM — 4:00 AM</Text>
                        <Text>Sat-Sun: 12:00 AM — 4:00 AM</Text>
                    </VStack>
                </VStack>

                {/* Location */}
                <VStack align="start" gap={3}>
                    <Heading size="sm">Location</Heading>
                    <Box as="address" {...sectionStyle}>
                        <Text>{address.line1}</Text>
                        <Text>{address.city}</Text>
                        <VStack align="start" gap={1} mt={2}>
                            {address.phone && (
                                <Text>
                                    Phone:{" "}
                                    <Link
                                        href={`tel:${address.phone.replace(/[^\d+]/g, "")}`}
                                        css={linkStyle}
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
                                        css={linkStyle}
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
                    <List.Root gap={2} {...sectionStyle}>
                        <ListItem>
                            <Link
                                href="/menu"
                                css={linkStyle}
                            >
                                Menu
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link
                                href="/contact"
                                css={linkStyle}
                            >
                                Contact
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link
                                href="/about"
                                css={linkStyle}
                            >
                                About Us
                            </Link>
                        </ListItem>
                    </List.Root>
                </VStack>
            </SimpleGrid>

            {/* Bottom Section */}
            <Box css={bottomStyle}>
                <Text>
                    &copy; {year} {companyName}. All rights reserved.
                </Text>
                <HStack justify="center" gap={4} mt={2}>
                    <Link
                        href="/privacy"
                        css={bottomLinkStyle}
                    >
                        Privacy
                    </Link>
                    <Link
                        href="/terms"
                        css={bottomLinkStyle}
                    >
                        Terms
                    </Link>
                </HStack>
            </Box>
        </Box>
    );
};

export default Footer;