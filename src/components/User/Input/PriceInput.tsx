import { toaster } from "@/components/ui/toaster";
import {
  Box,
  Field,
  Input,
  InputGroup,
  NumberInput,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface PriceInputProps {
  price: string;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
}

export const PriceInput = ({ price, setPrice }: PriceInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/^ETH\s*/i, "").replace(/[^0-9.]/g, "");

    if (clean.length > 50) {
      toaster.error({
        title: "Too long",
        description: "Max 50 characters.",
        duration: 3000,
        closable: true,
      });
      return;
    }

    if (clean && !/^\d+\.?\d{0,18}$/.test(clean)) {
      toaster.error({
        title: "Invalid ETH price",
        description: "Up to 18 decimals only.",
        duration: 3000,
        closable: true,
      });
      return;
    }

    setPrice(clean);
  };

  return (
    <Field.Root>
      <Field.Label fontWeight="semibold" color="gray.700">
        <Box w={2} h={2} bg="blue" rounded="full" />
        <Text>Price (ETH)</Text>
      </Field.Label>
      <InputGroup startElement="ETH">
        <Input placeholder="0.01" value={price} onChange={handleChange} />
      </InputGroup>
    </Field.Root>
  );
};
