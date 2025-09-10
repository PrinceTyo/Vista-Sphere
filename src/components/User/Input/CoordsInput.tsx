import { Box, Field, Input, Text } from "@chakra-ui/react";
import React from "react";

interface CoordsInputProps {
  coords: string;
  setCoords: React.Dispatch<React.SetStateAction<string>>;
}

export const CoordsInput = ({
  coords,
  setCoords,
}: CoordsInputProps) => {
  return (
    <Field.Root>
      <Field.Label fontWeight="semibold" color="gray.700">
        <Box w={2} h={2} bg="blue" rounded="full" />
        <Text>Coordinates (Optional)</Text>
      </Field.Label>
      <Input
        placeholder="-6.2297, 106.6894"
        value={coords}
        onChange={(e) => setCoords(e.target.value)}
      />
    </Field.Root>
  );
};
