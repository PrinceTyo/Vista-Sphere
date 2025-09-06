"use client";

import { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  Input,
  InputGroup,
  Textarea,
  Stack,
  Button,
  Image,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";
import { toast } from "react-hot-toast";
import { TagInput } from "@/components/User/Input/TagInput";

export default function AddNFT() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [isPublish, setIsPublish] = useState(true);
  const [isArsip, setIsArsip] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async () => {
    if (!file || !title) return toast.error("File & Title wajib diisi");
    setLoading(true);
    /* TODO: panggil API upload */
    toast.success("File siap di-upload!");
    setLoading(false);
  };

  return (
    <Flex minH="100vh" bg="gray.900" color="white" p={6} gap={6}>
      {/* LEFT - Preview */}
      <Box flex="1" maxW="500px">
        <VStack align="start" gap={4}>
          <Heading size="lg">Preview</Heading>
          <Box
            w="full"
            h="400px"
            bg="gray.800"
            rounded="xl"
            overflow="hidden"
            border="1px solid"
            borderColor="whiteAlpha.200"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {preview ? (
              <Image
                src={preview}
                alt="preview"
                objectFit="cover"
                w="full"
                h="full"
              />
            ) : (
              <Text color="gray.500">Pilih file untuk preview</Text>
            )}
          </Box>

          <Input
            type="file"
            onChange={handleFile}
            accept="image/*,video/*,audio/*"
            className="unshadow-input"
          />
        </VStack>
      </Box>

      {/* RIGHT - Form */}
      <Box flex="2">
        <VStack align="start" gap={4}>
          <Heading size="lg">Upload NFT / Aset Digital</Heading>
          <Box h="1px" bg="whiteAlpha.200" w="full" my={4} />

          <Stack gap={4} w="full">
            <Field.Root>
              <Field.Label>Title / Name</Field.Label>
              <Input
                placeholder="Judul aset"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="unshadow-input"
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Description</Field.Label>
              <Textarea
                placeholder="Ceritakan tentang aset ini"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={4}
                className="unshadow-input"
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Category / Collection</Field.Label>
              <select
                className="chakra-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  background: "#1A202C",
                  color: "#E2E8F0",
                  border: "1px solid rgba(255,255,255,0.16)",
                }}
              >
                <option value="" disabled>
                  Pilih kategori
                </option>
                <option value="Art">Art</option>
                <option value="Music">Music</option>
                <option value="Video">Video</option>
                <option value="Photography">Photography</option>
              </select>
            </Field.Root>

            <Field.Root>
              <Field.Label>Price (ETH)</Field.Label>
              <InputGroup startElement="$" endElement="USD">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="unshadow-input"
                />
              </InputGroup>
            </Field.Root>

            <Field.Root>
              <TagInput tags={tags} setTags={setTags} />
            </Field.Root>

            <HStack justify="space-between">
              <Text>Publish</Text>
              <input
                type="checkbox"
                checked={isPublish}
                onChange={(e) => setIsPublish(e.target.checked)}
                style={{ accentColor: "#3182CE" }}
                className="unshadow-input"
              />
            </HStack>

            <HStack justify="space-between">
              <Text>Arsip</Text>
              <input
                type="checkbox"
                checked={isArsip}
                onChange={(e) => setIsArsip(e.target.checked)}
                style={{ accentColor: "#718096" }}
                className="unshadow-input"
              />
            </HStack>

            <Button
              colorScheme="blue"
              size="lg"
              w="full"
              onClick={handleSubmit}
              loading={loading}
              loadingText="Uploading"
            >
              Upload & Save
            </Button>
          </Stack>
        </VStack>
      </Box>
    </Flex>
  );
}
