import { Box, Field, Input, Text } from "@chakra-ui/react";
import React from "react";

interface TitleInputProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

export const TitleInput = ({ title, setTitle }: TitleInputProps) => {
  return (
    <Field.Root>
      <Field.Label fontWeight="semibold" color="gray.700">
        <Box w={2} h={2} bg="blue" rounded="full" />
        <Text>Title</Text>
      </Field.Label>
      <Input
        placeholder="Masukkan judul yang menarik untuk NFT Anda"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        shadow="sm" border="none"
      />
    </Field.Root>
  );
};
