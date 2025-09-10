import { Box, Field, Input, Text } from "@chakra-ui/react";
import React from "react";

interface LocationInputProps {
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}

export const LocationInput = ({
  location,
  setLocation,
}: LocationInputProps) => {
  return (
    <Field.Root>
      <Field.Label fontWeight="semibold" color="gray.700">
        <Box w={2} h={2} bg="blue" rounded="full" />
        <Text>Location (Optional)</Text>
      </Field.Label>
      <Input
        placeholder="Contoh: Monas, Jakarta Pusat"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
    </Field.Root>
  );
};
