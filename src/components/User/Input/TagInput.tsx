"use client";

import { useState } from "react";
import {
  Field,
  HStack,
  Icon,
  Text,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";
import { FiPlus, FiX } from "react-icons/fi";
import { toaster } from "@/components/ui/toaster";

interface TagInputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export const TagInput = ({ tags, setTags }: TagInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const addNewTag = () => {
    if (tags.length >= 10) {
      toaster.error({
        title: "Limit reached",
        description: "You can add up to 10 tags only.",
        duration: 3000,
        closable: true,
      });
      return;
    }

    const val = inputValue.trim();
    if (!val) return;

    if (val.length > 10) {
      toaster.error({
        title: "Too long",
        description: "Each tag must be 10 characters or less.",
        duration: 3000,
        closable: true,
      });
      return;
    }

    if (tags.includes(val)) {
      toaster.error({
        title: "Duplicate tag",
        description: "This tag already exists.",
        duration: 3000,
        closable: true,
      });
      return;
    }

    setTags([...tags, val]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  return (
    <Field.Root>
      <Field.Label
        fontWeight="semibold"
        color="gray.700"
        fontSize="sm"
        display="inline-flex"
        alignItems="center"
        gap={2}
      >
        <Box w={2} h={2} bg="blue" rounded="full" />
        Tags (Optional)
      </Field.Label>

      {tags.length > 0 && (
        <HStack wrap="wrap" gap={2} mb={3}>
          {tags.map((tag) => (
            <HStack
              key={tag}
              bg="blue"
              color="white"
              px={3}
              py={1}
              rounded="md"
              fontSize="sm"
            >
              <Text>#{tag}</Text>
              <Button
                size="xs"
                variant="solid"
                bg="white"
                color="blue"
                onClick={() => handleRemoveTag(tag)}
                p={0}
                minW="auto"
                h="auto"
              >
                <Icon as={FiX} />
              </Button>
            </HStack>
          ))}
        </HStack>
      )}

      <HStack gap={2} w="full">
        <Input
          flex={1}
          placeholder="Add a tag and press Enter"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          border="none"
          shadow="sm"
        />
        <Button onClick={addNewTag} bg="blue" border="none" shadow="sm">
          <Icon as={FiPlus} mr={2} />
          Add
        </Button>
      </HStack>
    </Field.Root>
  );
};