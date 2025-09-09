"use client";

import {
  Box,
  Field,
  HStack,
  Icon,
  Text,
  RadioCard,
} from "@chakra-ui/react";
import { MdPublic } from "react-icons/md";
import { LuFileText } from "react-icons/lu";

interface StatusInputProps {
  status: string;
  setStatus: (value: string) => void;
}

export const StatusInput = ({ status, setStatus }: StatusInputProps) => {
  return (
    <Field.Root>
      <RadioCard.Root
        value={status}  
        onValueChange={({ value }) => value && setStatus(value)}
        variant="solid"
        color="gray.700"
        colorPalette="blue"
      >
        <RadioCard.Label
          display="inline-flex"
          alignItems="center"
          gap={2}
          color="gray.700"
        >
          <Box w={2} h={2} bg="blue" rounded="full" />
          <Text color="gray.700">Select Status: {status}</Text>
        </RadioCard.Label>

        <HStack align="stretch">
          {/* PUBLISH */}
          <RadioCard.Item value="publish">
            <RadioCard.ItemHiddenInput />
            <RadioCard.ItemControl>
              <RadioCard.ItemContent>
                <Icon as={MdPublic} boxSize={6} mb="2" />
                <RadioCard.ItemText>Publish Now</RadioCard.ItemText>
                <RadioCard.ItemDescription>
                  Langsung terbit dan bisa dibeli
                </RadioCard.ItemDescription>
              </RadioCard.ItemContent>
              <RadioCard.ItemIndicator />
            </RadioCard.ItemControl>
          </RadioCard.Item>

          {/* DRAFT */}
          <RadioCard.Item value="draft">
            <RadioCard.ItemHiddenInput />
            <RadioCard.ItemControl>
              <RadioCard.ItemContent>
                <Icon as={LuFileText} boxSize={6} mb="2" />
                <RadioCard.ItemText >Save as Draft</RadioCard.ItemText>
                <RadioCard.ItemDescription>
                  Simpan sebagai draft terlebih dahulu
                </RadioCard.ItemDescription>
              </RadioCard.ItemContent>
              <RadioCard.ItemIndicator />
            </RadioCard.ItemControl>
          </RadioCard.Item>
        </HStack>
      </RadioCard.Root>
    </Field.Root>
  );
};
