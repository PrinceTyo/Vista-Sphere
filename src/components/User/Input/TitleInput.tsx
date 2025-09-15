import { toaster } from "@/components/ui/toaster";
import { Box, Field, Input, Text } from "@chakra-ui/react";
import React from "react";

interface TitleInputProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

export const TitleInput = ({ title, setTitle }: TitleInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value.length > 50) {
        toaster.error({
          title: "Maximum 50 characters.",
          description: "The title must not exceed 50 characters.",
          duration: 3000,
          closable: true,
        });
        return;
      }
      setTitle(value);
    };
  return (
    <Field.Root>
      <Field.Label fontWeight="semibold" color="gray.700">
        <Box w={2} h={2} bg="blue" rounded="full" />
        <Text>Title</Text>
      </Field.Label>
      <Input
        placeholder="Masukkan judul yang menarik untuk NFT Anda"
        value={title}
        onChange={handleChange}
        shadow="sm" border="none"
      />
    </Field.Root>
  );
};
