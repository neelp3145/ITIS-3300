import {
  Box,
  Container,
  Separator,
  Heading,
  Link,
  List,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";

export const metadata = {
  title: "Terms of Service | FastBite",
  description:
    "Read the Terms of Service for FastBite, including ordering, delivery, refunds, and user responsibilities.",
};

export default function TermsPage() {
  const effectiveDate = "October 1, 2025";

  return (
    <Container maxW="3xl" py={{ base: 8, md: 12 }}>
      <Heading as="h1" size="xl" mb={2}>
        FastBite Terms of Service
      </Heading>
      <Text color="gray.500" mb={4}>
        Effective date: {effectiveDate}
      </Text>
      <Separator mb={8} />

      <Stack gap={8}>
        <Box>
          <Heading as="h2" size="md" mb={2}>
            1. Acceptance of Terms
          </Heading>
          <Text>
            By accessing or using FastBite’s website, mobile app, or services
            (collectively, the “Services”), you agree to these Terms of Service
            and our{" "}
            <Link as={NextLink} href="/privacy" color="blue.500">
              Privacy Policy
            </Link>
            . If you do not agree, do not use the Services.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            2. Eligibility
          </Heading>
          <Text>
            You must be at least 13 years old to use the Services. Certain items
            (e.g., age-restricted products) may require additional age
            verification where permitted by law.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            3. Menu, Pricing, and Availability
          </Heading>
          <List.Root gap={2} listStyleType="disc" pl={5}>
            <List.Item>
              Menu items, pricing, fees, taxes, and availability may change at
              any time without notice.
            </List.Item>
            <List.Item>
              Photos are for reference only; actual items may vary.
            </List.Item>
            <List.Item>
              Prices may differ between delivery, pickup, and in-store
              purchases.
            </List.Item>
          </List.Root>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            4. Ordering and Payment
          </Heading>
          <List.Root gap={2} listStyleType="disc" pl={5}>
            <List.Item>
              Orders are offers to purchase and are subject to acceptance and
              availability.
            </List.Item>
            <List.Item>
              We may cancel or refuse orders at our discretion, including in
              cases of error or suspected fraud.
            </List.Item>
            <List.Item>
              Payment is processed at checkout using supported payment methods.
              You authorize us to charge your selected method for the total
              amount shown.
            </List.Item>
          </List.Root>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            5. Delivery and Pickup
          </Heading>
          <List.Root gap={2} listStyleType="disc" pl={5}>
            <List.Item>
              Estimated times are not guaranteed; delays may occur due to
              factors outside our control.
            </List.Item>
            <List.Item>
              You are responsible for providing accurate delivery information
              and being available to receive the order.
            </List.Item>
            <List.Item>
              Risk of loss passes to you upon delivery or pickup.
            </List.Item>
          </List.Root>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            6. Allergens and Dietary Information
          </Heading>
          <Text>
            Our kitchens may handle common allergens (e.g., dairy, eggs, soy,
            wheat, peanuts, tree nuts, fish, shellfish). We do not guarantee
            that any menu item is free from allergens or cross-contact. Please
            review item descriptions and contact us with questions before
            ordering.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            7. Cancellations, Refunds, and Adjustments
          </Heading>
          <List.Root gap={2} listStyleType="disc" pl={5}>
            <List.Item>
              Orders may be canceled before preparation begins; once preparation
              starts, cancellations may not be possible.
            </List.Item>
            <List.Item>
              If there is an issue with your order, contact us within 24 hours
              with your order number and details.
            </List.Item>
            <List.Item>
              Refunds or credits are issued at our discretion and may take
              several business days to process.
            </List.Item>
          </List.Root>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            8. Accounts and Security
          </Heading>
          <List.Root gap={2} listStyleType="disc" pl={5}>
            <List.Item>
              You are responsible for your account credentials and all activity
              under your account.
            </List.Item>
            <List.Item>
              Notify us immediately of any unauthorized use or security breach.
            </List.Item>
          </List.Root>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            9. Loyalty and Promotions
          </Heading>
          <List.Root gap={2} listStyleType="disc" pl={5}>
            <List.Item>
              Loyalty programs, coupons, and promotions may be subject to
              additional terms and may change or end at any time.
            </List.Item>
            <List.Item>
              Promotional offers are not transferable and may be limited per
              customer or order.
            </List.Item>
          </List.Root>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            10. Gift Cards and Credits
          </Heading>
          <List.Root gap={2} listStyleType="disc" pl={5}>
            <List.Item>
              Gift cards and store credits are not redeemable for cash except
              where required by law.
            </List.Item>
            <List.Item>
              We are not responsible for lost, stolen, or unauthorized use of
              gift cards.
            </List.Item>
          </List.Root>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            11. Third-Party Services
          </Heading>
          <Text>
            We may integrate with third-party platforms (e.g., payment
            processors, delivery partners). We are not responsible for the
            content, policies, or practices of third parties. Your use of
            third-party services is at your own risk and subject to their terms
            and policies.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            12. Acceptable Use
          </Heading>
          <List.Root gap={2} listStyleType="disc" pl={5}>
            <List.Item>
              Do not misuse the Services, interfere with their operation, or
              access them using automated means.
            </List.Item>
            <List.Item>
              Do not submit unlawful, misleading, infringing, or harmful
              content.
            </List.Item>
          </List.Root>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            13. Intellectual Property
          </Heading>
          <Text>
            The Services, including content, trademarks, logos, and software,
            are owned by FastBite or its licensors and are protected by
            applicable laws. You may not copy, modify, distribute, or create
            derivative works without prior written consent.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            14. User Content
          </Heading>
          <Text>
            If you submit reviews or other content, you grant FastBite a
            non-exclusive, worldwide, royalty-free license to use, reproduce,
            display, and distribute such content in connection with the
            Services. You represent that you own or have rights to the content
            you submit.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            15. Privacy
          </Heading>
          <Text>
            Your use of the Services is subject to our{" "}
            <Link as={NextLink} href="/privacy" color="blue.500">
              Privacy Policy
            </Link>
            , which explains how we collect, use, and share information.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            16. Disclaimers
          </Heading>
          <List.Root gap={2} listStyleType="disc" pl={5}>
            <List.Item>
              The Services are provided “as is” and “as available.”
            </List.Item>
            <List.Item>
              We disclaim all warranties to the fullest extent permitted by law.
            </List.Item>
            <List.Item>
              We do not guarantee uninterrupted, error-free, or secure access to
              the Services.
            </List.Item>
          </List.Root>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            17. Limitation of Liability
          </Heading>
          <Text>
            To the fullest extent permitted by law, FastBite and its affiliates
            will not be liable for indirect, incidental, special, consequential,
            or punitive damages, or for lost profits, revenues, or data arising
            from your use of the Services.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            18. Changes to the Services and Terms
          </Heading>
          <Text>
            We may update the Services and these Terms from time to time.
            Changes are effective upon posting. Your continued use after changes
            are posted constitutes acceptance of the updated Terms.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            19. Governing Law and Dispute Resolution
          </Heading>
          <Text>
            These Terms are governed by the laws of your local jurisdiction
            where the order is fulfilled, without regard to conflict of law
            principles. Disputes will be resolved in the courts located in that
            jurisdiction unless otherwise required by law.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            20. Contact Us
          </Heading>
          <Text>
            For questions or concerns, contact FastBite Support at{" "}
            <Link href="mailto:support@fastbite.com" color="blue.500">
              support@fastbite.com
            </Link>{" "}
            or visit{" "}
            <Link as={NextLink} href="/contact" color="blue.500">
              our contact page
            </Link>
            .
          </Text>
        </Box>
      </Stack>
    </Container>
  );
}
