import { Flex, Text, Heading, Card, Badge } from '@radix-ui/themes';
import PostsApp from '../public/PostsApp.png'

const ProjectsSection = () => {
  return (
    <Flex direction='column' justify='center' className='border-b border-neutral-900 pb-4 lg:mb35 w-full items-center'>
      <Heading as='h2' className='text-4xl font-thin tracking-tight'>Deployed Projects</Heading>
      <Flex justify='center' wrap='wrap' className='w-full py-6' gap='5'>

        <Flex className='w-full lg:w-1/4 items-center lg:items-start justify-center lg:justify-start'>
          <Card>
            <Flex wrap='wrap' gap='3' direction='column' className='items-center justify-center' >
              <Flex>
                <img src={PostsApp.src} alt='Posts App Image' />
              </Flex>
              <Flex gap='2' direction='column' justify='center' className='items-center w-full'>
                <Heading as='h3' className='text-1xl font-thin tracking-tight'>Posts App (in progress)</Heading>
                <Heading size='3' as='h4' className='font-thin tracking-tight'>Full-stack social media webapp</Heading>
                <Card>
                  <Text size='2' className='max-w-xl font-light tracking-tighter'>
                    Deployed on this very website! <br />
                    Users can login and register using their google account,
                    they can create posts, delete their own posts and even delete their own accounts with all their saved data & contributions!
                    <br />
                    <br />
                    Coming: Functionality to like and comment on posts.
                  </Text>
                </Card>
                <Flex wrap='wrap' justify='center' gap='2' className='w-full'>
                  <Badge variant="solid">TypeScript</Badge>
                  <Badge variant="solid" color='purple'>Next.js</Badge>
                  <Badge variant="solid" color='jade'>PostgreSQL</Badge>
                  <Badge variant="solid" color='crimson'>PrismaORM</Badge>
                  <Badge variant="solid" color='grass'>Tailwind</Badge>
                  <Badge variant="solid" color='cyan'>Radix-ui</Badge>
                  <Badge variant="solid" color='amber'>NextAuth</Badge>
                </Flex>
              </Flex>
            </Flex>
          </Card>
        </Flex>

        <Flex className='w-full lg:w-1/4 items-center lg:items-start justify-center lg:justify-start'>
          <Card>
            <Flex wrap='wrap' gap='3' direction='column' className='items-center justify-center' >
              <Flex>
                <img src='https://img.freepik.com/free-photo/homepage-seen-computer-screen_23-2149416730.jpg' alt='fsdf' />
              </Flex>
              <Flex gap='2' direction='column' justify='center' className='items-center w-full'>
                <Heading as='h3' className='text-1xl font-thin tracking-tight'>Posts App (in progress)</Heading>
                <Heading size='3' as='h4' className='font-thin tracking-tight'>Full-stack social media webapp</Heading>
                <Card>
                  <Text size='2' className='max-w-xl font-light tracking-tighter'>
                    Deployed on this very website! <br />
                    Users can login and register using their google account,
                    they can create posts, delete their own posts and even delete their own accounts with all their saved data & contributions!
                    <br />
                    <br />
                    Coming: Functionality to like and comment on posts.
                  </Text>
                </Card>
                <Flex wrap='wrap' justify='center' gap='2' className='w-full'>
                  <Badge variant="solid">TypeScript</Badge>
                  <Badge variant="solid" color='purple'>Next.js</Badge>
                  <Badge variant="solid" color='jade'>PostgreSQL</Badge>
                  <Badge variant="solid" color='crimson'>PrismaORM</Badge>
                  <Badge variant="solid" color='grass'>Tailwind</Badge>
                  <Badge variant="solid" color='cyan'>Radix-ui</Badge>
                  <Badge variant="solid" color='amber'>NextAuth</Badge>
                </Flex>
              </Flex>
            </Flex>
          </Card>
        </Flex>

      </Flex>
    </Flex>
  )
}

export default ProjectsSection