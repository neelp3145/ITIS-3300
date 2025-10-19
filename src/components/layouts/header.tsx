import React from 'react';
import Image from 'next/image'
import fastbiteLogo from '@/assets/images/fastbite-logo.png'

import { Box, Flex, HStack, Link } from '@chakra-ui/react';

const Header = () => {
    return (
        <Box as="header" bg="gray.800" color="white" py={4}>
            <Flex maxW="1200px" mx="auto" align="center" justify="space-between">
                {/* Logo */}
                <Image src={fastbiteLogo} alt="FastBite Logo" width={100} height={40} priority />
                
                {/* Navigation Links */}
                <nav>
                    <HStack gap={6} align="center">
                        <Link href="/" _hover={{ textDecoration: 'underline', color: 'gray.300' }}>
                            Home
                        </Link>
                        <Link href="/menu" _hover={{ textDecoration: 'underline', color: 'gray.300' }}>
                            Menu
                        </Link>
                        <Link href="/contact" _hover={{ textDecoration: 'underline', color: 'gray.300' }}>
                            Contact
                        </Link>
                        <Link href="/about" _hover={{ textDecoration: 'underline', color: 'gray.300' }}>
                            About Us
                        </Link>
                    </HStack>
                </nav>
            </Flex>
        </Box>
    );
};

export default Header;