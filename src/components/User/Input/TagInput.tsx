"use client";

import { useState } from "react";
import {
  Flex,
  Box,
  Text,
  Input,
  Button,
  HStack,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { FiPlus, FiX } from "react-icons/fi";

interface TagInputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export const TagInput = ({ tags, setTags }: TagInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const addNewTag = () => {
    const val = inputValue.trim();
    if (val && !tags.includes(val)) {
      setTags([...tags, val]);
      setInputValue("");
    }
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
    <VStack align="start" gap={3} w="full">
      {/* Label */}
      <HStack gap={2} fontSize="sm" fontWeight="semibold" color="white">
        <Box w={2} h={2} bg="blue.400" rounded="full" />
        <Text>Tags (Optional)</Text>
      </HStack>

      {/* Daftar "tag" pakai Badge */}
      {tags.length > 0 && (
        <HStack wrap="wrap" gap={2}>
          {tags.map((tag) => (
            <HStack
              key={tag}
              bg="blue.600"
              color="white"
              px={3}
              py={1}
              rounded="md"
              fontSize="sm"
            >
              <Text>#{tag}</Text>
              <Button
                size="xs"
                variant="ghost"
                colorScheme="whiteAlpha"
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

      {/* Input + tombol tambah */}
      <HStack gap={2} w="full">
        <Input
          flex={1}
          placeholder="Add a tag and press Enter"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          border="none"
          boxShadow="md"
          bg="gray.800"
          color="white"
          _placeholder={{ color: "gray.400" }}
          _focus={{ boxShadow: "outline" }}
        />
        <Button
          colorScheme="blue"
          onClick={addNewTag}
        >
          <Icon as={FiPlus} mr={2} />
          Add
        </Button>
      </HStack>
    </VStack>
  );
};
