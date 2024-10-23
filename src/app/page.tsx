import { Flex, Text, } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import authOptions from './auth/authOptions';
import HeroSection from './components/HeroSection';

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <Flex direction='column' align='center' gap='5'>
      {session &&
        <Text>Welcome to my portfolio {session?.user?.name}!</Text>
      }
      <HeroSection />
    </Flex>
  );
}