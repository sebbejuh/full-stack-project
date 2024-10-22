import { Flex, Text, Heading } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import authOptions from './auth/authOptions';

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <Flex direction='column' align='center' justify='center' gap='5'>
      <Heading as='h1' size='6'>Home</Heading>
      <Text>Welcome to my portfolio {session?.user?.name}!</Text>
    </Flex>
  );
}