import { toaster } from "@/components/ui/toaster";
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value && value.length < 3) {
      toaster.error({
        title: "Too short",
        description: "Location must be at least 3 characters if provided.",
        duration: 3000,
        closable: true,
      });
    }
    setLocation(value);
  };
  return (
    <Field.Root>
      <Field.Label fontWeight="semibold" color="gray.700">
        <Box w={2} h={2} bg="blue" rounded="full" />
        <Text>Location (Optional)</Text>
      </Field.Label>
      <Input
        placeholder="Contoh: Monas, Jakarta Pusat"
        value={location}
        onChange={handleChange}
        shadow="sm"
        border="none"
      />
    </Field.Root>
  );
};
