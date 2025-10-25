import type { Metadata } from "next";
import {
    Box,
    Container,
    Separator,
    Heading,
    Link,
    Stack,
    Text,
    List,
} from "@chakra-ui/react";


export const metadata: Metadata = {
    title: "Privacy Policy | FastBite",
    description: "How FastBite collects, uses, and protects your information.",
};

const Privacy = () => {
    return (
        <Container maxW="4xl" py={{ base: 8, md: 12 }}>
            <Stack gap={10}>
                <Box>
                    <Heading as="h1" size="xl" mb={2}>
                        FastBite Privacy Policy
                    </Heading>
                    <Text color="gray.500">Last updated: October 25, 2025</Text>
                </Box>

                <Box>
                    <Heading as="h2" size="md" mb={3}>
                        Overview
                    </Heading>
                    <Text>
                        This Privacy Policy explains how FastBite (“FastBite”, “we”, “us”, or “our”) collects, uses,
                        shares, and protects information when you visit our websites, place orders,
                        or interact with our services. By using FastBite, you agree to the practices described here.
                    </Text>
                </Box>

                <Separator />

                <Box>
                    <Heading as="h2" size="md" mb={3}>
                        Information We Collect
                    </Heading>
                    <Heading as="h3" size="sm" mb={2}>
                        Information you provide
                    </Heading>
                    <List.Root gap={1} mb={4}>
                        <List.Item>Account details (name, email, phone, password)</List.Item>
                        <List.Item>Order details (items, special instructions, delivery address)</List.Item>
                        <List.Item>
                            Payment information (processed securely by our payment partners; we do not store full card
                            numbers)
                        </List.Item>
                        <List.Item>Preferences, ratings, and feedback</List.Item>
                        <List.Item>Customer support communications</List.Item>
                    </List.Root>

                    <Heading as="h3" size="sm" mb={2}>
                        Information collected automatically
                    </Heading>
                    <List.Root gap={1}>
                        <List.Item>Device and browser details, IP address, and general location</List.Item>
                        <List.Item>Usage data such as pages viewed, features used, and app performance</List.Item>
                        <List.Item>Cookies and similar technologies (pixels, SDKs) for analytics and personalization</List.Item>
                        <List.Item>Precise location if you grant permission in your device settings</List.Item>
                    </List.Root>
                </Box>

                <Separator />

                <Box>
                    <Heading as="h2" size="md" mb={3}>
                        How We Use Your Information
                    </Heading>
                    <List.Root gap={1}>
                        <List.Item>Process and deliver orders, and provide customer support</List.Item>
                        <List.Item>Personalize your experience and remember your preferences</List.Item>
                        <List.Item>Send service-related messages (order updates, receipts, policy changes)</List.Item>
                        <List.Item>Improve our menu, services, apps, and site performance</List.Item>
                        <List.Item>Detect, prevent, and protect against fraud, abuse, and security risks</List.Item>
                        <List.Item>Comply with legal obligations and enforce our terms</List.Item>
                        <List.Item>
                            Provide marketing communications where permitted, with the option to opt out at any time
                        </List.Item>
                    </List.Root>
                </Box>

                <Separator />

                <Box>
                    <Heading as="h2" size="md" mb={3}>
                        How We Share Information
                    </Heading>
                    <List.Root gap={1}>
                        <List.Item>
                            Service providers who support our operations (payments, delivery, hosting, analytics, customer
                            support) under contractual confidentiality and security obligations
                        </List.Item>
                        <List.Item>Business transfers (merger, acquisition, or asset sale)</List.Item>
                        <List.Item>Legal purposes (to comply with law, respond to requests, or protect rights)</List.Item>
                        <List.Item>With your consent or at your direction</List.Item>
                    </List.Root>
                    <Text mt={3}>
                        We do not sell your personal information. We may share limited data for advertising or
                        analytics as permitted by law and your preferences.
                    </Text>
                </Box>

                <Separator />

                <Box>
                    <Heading as="h2" size="md" mb={3}>
                        Cookies and Tracking
                    </Heading>
                    <Text mb={2}>
                        We use cookies and similar technologies to keep you signed in, remember your preferences, analyze
                        traffic, and personalize content. You can manage cookies in your browser or device settings. Some
                        features may not function properly without certain cookies.
                    </Text>
                </Box>

                <Separator />

                <Box>
                    <Heading as="h2" size="md" mb={3}>
                        Data Retention
                    </Heading>
                    <Text>
                        We retain information for as long as needed to provide services, comply with legal obligations,
                        resolve disputes, and enforce agreements. Retention periods vary based on the type of data and
                        our legal or business needs.
                    </Text>
                </Box>

                <Separator />

                <Box>
                    <Heading as="h2" size="md" mb={3}>
                        Your Choices and Rights
                    </Heading>
                    <List.Root gap={1}>
                        <List.Item>Access, correct, or delete certain account information</List.Item>
                        <List.Item>Opt out of marketing emails by using the unsubscribe link</List.Item>
                        <List.Item>Control cookies and analytics via browser/device settings</List.Item>
                        <List.Item>Withdraw location permissions in your device settings</List.Item>
                    </List.Root>
                    <Text mt={3}>
                        Your rights may vary by region. If you submit a request, we may need to verify your identity to
                        protect your account and data.
                    </Text>
                </Box>

                <Separator />

                <Box>
                    <Heading as="h2" size="md" mb={3}>
                        Children’s Privacy
                    </Heading>
                    <Text>
                        FastBite is not directed to children under 13, and we do not knowingly collect personal
                        information from children under 13. If you believe a child has provided us personal information,
                        contact us so we can take appropriate action.
                    </Text>
                </Box>

                <Separator />

                <Box>
                    <Heading as="h2" size="md" mb={3}>
                        Data Security
                    </Heading>
                    <Text>
                        We use administrative, technical, and physical safeguards designed to protect your information.
                        However, no method of transmission or storage is completely secure, and we cannot guarantee
                        absolute security.
                    </Text>
                </Box>

                <Separator />

                <Box>
                    <Heading as="h2" size="md" mb={3}>
                        International Transfers
                    </Heading>
                    <Text>
                        Your information may be processed and stored in countries other than your own. We take steps to
                        ensure appropriate protections are in place in accordance with applicable law.
                    </Text>
                </Box>

                <Separator />

                <Box>
                    <Heading as="h2" size="md" mb={3}>
                        Changes to This Policy
                    </Heading>
                    <Text>
                        We may update this Privacy Policy from time to time. We will post the updated version with a new
                        “Last updated” date. Continued use of our services after changes means you accept the updated
                        policy.
                    </Text>
                </Box>

                <Separator />

                <Box>
                    <Heading as="h2" size="md" mb={3}>
                        Contact Us
                    </Heading>
                    <Text>
                        If you have questions or requests regarding this Privacy Policy, contact us at{" "}
                        <Link href="mailto:privacy@fastbite.com" color="blue.500">
                            privacy@fastbite.com
                        </Link>
                        .
                    </Text>
                    <Text mt={1}>
                        Mailing address: 9201 University City Blvd, Charlotte, NC 28213, USA
                    </Text>
                </Box>
            </Stack>
        </Container>
    );
}

export default Privacy;