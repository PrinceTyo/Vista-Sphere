"use client";

import AppSidebar from "@/components/Shared/Navbar/AppSidebar";
import { Box } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppSidebar />

      <Box
        as="main"
        ml={{ base: "60px", md: "60px" }}
        p={6}
        minH="100vh"
      >
        {children}
      </Box>
    </>
  );
}