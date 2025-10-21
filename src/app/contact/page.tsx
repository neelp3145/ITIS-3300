import { Box, Text, Input, Button, Field, Fieldset, Stack, NativeSelect, For, Textarea} from "@chakra-ui/react";

const Contact = () => {
    return (
        <Box as="main" role="contentinfo" maxW="800px" mx="auto" py={10} px={4}>
            <form>
                <Fieldset.Root>
                    <Stack>
                        <Fieldset.Legend>Contact Us</Fieldset.Legend>
                        <Text mb={4}>We would love to hear from you! Please fill out the form below and we will get back to you as soon as possible.</Text>
                        <Fieldset.HelperText>Fill in the fields below</Fieldset.HelperText>
                    </Stack>

                    <Fieldset.Content mt={6} mb={4} gap={4}>
                        <Field.Root>
                            <Field.Label htmlFor="name">Name</Field.Label>
                            <Input name="name" type="text" placeholder="Your Name" required />
                        </Field.Root>

                        <Field.Root>
                            <Field.Label htmlFor="email">Email</Field.Label>
                            <Input name="email" type="email" placeholder="Your Email" required />
                        </Field.Root>

                        <Field.Root>
                            <Field.Label htmlFor="subject">Subject</Field.Label>
                            <NativeSelect.Root>
                                <NativeSelect.Field name="subject">
                                    <For each={['General Inquiry', 'Complaint', 'Compliment', 'Suggestion','Other']}>
                                        {(item) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        )}
                                    </For>
                                </NativeSelect.Field>
                            </NativeSelect.Root>
                        </Field.Root>

                        <Field.Root>
                            <Field.Label htmlFor="message">Message</Field.Label>
                            <Textarea placeholder="Your message" required />
                        </Field.Root>
                    </Fieldset.Content>
                    <Button size="md" bg="#ff6b35" _hover={{ bg: "#e55b25" }} m={2} type="submit">
                        Submit
                    </Button>
                </Fieldset.Root>
            </form>
        </Box>
    )
};

export default Contact;