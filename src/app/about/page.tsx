import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  Center,
  VStack,
} from "@chakra-ui/react";

const AboutUs: React.FC = () => {
  const missionStyle = {
    bg: "#fffaf0",
    p: 10,
    borderRadius: "12px",
    border: "2px solid #ff6b35",
    textAlign: "center",
    mb: 14,
  };

  const missionTextStyle = {
    fontSize: "lg",
    color: "gray.600",
    fontStyle: "italic",
    maxW: "800px",
    mx: "auto",
  };

  const valuesHeadingStyle = {
    color: "white",
    fontSize: { base: "2xl", md: "3xl" },
    textAlign: "center",
    mb: 8,
  };

  return (
    <Box minH="100vh" py={10}>
      <Container maxW="6xl" lineHeight={1.6}>
        {/* Header Section */}
        <Box textAlign="center" mb={12}>
          <Heading color="#ff6b35" fontSize={{ base: "3xl", md: "5xl" }} mb={5}>
            About FastBite
          </Heading>
          <Text fontSize="lg" color="white" maxW="600px" mx="auto">
            Serving delicious burgers and satisfying cravings since 2020
          </Text>
        </Box>

        {/* Our Story Section */}
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap={10}
          alignItems="center"
          mb={14}
        >
          <Box>
            <Heading color="white" fontSize={{ base: "2xl", md: "3xl" }} mb={5}>
              Our Story
            </Heading>
            <Stack gap={4}>
              <Text fontSize="md" color="white">
                FastBite was born from a simple idea: everyone deserves a great
                burger, anytime they want one. Founded in 2020 by burger
                enthusiasts we started as a small food truck with a big dream.
              </Text>
              <Text fontSize="md" color="white">
                What began as late-night cravings turned into a passion for
                creating the perfect burger experience. We spent months
                perfecting our recipes, sourcing the finest ingredients, and
                developing our signature sauces.
              </Text>
              <Text fontSize="md" color="white">
                Today, we're proud to serve our community with the same
                dedication and quality that started it all. From our classic
                cheeseburger to our innovative seasonal specials, every bite
                tells our story.
              </Text>
            </Stack>
          </Box>

          <Center
            bg="#f5f5f5"
            h="300px"
            borderRadius="12px"
            color="#888"
            border="1px solid #e0e0e0"
            fontSize="lg"
          >
            Our First Food Truck
          </Center>
        </SimpleGrid>

        {/* Our Mission Section */}
        <Box css={missionStyle}>
          <Heading color="#ff6b35" fontSize={{ base: "2xl", md: "3xl" }} mb={5}>
            Our Mission
          </Heading>
          <Text css={missionTextStyle}>
            "To create unforgettable burger experiences by combining quality
            ingredients, innovative flavors, and exceptional service, making
            every customer feel like they've found their new favorite spot."
          </Text>
        </Box>

        {/* Our Values Section */}
        <Box mb={14}>
          <Heading css={valuesHeadingStyle}>Our Values</Heading>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={6}>
            <VStack textAlign="center" p={5} gap={3}>
              <Heading color="white" fontSize="lg">
                Quality Ingredients
              </Heading>
              <Text fontSize="sm" color="white">
                We source locally whenever possible and never compromise on
                quality. From our grass-fed beef to our fresh-baked buns, every
                ingredient matters.
              </Text>
            </VStack>

            <VStack textAlign="center" p={5} gap={3}>
              <Heading color="white" fontSize="lg">
                Innovation
              </Heading>
              <Text fontSize="sm" color="white">
                We're constantly experimenting with new flavors and techniques
                to bring you exciting menu items while honoring classic
                favorites.
              </Text>
            </VStack>

            <VStack textAlign="center" p={5} gap={3}>
              <Heading color="white" fontSize="lg">
                Community
              </Heading>
              <Text fontSize="sm" color="white">
                We believe in giving back to the community that supports us
                through local partnerships, charity events, and supporting
                neighborhood initiatives.
              </Text>
            </VStack>

            <VStack textAlign="center" p={5} gap={3}>
              <Heading color="white" fontSize="lg">
                Customer Experience
              </Heading>
              <Text fontSize="sm" color="white">
                Your satisfaction is our priority. We strive to create a
                welcoming atmosphere where every customer leaves with a smile.
              </Text>
            </VStack>
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;
