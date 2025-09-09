"use client";

import { useState, useRef } from "react";
import toast from "react-hot-toast";
import {
  Box,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  Image,
  VStack,
  HStack,
  NumberInput,
  RadioCard,
  FileUpload,
  Icon,
  AspectRatio,
  Badge,
  SimpleGrid,
  Card,
  CardBody,
  IconButton,
  InputGroup,
  Flex,
} from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";
import { TagInput } from "@/components/User/Input/TagInput";
import {
  LuUpload,
  LuMapPin,
  LuCamera,
  LuSave,
  LuZoomIn,
  LuZoomOut,
  LuStar,
  LuFileText,
  LuX,
  LuTrash2,
} from "react-icons/lu";
import type { FileAcceptDetails } from "@zag-js/file-upload";
import { MdPublic } from "react-icons/md";
import { PriceInput } from "@/components/User/Input/PriceInput";
import { DescInput } from "@/components/User/Input/DescInput";
import { TitleInput } from "@/components/User/Input/TitleInput";
import { FaRegTrashCan, FaTrashCan } from "react-icons/fa6";
import { ImageInput } from "@/components/User/Input/ImageInput";
import { StatusInput } from "@/components/User/Input/StatusInput";

/* ----------------------------- TYPES ------------------------------ */
type LocationData = { location: string; coordinates: string };
type InteractiveMapProps = {
  onLocationSelect?: (data: LocationData) => void;
  selectedLocation?: { lat: number; lng: number } | null;
};

/* -------------------------- INTERACTIVE MAP ------------------------ */
const InteractiveMap = ({
  onLocationSelect,
  selectedLocation,
}: InteractiveMapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [clickPosition, setClickPosition] = useState(
    selectedLocation ?? { lat: -6.2297, lng: 106.6894 }
  );

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const lat = -6.2297 + (rect.height / 2 - y) * 0.01;
    const lng = 106.6894 + (x - rect.width / 2) * 0.01;
    const newPos = { lat, lng };
    setClickPosition(newPos);

    const locations = [
      "Monas, Jakarta Pusat",
      "Bundaran HI, Jakarta",
      "Taman Mini Indonesia Indah",
      "Kota Tua Jakarta",
      "Ancol Dreamland",
      "Grand Indonesia Mall",
      "Plaza Senayan",
      "Taman Suropati",
      "Museum Nasional",
      "Istana Merdeka",
      "Gedung Sate, Bandung",
      "Malioboro, Yogyakarta",
    ];
    const randomLocation =
      locations[Math.floor(Math.random() * locations.length)];

    onLocationSelect?.({
      location: randomLocation,
      coordinates: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
    });

    toast.success(`${randomLocation} berhasil dipilih`);
  };

  return (
    <Box
      ref={mapRef}
      w="full"
      h="full"
      bgGradient="linear(to-br, green.100, blue.100, cyan.100)"
      position="relative"
      cursor="crosshair"
      overflow="hidden"
      rounded="xl"
      border="2px solid"
      borderColor="gray.200"
      onClick={handleMapClick}
      _hover={{ borderColor: "blue.300" }}
      transition="border-color 0.2s"
    >
      {clickPosition && (
        <Icon
          as={LuMapPin}
          w="8"
          h="8"
          color="red.500"
          position="absolute"
          transform="translate(-50%, -100%)"
          left={`${50 + (clickPosition.lng - 106.6894) * 50}%`}
          top={`${50 - (clickPosition.lat + 6.2297) * 50}%`}
        />
      )}

      <HStack
        position="absolute"
        top="4"
        left="4"
        bg="white"
        rounded="lg"
        px="4"
        py="2"
        shadow="lg"
      >
        <Icon as={LuMapPin} w="4" h="4" color="blue.600" />
        <Text fontSize="sm" color="gray.700" fontWeight="medium">
          Klik pada peta untuk pilih lokasi
        </Text>
      </HStack>

      <VStack position="absolute" top="4" right="4" gap="1">
        <IconButton
          aria-label="Zoom in"
          // _icon={<LuZoomIn />}
          size="sm"
          bg="white"
          shadow="lg"
          border="1px solid"
          borderColor="gray.200"
          _hover={{ bg: "gray.50" }}
        />
        <IconButton
          aria-label="Zoom out"
          // _icon={<LuZoomOut />}
          size="sm"
          bg="white"
          shadow="lg"
          border="1px solid"
          borderColor="gray.200"
          _hover={{ bg: "gray.50" }}
        />
      </VStack>
    </Box>
  );
};

/* ------------------------------ PAGE ------------------------------ */
export default function AddNFT() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>("publish");

  const handleFile = (details: FileAcceptDetails) => {
    const f = details.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    toast.success(`${f.name} siap untuk di-upload`);
  };

  const handleLocationSelect = (locationData: LocationData) => {
    setLocation(locationData.location);
    setCoords(locationData.coordinates);
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
    <Box
      minH="100vh"
      bgGradient="linear(to-br, gray.50, blue.50, purple.50)"
      p={6}
    >
      <Box maxW="7xl" mx="auto">
        <VStack gap={4} textAlign="center" mb={8}>
          <Heading
            size="2xl"
            bgGradient="linear(to-r, blue.600, purple.600)"
            bgClip="text"
          >
            Upload NFT / Aset Digital
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Buat dan jual karya digital Anda sebagai NFT dengan mudah
          </Text>
          <Box
            w="24"
            h="1"
            bgGradient="linear(to-r, blue.500, purple.600)"
            rounded="full"
          />
        </VStack>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8}>
          {/* LEFT - MAP */}
          <Card.Root shadow="xl" rounded="2xl">
            <Card.Body p={6}>
              <VStack gap={6} align="stretch">
                <HStack gap={3}>
                  <Box
                    p={3}
                    bgGradient="linear(to-r, blue.500, purple.600)"
                    rounded="xl"
                  >
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

                <Box h="400px" rounded="xl" overflow="hidden" shadow="inner">
                  <InteractiveMap
                    onLocationSelect={handleLocationSelect}
                    selectedLocation={
                      coords
                        ? {
                            lat: parseFloat(coords.split(",")[0]),
                            lng: parseFloat(coords.split(",")[1]),
                          }
                        : null
                    }
                  />
                </Box>

                <VStack gap={4} align="stretch">
                  <Field.Root>
                    <Field.Label fontWeight="semibold" color="gray.700">
                      📍 Nama Lokasi
                    </Field.Label>
                    <Input
                      placeholder="Contoh: Monas, Jakarta Pusat"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label fontWeight="semibold" color="gray.700">
                      🌐 Koordinat GPS
                    </Field.Label>
                    <Input
                      placeholder="-6.2297, 106.6894"
                      value={coords}
                      onChange={(e) => setCoords(e.target.value)}
                    />
                    <Text fontSize="xs" color="blue.600" mt={2}>
                      💡 Koordinat akan terisi otomatis saat Anda klik peta di
                      atas
                    </Text>
                  </Field.Root>
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

        <Box mt={8} textAlign="center">
          <Text fontSize="sm" color="gray.500">
            Data Anda aman dan terenkripsi • Upload cepat dengan teknologi
            terdepan
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
