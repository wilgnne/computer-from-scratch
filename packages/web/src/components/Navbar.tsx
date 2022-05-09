import React, { useMemo } from "react";
import { Box, Link, Heading, HStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavLink({ children, href }: NavLinkProps) {
  const router = useRouter();

  const isCurrent = useMemo(
    () => router.asPath === href,
    [href, router.asPath]
  );

  return (
    <NextLink href={href}>
      <Link
        px={2}
        py={1}
        rounded="md"
        bg={isCurrent && "blue.700"}
        _hover={{
          textDecoration: "none",
          bg: "blue.800",
        }}
        href={href}
      >
        {children}
      </Link>
    </NextLink>
  );
}

const Links = [
  { name: "Emulator", href: "/" },
  { name: "Assembler", href: "/assembler" },
];

function Navbar() {
  return (
    <Box display="flex" justifyContent="space-around" bg="blue.600" p={2}>
      <Heading color="white" size="lg">
        🖥️ CFS - Computer from Scratch
      </Heading>
      <Box textColor="white" alignSelf="center">
        <HStack spacing={8} alignItems="center">
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map(({ name, href }) => (
              <NavLink key={name} href={href}>
                {name}
              </NavLink>
            ))}
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
}

export default Navbar;
