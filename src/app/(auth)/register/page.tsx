"use client";

import { Button, Container, Flex, Heading, Input, Stack, Text, VStack, Link } from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { validateEmail } from "@/lib/utils/helper";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Name required");
    if (!validateEmail(email)) return toast.error("Invalid email");
    if (password.length < 6) return toast.error("≥6 chars");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success("Account created!");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Flex
        minH="100vh"
        bg="gray.900"
        align="center"
        justify="center"
        px={4}
        bgGradient="linear(to-br, gray.900 0%, black 100%)"
      >
        <Container
          maxW="sm"
          bg="rgba(255,255,255,0.05)"
          backdropFilter="blur(10px)"
          border="1px solid"
          borderColor="whiteAlpha.200"
          borderRadius="2xl"
          p={8}
          boxShadow="0 0 40px rgba(100,100,255,0.15)"
        >
          <VStack gap={6} w="full">
            <Heading
              bgGradient="linear(to-r, blue.400, purple.400)"
              bgClip="text"
              size="2xl"
              textAlign="center"
            >
              Create Account
            </Heading>
            <Text fontSize="sm" color="gray.400">
              Join the future of photo NFTs
            </Text>

            <form onSubmit={handleRegister} style={{ width: "100%" }}>
              <Stack gap={4}>
                <Field.Root>
                  <Field.Label fontSize="xs" color="gray.300">Full Name</Field.Label>
                  <Input
                    placeholder="Satoshi Nakamoto"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    variant="flushed"
                    color="white"
                    _placeholder={{ color: "gray.500" }}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label fontSize="xs" color="gray.300">Email</Field.Label>
                  <Input
                    type="email"
                    placeholder="satoshi@crypto.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    variant="flushed"
                    color="white"
                    _placeholder={{ color: "gray.500" }}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label fontSize="xs" color="gray.300">Password</Field.Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    variant="flushed"
                    color="white"
                    _placeholder={{ color: "gray.500" }}
                  />
                </Field.Root>

                <Button
                  type="submit"
                  loading={loading}
                  loadingText="Creating"
                  width="full"
                  mt={4}
                  bgGradient="linear(to-r, blue.500, purple.500)"
                  color="white"
                  _hover={{ bgGradient: "linear(to-r, blue.600, purple.600)", transform: "scale(1.02)" }}
                  transition="all .2s"
                >
                  Create Account
                </Button>
              </Stack>
            </form>

            <Text fontSize="xs" color="gray.500">
              Already have an account?{" "}
              <Link href="/login" color="blue.400" textDecoration="underline">
                Sign In
              </Link>
            </Text>
          </VStack>
        </Container>
      </Flex>
    </>
  );
}