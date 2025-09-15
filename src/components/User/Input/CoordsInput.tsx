import { toaster } from "@/components/ui/toaster";
import { Box, Field, Input, Text } from "@chakra-ui/react";
import React from "react";

interface CoordsInputProps {
  coords: string;
  setCoords: React.Dispatch<React.SetStateAction<string>>;
}

export const CoordsInput = ({ coords, setCoords }: CoordsInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^-?\d+\.?\d*,\s*-?\d+\.?\d*$/;

    if (value && !regex.test(value)) {
      toaster.error({
        title: "Invalid format",
        description: "Please use: latitude, longitude  e.g. -6.2297, 106.6894",
        duration: 3000,
        closable: true,
      });
    }
    setCoords(value);
  };
  return (
    <Field.Root>
      <Field.Label fontWeight="semibold" color="gray.700">
        <Box w={2} h={2} bg="blue" rounded="full" />
        <Text>Coordinates (Optional)</Text>
      </Field.Label>
      <Input
        placeholder="-6.2297, 106.6894"
        value={coords}
        onChange={handleChange}
        shadow="sm"
        border="none"
      />
    </Field.Root>
  );
};
