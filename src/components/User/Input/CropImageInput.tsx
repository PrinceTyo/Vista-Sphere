"use client";

import { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import { Box, IconButton, Button, VStack } from "@chakra-ui/react";
import { LuCheck, LuCrop } from "react-icons/lu";

interface CropImageInputProps {
  src: string;
  onCropComplete: (file: File) => void;
}

export const CropImageInput = ({
  src,
  onCropComplete,
}: CropImageInputProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropChange = useCallback(
    (crop: { x: number; y: number }) => setCrop(crop),
    []
  );
  const onZoomChange = useCallback((zoom: number) => setZoom(zoom), []);

  const handleCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveCrop = async () => {
    if (!croppedAreaPixels) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = document.createElement("img");
    img.src = src;
    await new Promise((res) => (img.onload = () => res(null)));

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx?.drawImage(
      img,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const croppedFile = new File([blob], "crop.avif", {
          type: "image/avif",
        });
        onCropComplete(croppedFile);
      },
      "image/avif",
      0.92
    );
  };

  return (
    <VStack gap={4} w="full">
      <Box
        position="relative"
        w="full"
        h="72"
        rounded="xl"
        overflow="hidden"
        border="2px dashed"
        borderColor="gray.300"
        bg="gray.50"
      >
        <Cropper
          image={src}
          crop={crop}
          zoom={zoom}
          aspect={4/3}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={handleCropComplete}
          style={{ containerStyle: { width: "100%", height: "100%" } }}
        />
        <IconButton
          aria-label="Save crop"
          size="sm"
          position="absolute"
          bottom={2}
          right={2}
          bg="blue"
          color="white"
          onClick={handleSaveCrop}
        >
          <LuCheck />
        </IconButton>
      </Box>
    </VStack>
  );
};