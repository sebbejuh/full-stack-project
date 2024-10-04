'use client'
import Skeleton from "@/app/components/Skeleton"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";

const NavBar = () => {
  return (
    <nav className="border-b md-5 px-5 py-3">
      <Container>
        <Flex justify='between'>
          <Flex>
            Navbar Links Placeholder
          </Flex>
          <Flex>
            <AuthStatus />
          </Flex>
        </Flex>
      </Container>
    </nav>
  )
}

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === "loading") return <Skeleton width="3rem" />;
  if (status === "unauthenticated" || !session || !session.user)
    return (
      <Link className="nav-link" href={"/api/auth/signin"}>
        Login
      </Link>
    );
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href={"/api/auth/signout"}>Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar