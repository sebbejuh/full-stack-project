'use client'
import { Container, Button, Flex } from "@radix-ui/themes";
import { useRouter } from 'next/navigation';

const NavBar = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/api/auth/signin');
  };
  return (
    <nav className="border-b md-5 px-5 py-3">
      <Container>
        <Flex justify='between'>
          <Flex>
            Navbar Links
          </Flex>
          <Flex>
            <Button onClick={handleSignIn}>Sign In</Button>
          </Flex>
        </Flex>
      </Container>
    </nav>
  )
}

export default NavBar