import { Flex, Text, Heading, Card, } from '@radix-ui/themes';
import { SiTypescript, SiCss3, SiPrisma, SiMongodb, SiPostgresql, SiExpress } from "react-icons/si";
import { FaHtml5, FaReact, FaNodeJs, FaWordpressSimple, FaGitAlt } from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { GrMysql } from "react-icons/gr";


const HeroSection = () => {
  return (
    <Flex className='border-b border-neutral-900 pb-4 lg:mb35'>
      <Flex wrap='wrap'>
        <Flex wrap='wrap' className='w-full lg:w-1/2 items-center lg:items-start justify-center lg:justify-start'>
          <Flex wrap='wrap' direction='column' className='items-center lg:items-start justify-center lg:justify-start'>
            <Heading as='h1' className='pb-16 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl'>Sebastian Locksenius</Heading>
            <Text className='bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-4xl tracking-tight text-transparent'>
              Frontend Developer
            </Text>
            <Text className='my-2 max-w-xl py-6 font-light tracking-tighter'>
              Developer with skills across the stack.<br />
              I take pride in my work and communicate
              effectively in both my native Swedish and
              in English. My experience includes
              working collaboratively in teams, often
              using agile project management
              methods. <br />
              I am passionate about problemsolving and keeping up to date with new
              technologies and concepts
            </Text>
          </Flex>
        </Flex>
        <Flex wrap='wrap' className='w-full lg:w-1/2 items-center lg:items-start justify-center lg:justify-start'>
          <Flex wrap='wrap' justify='center' direction='column' align='center' className='items-center'>
            <Heading as='h2' className='pt-16 pb-16 text-4xl font-thin tracking-tight lg:mt-16 lg:text-6xl'>My Skills</Heading>
            <Flex gap='4' wrap='wrap' maxWidth='600px' className='justify-center lg:justify-start'>
              <Card><Flex gap='1' align='center'><SiTypescript size='1.35rem' /><Text>TypeScript</Text></Flex></Card>
              <Card><Flex gap='1' align='center'><FaHtml5 size='1.35rem' /><Text>HTML</Text></Flex></Card>
              <Card><Flex gap='1' align='center'><SiCss3 size='1.35rem' /><Text>CSS</Text></Flex></Card>
              <Card><Flex gap='1' align='center'><FaReact size='1.35rem' /><Text>React</Text></Flex></Card>
              <Card><Flex gap='1' align='center'><RiNextjsFill size='1.35rem' /><Text>Next.js</Text></Flex></Card>
              <Card><Flex gap='1' align='center'><FaNodeJs size='1.35rem' /><Text>Node.js</Text></Flex></Card>
              <Card><Flex gap='1' align='center'><SiPrisma size='1.35rem' /><Text>Prisma</Text></Flex></Card>
              <Card><Flex gap='1' align='center'><RiTailwindCssFill size='1.35rem' /><Text>Tailwind</Text></Flex></Card>
              <Card><Flex gap='1' align='center'><GrMysql size='1.35rem' /><Text>MySQL</Text></Flex></Card>
              <Card><Flex gap='1' align='center'><SiMongodb size='1.35rem' /><Text>MongoDB</Text></Flex></Card>
              <Card><Flex gap='1' align='center'><SiPostgresql size='1.35rem' /><Text>Postgres</Text></Flex></Card>
              <Card><Flex gap='1' align='center'><SiExpress size='1.35rem' /><Text>Express</Text></Flex></Card>
              <Card><Flex gap='1' align='center'><FaWordpressSimple size='1.35rem' /><Text>Wordpress</Text></Flex></Card>
              <Card><Flex gap='1' align='center'><FaGitAlt size='1.35rem' /><Text>Git</Text></Flex></Card>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default HeroSection