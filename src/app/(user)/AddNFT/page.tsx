"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Icon,
  SimpleGrid,
  Card,
} from "@chakra-ui/react";
import { TagInput } from "@/components/User/Input/TagInput";
import { LuMapPin, LuSave } from "react-icons/lu";
import type { FileAcceptDetails } from "@zag-js/file-upload";
import { PriceInput } from "@/components/User/Input/PriceInput";
import { DescInput } from "@/components/User/Input/DescInput";
import { TitleInput } from "@/components/User/Input/TitleInput";
import { ImageInput } from "@/components/User/Input/ImageInput";
import { StatusInput } from "@/components/User/Input/StatusInput";
import { MapInput } from "@/components/User/Input/MapInput";
import { CountryInput } from "@/components/User/Input/CountryInput";
import { LocationInput } from "@/components/User/Input/LocationInput";
import { CoordsInput } from "@/components/User/Input/CoordsInput";

export default function AddNFT() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>("publish");

  const handleFile = (details: FileAcceptDetails) => {
    const f = details.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    toast.success(`${f.name} siap untuk di-upload`);
  };

  const handleCountryFromMap = (code: string) => {
    setCountry(code);
    // setCountry(getCountryNameByCode(code));
  };

  const handleSubmit = async () => {
    if (!file || !title) {
      toast.error("File & Title wajib diisi");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success("NFT Anda telah berhasil di-upload");
      setLoading(false);
    }, 2000);
  };

  return (
    <Box minH="100vh" p={6}>
      <Box maxW="7xl" mx="auto">
        <VStack gap={4} textAlign="center" mb={8}>
          <Heading size="2xl" bg="blue" bgClip="text">
            Upload NFT / Aset Digital
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Buat dan jual karya digital Anda sebagai NFT dengan mudah
          </Text>
          <Box w="24" h="1" bg="blue" rounded="full" />
        </VStack>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8}>
          {/* LEFT - MAP */}
          <Card.Root shadow="xl" rounded="2xl">
            <Card.Body p={6}>
              <VStack gap={6} align="stretch">
                <HStack gap={3}>
                  <Box p={3} rounded="xl">
                    <Icon as={LuMapPin} w={6} h={6} color="white" />
                  </Box>
                  <VStack align="start" gap={0}>
                    <Heading size="lg" color="gray.800">
                      Lokasi Foto
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                      Tentukan lokasi pengambilan foto
                    </Text>
                  </VStack>
                </HStack>
                <HStack>
                  <Box w={2} h={2} bg="blue" rounded="full" />
                  <Text fontSize="sm" color="gray.700" fontWeight="semibold">
                    Klik peta untuk memilih lokasi, coordinates, location, & country otomatis
                    terisi
                  </Text>
                </HStack>

                <MapInput
                  coords={coords}
                  setCoords={setCoords}
                  setLocation={setLocation}
                  setCountryCode={handleCountryFromMap}
                />

                <VStack gap={4} align="stretch" w="full">
                  <CountryInput country={country} setCountry={setCountry} />

                  <LocationInput
                    location={location}
                    setLocation={setLocation}
                  />

                  <CoordsInput coords={coords} setCoords={setCoords} />
                </VStack>
              </VStack>
            </Card.Body>
          </Card.Root>

          {/* RIGHT - FORM */}
          <Card.Root shadow="xl" rounded="2xl">
            <Card.Body p={6}>
              <VStack gap={6} align="stretch">
                <ImageInput
                  file={file}
                  setFile={setFile}
                  preview={preview}
                  setPreview={setPreview}
                />

                <VStack gap={5} align="stretch">
                  <TitleInput title={title} setTitle={setTitle} />

                  <DescInput desc={desc} setDesc={setDesc} />

                  <PriceInput price={price} setPrice={setPrice} />

                  <TagInput tags={tags} setTags={setTags} />

                  <StatusInput status={status} setStatus={setStatus} />

                  <Button
                    size="lg"
                    w="full"
                    bg="blue"
                    color="white"
                    _active={{ transform: "translateY(0)" }}
                    onClick={handleSubmit}
                    loading={loading}
                    loadingText="Uploading NFT..."
                    shadow="lg"
                    transition="all 0.2s"
                    fontWeight="bold"
                    py={6}
                  >
                    <LuSave /> Upload & Save NFT
                  </Button>
                </VStack>
              </VStack>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>
      </Box>
    </Box>
  );
}
