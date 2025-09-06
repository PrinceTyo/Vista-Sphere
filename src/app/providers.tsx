"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ReactNode } from "react"

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
}