"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

interface MapInputProps {
  coords: string;
  setCoords: (coords: string) => void;
  setLocation: (loc: string) => void;
  setCountryCode?: (code: string) => void;
}

const LocationMarker = ({
  setCoords,
  setLocation,
  setCountryCode,
}: {
  setCoords: (coords: string) => void;
  setLocation: (loc: string) => void;
  setCountryCode?: (code: string) => void;
}) => {
  const [position, setPosition] = useState<LatLngExpression | null>(null);

  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      const newPos: LatLngExpression = [lat, lng];
      setPosition(newPos);
      setCoords(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
          {
            headers: {
              "User-Agent": "my-vistasphere-app/1.0 (tyo@example.com)",
              "Accept-Language": "id",
            },
          }
        );

        const data = await res.json();
        setLocation(data.display_name || "Tidak ditemukan");
        const code = data.address?.country_code?.toUpperCase(); // id → ID
        if (code) setCountryCode?.(code);
      } catch (err) {
        setLocation("Gagal mengambil alamat");
      }
    },
  });

  return position === null ? null : <Marker position={position} />;
};

export const MapInput = ({ coords, setCoords, setLocation, setCountryCode }: MapInputProps) => {
  const defaultCenter: LatLngExpression = [-6.2, 106.816666];

  return (
    <Box w="full" h="72" rounded="xl" overflow="hidden" border="1px solid #ddd">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker setCoords={setCoords} setLocation={setLocation} setCountryCode={setCountryCode} />
      </MapContainer>
      
    </Box>
  );
};
