import { toaster } from "@/components/ui/toaster";
import { Box, Field, NumberInput, Text, Textarea } from "@chakra-ui/react";
import React from "react";

interface DescInputProps {
  desc: string;
  setDesc: React.Dispatch<React.SetStateAction<string>>;
}

export const DescInput = ({ desc, setDesc }: DescInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > 200) {
      toaster.error({
        title: "Maximum 200 characters.",
        description: "The description must not exceed 200 characters.",
        duration: 3000,
        closable: true,
      });
      return;
    }
    setDesc(value);
  };
  return (
    <Field.Root>
      <Field.Label fontWeight="semibold" color="gray.700">
        <Box w={2} h={2} bg="blue" rounded="full" />
        <Text>Description</Text>
      </Field.Label>
      <Textarea
        placeholder="Ceritakan kisah di balik karya Anda, inspirasi, atau detail menarik lainnya..."
        value={desc}
        onChange={handleChange}
        rows={4}
        resize="none"
        border="none"
        shadow="sm"
      />
    </Field.Root>
  );
};
