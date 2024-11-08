import { Flex, Text, } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import authOptions from './auth/authOptions';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <Flex direction='column' align='center' justify='center'>
      {session &&
        <Flex wrap='wrap' justify='center' align='center' direction='column' className='w-full pb-6'>
          <Text className='items-center justify-self-center'>Welcome to my portfolio</Text>
          <Text className='items-center justify-self-center'>{session?.user?.name}!</Text>
        </Flex>
      }
      <HeroSection />
      <ProjectsSection />
    </Flex>
  );
}