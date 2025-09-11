import { Box, Field, NumberInput, Text } from "@chakra-ui/react";
import React from "react";

interface PriceInputProps {
  price: string;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
}

export const PriceInput = ({ price, setPrice }: PriceInputProps) => {
  const handleValueChange = (details: { value: string; valueAsNumber: number }) => {
    const cleanValue = details.value.replace(/^ETH\s*/i, "").replace(/[^0-9.]/g, "");
    setPrice(cleanValue);
  };
  const displayValue = price.includes('ETH') ? price : price;

  return (
    <Field.Root>
      <Field.Label fontWeight="semibold" color="gray.700">
        <Box w={2} h={2} bg="blue" rounded="full" />
        <Text>Price (ETH)</Text>
      </Field.Label>
      <NumberInput.Root
        value={price}
        onValueChange={handleValueChange}
        formatOptions={{
          style: "currency",
          currency: "ETH",
          currencyDisplay: "code",
          currencySign: "accounting",
        }}
        w="full"
      >
        <NumberInput.Input placeholder="0.01" shadow="sm" border="none" />
      </NumberInput.Root>
    </Field.Root>
  );
};