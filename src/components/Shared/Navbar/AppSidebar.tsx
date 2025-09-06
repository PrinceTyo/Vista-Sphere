"use client";

import { Flex, Box, Text, Icon, Portal } from "@chakra-ui/react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  FiHome,
  FiUploadCloud,
  FiStar,
  FiCreditCard,
  FiUser,
} from "react-icons/fi";

const NavItem = ({
  href,
  label,
  icon: ItemIcon,
  expanded,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  expanded: boolean;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} passHref legacyBehavior>
      <Flex
        as="a"
        w="full"
        align="center"
        gap={3}
        px={3}
        py={3}
        rounded="md"
        fontSize="sm"
        fontWeight={isActive ? "semibold" : "normal"}
        bg={isActive ? "blue.600" : "transparent"}
        color={isActive ? "white" : "gray.300"}
        _hover={{ bg: "whiteAlpha.200" }}
        transition="all .2s"
      >
        <ItemIcon size={20} />
        {expanded && <Text>{label}</Text>}
      </Flex>
    </Link>
  );
};

export default function AppSidebar() {
  const [hovered, setHovered] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: FiHome },
    { label: "Uploads", href: "/AddNFT", icon: FiUploadCloud },
    { label: "My NFTs", href: "/nfts", icon: FiStar },
    { label: "Transactions", href: "/transactions", icon: FiCreditCard },
    { label: "Profile", href: "/profile", icon: FiUser },
  ];

  return (
    <Portal>
      <Flex
        pos="fixed"
        left={0}
        top={0}
        h="100vh"
        direction="column"
        bg="gray.900"
        borderRight="1px solid"
        borderColor="whiteAlpha.200"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        transition="width .25s"
        width={hovered ? "200px" : "60px"}
        p={2}
        pt={6}
        zIndex={999}
        shadow="dark-lg"
      >
        {/* Logo */}
        {!hovered ? (
          <Flex justify="center" mb={6}>
            <Icon as={FiHome} fontSize="24px" color="white" />
          </Flex>
        ) : (
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="white"
            mb={6}
            px={2}
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
          >
            VistaSphera
          </Text>
        )}

        <Flex direction="column" gap={2} w="full">
          {navItems.map((item) => (
            <Box key={item.href}>
              <NavItem {...item} expanded={hovered} />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Portal>
  );
}