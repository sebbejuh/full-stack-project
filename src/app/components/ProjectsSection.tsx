import { Flex, Text, Heading, Card, Badge, Button, Inset } from '@radix-ui/themes';
import PostsAppImage from '../../../public/PostsAppImage.png'
import WebshopImage from '../../../public/WebshopImage.png'
import Link from 'next/link';
import { FaGithub } from "react-icons/fa";
import Image from 'next/image'
import { MotionDiv } from './MotionDiv';

const ProjectsSection = () => {
  return (
    <Flex direction='column' className='border-b border-neutral-900 py-8 items-center w-full overflow-hidden'>
      <MotionDiv
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.75 }}>
        <h2 className='text-4xl lg:text-6xl pb-6 lg:pb-12 lg:pt-6 font-thin tracking-tight'>Deployed Projects</h2>
      </MotionDiv>
      <Flex justify='center' wrap='wrap' className='gap-y-8 gap-x-52 flex-col lg:flex-row items-center lg:items-start overflow-hidden lg:pt-5'>

        <MotionDiv
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.75 }}
          className='flex shrink-0 grow-0 sm:w-4/5 md:w-3/5 lg:w-1/3 h-full lg:min-h-[822px] max-w-full'>
          <Card className='flex items-center lg:items-start justify-center lg:justify-start flex-wrap flex-auto gap-3 flex-col overflow-hidden'>
            <Inset side="top" pb="current">
              <Flex>
                <Link href='/posts'>
                  <Image
                    src={PostsAppImage}
                    alt='Posts App Image'
                    className='transition duration-300 ease-in-out hover:scale-105 rounded-t-lg'
                    width={683}
                    height={448}
                    placeholder='blur'
                  />
                </Link>
              </Flex>
            </Inset>
            <Flex gap='3' direction='column' justify='center' className='items-center w-full'>
              <Heading as='h3' className='text-1xl font-thin'>Posts App <span className='text-sm'>(in progress)</span></Heading>
              <Heading size='3' as='h4' className='font-thin'>Full-stack social media web app</Heading>
              <Link href='https://github.com/sebbejuh/full-stack-project' passHref legacyBehavior>
                <a target='_blank'>
                  <Button color='purple' className='cursor-pointer'><FaGithub size='1.35rem' />Github</Button>
                </a>
              </Link>
              <Text size='3' className='max-w-xl font-light'>Deployed on this very website using Vercel!</Text>
              <Card className='flex flex-col justify-center text-center gap-2 w-full'>
                <Heading size='5' as='h5' className='font-thin underline'>Features</Heading>
                <Flex direction='column' align='center' justify='center' wrap='wrap'>
                  <Text size='3' className='font-light'>Login and register using google account.</Text>
                  <Text size='3' className='font-light'>Delete user account together with all saved data.</Text>
                  <Text size='3' className='font-light'>Create posts & comments on posts.</Text>
                  <Text size='3' className='font-light'>Delete own posts & comments.</Text>
                  <Text size='3' className='font-light'>Like posts & Unlike posts.</Text>
                  <Text size='3' className='font-light'>Sort posts several ways.</Text>
                </Flex>
                <Text size='2' className='font-light'>
                  Coming: Functionality to edit posts.
                </Text>
              </Card>
              <Flex wrap='wrap' justify='center' gap='2' className='w-full'>
                <Badge size='3' variant="surface">TypeScript</Badge>
                <Badge size='3' variant="surface" color='purple'>Next.js</Badge>
                <Badge size='3' variant="surface" color='jade'>PostgreSQL</Badge>
                <Badge size='3' variant="surface" color='crimson'>PrismaORM</Badge>
                <Badge size='3' variant="surface" color='grass'>Tailwind</Badge>
                <Badge size='3' variant="surface" color='cyan'>Radix-ui</Badge>
                <Badge size='3' variant="surface" color='amber'>NextAuth</Badge>
              </Flex>
            </Flex>
          </Card>
        </MotionDiv>

        <MotionDiv
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.75 }}
          className='flex shrink-0 grow-0 sm:w-4/5 md:w-3/5 lg:w-1/3 h-full lg:min-h-[825px] max-w-full'>
          <Card className='flex items-center lg:items-start justify-center lg:justify-start flex-wrap flex-auto gap-3 flex-col overflow-hidden'>
            <Inset side="top" pb="current" >
              <Flex>
                <Link href='https://sebbejuh.github.io/webshop-ts/' passHref legacyBehavior>
                  <a target='_blank'>
                    <Image
                      src={WebshopImage}
                      alt='Webshop App Image'
                      className='transition duration-300 ease-in-out hover:scale-105 rounded-t-lg'
                      width={683}
                      height={448}
                      placeholder='blur'
                    />
                  </a>
                </Link>
              </Flex>
            </Inset>
            <Flex gap='3' direction='column' className='items-center w-full'>
              <Heading as='h3' className='text-1xl font-thin'>Webshop App</Heading>
              <Heading size='3' as='h4' className='font-thin'> Simple Front-end e-commerce web app</Heading>
              <Link href='https://github.com/sebbejuh/webshop-ts' passHref legacyBehavior>
                <a target='_blank'>
                  <Button color='purple' className='cursor-pointer'><FaGithub size='1.35rem' />Github</Button>
                </a>
              </Link>
              <Text size='3' className='max-w-xl font-light'>Deployed using GitHub Pages!</Text>
              <Card className='flex flex-col justify-center text-center gap-2 w-full'>
                <Heading size='5' as='h5' className='font-thin underline'>Features</Heading>
                <Flex direction='column' align='center' justify='center' wrap='wrap'>
                  <Text size='3' className='font-light'>Add items to cart, Remove items from cart.</Text>
                  <Text size='3' className='font-light'>Change amount of items in cart which updates price.</Text>
                  <Text size='3' className='font-light'>Create orders from cart, Delete orders from user.</Text>
                </Flex>
                <Text size='2' className='font-light'>
                  Stores user actions in local storage & accesses products from JSON document.
                </Text>
              </Card>
              <Flex wrap='wrap' justify='center' gap='2' className='w-full'>
                <Badge size='3' variant="surface">TypeScript</Badge>
                <Badge size='3' variant="surface" color='iris'>React.js</Badge>
                <Badge size='3' variant="surface" color='crimson'>Sass</Badge>
                <Badge size='3' variant="surface" color='tomato'>ReactContext</Badge>
              </Flex>
            </Flex>
          </Card>
        </MotionDiv>

      </Flex>
    </Flex>
  )
}

export default ProjectsSection