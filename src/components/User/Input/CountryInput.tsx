"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Field,
  Combobox,
  Portal,
  HStack,
  Text,
  Spinner,
  Box,
  Image,
  createListCollection,
} from "@chakra-ui/react";

interface Country {
  code: string;
  name: string;
  dial: string;
}

interface CountryInputProps {
  country: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
}

const getFlagUrl = (code: string) =>
  `https://flagcdn.com/w40/${code.toLowerCase()}.png`;

export const CountryInput = ({ country, setCountry }: CountryInputProps) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,cca2,idd")
      .then((r) => r.json())
      .then((data) => {
        const list: Country[] = data
          .map((c: any) => ({
            code: c.cca2,
            name: c.name.common,
            dial: c.idd?.root
              ? `${c.idd.root}${c.idd.suffixes?.[0] ?? ""}`
              : "",
          }))
          .filter((c: Country) => c.dial)
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
        setCountries(list);
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter countries based on search value
  const filteredCountries = useMemo(() => {
    if (!searchValue.trim()) return countries;

    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        country.dial.includes(searchValue) ||
        country.code.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [countries, searchValue]);

  const collection = useMemo(
    () =>
      createListCollection({
        items: filteredCountries.map((c) => ({
          label: `${c.name} (${c.dial})`,
          value: c.code,
        })),
      }),
    [filteredCountries]
  );

  const selected = countries.find((c) => c.code === country);

  // Set display value for input
  const inputValue = useMemo(() => {
    if (selected && !searchValue) {
      return `${selected.name} (${selected.dial})`;
    }
    return searchValue;
  }, [selected, searchValue]);

  return (
    <Field.Root margin={0} padding={0} >
      <Field.Label fontWeight="semibold" color="gray.700">
        <Box w={2} h={2} bg="blue" rounded="full" />
        <Text>Country</Text>
      </Field.Label>

      {loading ? (
        <HStack gap={2} h={10}>
          <Spinner size="sm" />
          <Text fontSize="sm">Sedang memuat daftar negara...</Text>
        </HStack>
      ) : (
        <Combobox.Root
          collection={collection}
          value={country ? [country] : []}
          onValueChange={(details) => {
            setCountry(details.value[0] ?? "");
            setSearchValue("");
          }}
          inputValue={inputValue}
          onInputValueChange={(details) => setSearchValue(details.inputValue)}
          h={10}
          padding={0}
          margin={0}
          openOnClick
        >
          <Combobox.Control>
            <HStack gap={2} px={0} w="full">
              {selected && !searchValue && (
                <Image
                  src={getFlagUrl(selected.code)}
                  alt={`${selected.name} flag`}
                  htmlWidth={24}
                  htmlHeight={16}
                  objectFit="cover"
                  borderRadius="2px"
                />
              )}
              <Combobox.Input
                placeholder={
                  selected && !searchValue
                    ? ""
                    : "Ketik untuk mencari negara..."
                }
                flex="1"
                shadow="sm" border="none"
              />
            </HStack>
            <Combobox.Trigger />
          </Combobox.Control>

          <Portal>
            <Combobox.Positioner>
              <Combobox.Content maxH="300px" overflowY="auto" >
                {filteredCountries.length === 0 ? (
                  <Box p={3} textAlign="center">
                    <Text fontSize="sm" color="gray.500">
                      Tidak ada negara yang ditemukan
                    </Text>
                  </Box>
                ) : (
                  collection.items.map((item) => {
                    const countryData = filteredCountries.find(
                      (c) => c.code === item.value
                    );
                    return (
                      <Combobox.Item key={item.value} item={item}>
                        <HStack gap={3} width="full">
                          <Image
                            src={getFlagUrl(item.value)}
                            alt={`${countryData?.name} flag`}
                            htmlWidth={32}
                            htmlHeight={20}
                            objectFit="cover"
                            borderRadius="2px"
                          />
                          <Box flex="1">
                            <Text fontSize="sm" fontWeight="medium">
                              {countryData?.name}
                            </Text>
                            <Text fontSize="xs" color="gray.600">
                              {countryData?.dial}
                            </Text>
                          </Box>
                        </HStack>
                        <Combobox.ItemIndicator />
                      </Combobox.Item>
                    );
                  })
                )}
              </Combobox.Content>
            </Combobox.Positioner>
          </Portal>
        </Combobox.Root>
      )}
    </Field.Root>
  );
};
