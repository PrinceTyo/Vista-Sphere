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
  Button,
} from "@chakra-ui/react";
import { LuUpload, LuTrash2, LuCrop } from "react-icons/lu";
import { type FileAcceptDetails } from "@zag-js/file-upload";
import { CropImageInput } from "./CropImageInput";
import { useState } from "react";

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
  const [originalSrc, setOriginalSrc] = useState("");
const [showCropper, setShowCropper] = useState(false);

const handleFile = (d: FileAcceptDetails) => {
  const f = d.files[0];
  if (!f) return;
  setFile(f);
  const url = URL.createObjectURL(f);
  setPreview(url);
  setOriginalSrc(url);
  setShowCropper(false);
};

const handleCropSave = (croppedFile: File) => {
  setFile(croppedFile);
  setPreview(URL.createObjectURL(croppedFile));
  setShowCropper(false);
};

const handleReCrop = () => {
  setPreview(originalSrc);
  setShowCropper(true);
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
              setShowCropper(false);
            }}
          >
            <LuTrash2 />
          </IconButton>
        )}

        {/* Tombol Crop (muncul kalau sudah preview) */}
        {preview && (
          <Button
            size="xs"
            position="absolute"
            top={2}
            left={2}
            zIndex={2}
            onClick={handleReCrop}
          >
            <LuCrop /> Atur Frame
          </Button>
        )}

        {/* Area Cropper (muncul kalau user klik "Atur Frame") */}
        {showCropper && (
          <Box
            position="absolute"
            inset={0}
            zIndex={3}
            bg="white"
            rounded="xl"
            p={2}
          >
            <CropImageInput src={preview} onCropComplete={handleCropSave} />
          </Box>
        )}

        <FileUpload.Trigger asChild>
          <Box
            w="full"
            h="full"
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
                <Icon as={LuUpload} w={10} h={10} color="gray.400" mt={8} />
                <VStack gap={1} mb={8}>
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
