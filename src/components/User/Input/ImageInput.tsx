// src/components/User/Input/ImageInput.tsx
"use client";

import {
  Box,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
  Image,
  FileUpload,
  NumberInput,
} from "@chakra-ui/react";
import { LuUpload, LuTrash2 } from "react-icons/lu";
import { type FileAcceptDetails } from "@zag-js/file-upload";

interface ImageInputProps {
  file: File | null;
  setFile: (file: File | null) => void;
  preview: string;
  setPreview: (url: string) => void;
}

export const ImageInput = ({
  file,
  setFile,
  preview,
  setPreview,
}: ImageInputProps) => {
  const handleFile = (d: FileAcceptDetails) => {
    const f = d.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  return (
    <FileUpload.Root onFileAccept={handleFile}>
      <FileUpload.HiddenInput accept="image/*" />

      {/* LABEL */}
      <HStack>
        <Box w={2} h={2} bg="blue" rounded="full" />
        <Text fontWeight="semibold" color="gray.700" fontSize="sm">
          Upload Image
        </Text>
      </HStack>

      {/* KOTAK UPLOAD / PREVIEW */}
      <Box position="relative" w="full">
        {/* Tombol Hapus */}
        {preview && (
          <IconButton
            aria-label="Hapus"
            size="xs"
            bg="red"
            variant="solid"
            position="absolute"
            rounded="full"
            top={2}
            right={2}
            zIndex={2}
            onClick={() => {
              setFile(null);
              setPreview("");
            }}
          >
            <LuTrash2 />
          </IconButton>
        )}

        <FileUpload.Trigger asChild>
          <Box
            w="full"
            h="72"
            border="2px dashed"
            borderColor={preview ? "gray.200" : "gray.300"}
            rounded="xl"
            bg={preview ? "blue.50" : "gray.50"}
            cursor="pointer"
            transition="all 0.2s"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={3}
            overflow="hidden"
          >
            {preview ? (
              <>
                <Image
                  src={preview}
                  alt="Preview"
                  objectFit="cover"
                  w="full"
                  h="full"
                  rounded="xl"
                />
                <VStack
                  position="absolute"
                  rounded="xl"
                  inset={0}
                  bg="blackAlpha.500"
                  color="white"
                  justify="center"
                  opacity={0}
                  _hover={{ opacity: 1 }}
                  transition="opacity 0.2s"
                >
                  <Text fontWeight="semibold">Ganti gambar</Text>
                  <Text fontSize="xs">Klik untuk pilih file lain</Text>
                </VStack>
              </>
            ) : (
              <>
                <Icon as={LuUpload} w={10} h={10} color="gray.400" />
                <VStack gap={1}>
                  <Text fontSize="sm" color="gray.600">
                    <Text as="span" fontWeight="semibold" color="blue.600">
                      Klik untuk upload
                    </Text>{" "}
                    atau drag & drop
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    PNG, JPG, GIF, WebP (Max. 10MB)
                  </Text>
                </VStack>
              </>
            )}
          </Box>
        </FileUpload.Trigger>
      </Box>
    </FileUpload.Root>
  );
};