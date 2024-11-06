import { Flex, Text, Heading, Card, Badge, Button } from '@radix-ui/themes';
import PostsApp from '../public/PostsApp.png'
import WebshopImage from '../public/WebshopImage.png'
import Link from 'next/link';
import { FaGithub } from "react-icons/fa";

const ProjectsSection = () => {
  return (
    <Flex direction='column' justify='center' className='border-b border-neutral-900 pb-4 lg:mb35 w-full items-center'>
      <Heading as='h2' className='text-4xl pb-3 font-thin tracking-tight'>Deployed Projects</Heading>
      <Flex justify='center' wrap='wrap' gap='5' className='w-full py-6'>

        <Flex className='w-full lg:w-1/4 items-center lg:items-start justify-center lg:justify-start'>
          <Card className='min-h-[619px]'>
            <Flex wrap='wrap' gap='3' direction='column' className='items-center justify-center' >
              <Flex>
                <Link href='/posts'>
                  <img src={PostsApp.src} alt='Posts App Image' />
                </Link>
              </Flex>
              <Flex gap='2' direction='column' justify='center' className='items-center w-full'>
                <Heading as='h3' className='text-1xl font-thin tracking-tight'>Posts App (in progress)</Heading>
                <Heading size='3' as='h4' className='font-thin tracking-tight'>Full-stack social media web app</Heading>
                <Link href='https://github.com/sebbejuh/full-stack-project' passHref legacyBehavior>
                  <a target='_blank'>
                    <Button color='purple' className='cursor-pointer'><FaGithub size='1.35rem' />Github</Button>
                  </a>
                </Link>
                <Card>
                  <Text size='2' className='max-w-xl font-light tracking-tighter'>
                    Deployed on this very website using Vercel! <br />
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
          <Card className='min-h-[619px]'>
            <Flex wrap='wrap' gap='3' direction='column' className='items-center justify-center' >
              <Flex>
                <Link href='https://sebbejuh.github.io/webshop-ts/' passHref legacyBehavior>
                  <a target='_blank'>
                    <img src={WebshopImage.src} alt='Webshop App Image' />
                  </a>
                </Link>
              </Flex>
              <Flex gap='2' direction='column' justify='center' className='items-center w-full'>
                <Heading as='h3' className='text-1xl font-thin tracking-tight'>Webshop App</Heading>
                <Heading size='3' as='h4' className='font-thin tracking-tight'> Simple Front-end e-commerce web app</Heading>
                <Link href='https://github.com/sebbejuh/webshop-ts' passHref legacyBehavior>
                  <a target='_blank'>
                    <Button color='purple' className='cursor-pointer'><FaGithub size='1.35rem' />Github</Button>
                  </a>
                </Link>
                <Card>
                  <Text size='2' className='max-w-xl font-light tracking-tighter'>
                    Deployed using GitHub Pages! <br />
                    Created without using a database, instead storing user actions in localstorage and accessing products from a JSON document.<br />
                    Users can add products to cart and remove products from cart. They can create orders from cart and delete their orders on their account page.
                  </Text>
                </Card>
                <Flex wrap='wrap' justify='center' gap='2' className='w-full'>
                  <Badge variant="solid">TypeScript</Badge>
                  <Badge variant="solid" color='iris'>React.js</Badge>
                  <Badge variant="solid" color='crimson'>Sass</Badge>
                  <Badge variant="solid" color='tomato'>ReactContext</Badge>
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