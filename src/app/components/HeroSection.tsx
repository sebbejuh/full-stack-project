import { Flex, Text, Heading, Card, Grid } from '@radix-ui/themes';
import { SiTypescript, SiCss3, SiPrisma, SiMongodb, SiPostgresql, SiExpress } from "react-icons/si";
import { FaHtml5, FaReact, FaNodeJs, FaWordpressSimple, FaGitAlt, FaSass } from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { GrMysql } from "react-icons/gr";


const HeroSection = () => {
  return (
    <Flex className='border-b border-neutral-900 pb-4 lg:mb35'>
      <Flex wrap='wrap'>
        <Flex wrap='wrap' className='w-full lg:w-1/2 items-center lg:items-start justify-center lg:justify-start'>
          <Flex wrap='wrap' direction='column' className='items-center lg:items-start justify-center lg:justify-start'>
            <Heading as='h1' className='pb-16 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl'>Sebastian Locksenius</Heading>
            <Text className='bg-gradient-to-r from-radix-indigo-9 via-radix-indigo-7 to-radix-indigo-3 bg-clip-text text-4xl tracking-tight text-transparent'>
              Frontend Developer
            </Text>
            <Text className='my-2 max-w-xl py-6 font-light tracking-tighter'>
              Developer with skills across the stack.
              I take pride in my work and communicate
              effectively in both my native Swedish and
              in English. <br />
              My experience includes
              working collaboratively in teams, often
              using agile project management
              methods. <br />
              I am passionate about problemsolving and keeping up to date with new
              technologies and concepts
            </Text>
          </Flex>
        </Flex>
        <Flex wrap='wrap' className='w-full lg:w-1/2 items-center lg:items-start justify-center lg:justify-end pb-6'>
          <Flex wrap='wrap' justify='center' direction='column' align='center' className='items-center'>
            <Heading as='h2' className='pt-6 pb-10 text-4xl font-thin tracking-tight lg:mt-16 lg:text-7xl'>My Skills</Heading>
            <Grid className='grid grid-cols-2 grid-rows-7 md:grid-cols-3 md:grid-rows-6 lg:grid-cols-3 lg:grid-rows-5 gap-4'>
              <Card size='2' className='transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-radix-indigo-10 duration-400 ...'><Flex gap='1' align='center' justify='center'><SiTypescript size='1.35rem' /><Text>TypeScript</Text></Flex></Card>
              <Card size='2' className='transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-radix-indigo-10 duration-400 ...'><Flex gap='1' align='center' justify='center'><FaHtml5 size='1.35rem' /><Text>HTML</Text></Flex></Card>
              <Card size='2' className='transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-radix-indigo-10 duration-400 ...'><Flex gap='1' align='center' justify='center'><SiCss3 size='1.35rem' /><Text>CSS</Text></Flex></Card>
              <Card size='2' className='transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-radix-indigo-10 duration-400 ...'><Flex gap='1' align='center' justify='center'><FaReact size='1.35rem' /><Text>React</Text></Flex></Card>
              <Card size='2' className='transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-radix-indigo-10 duration-400 ...'><Flex gap='1' align='center' justify='center'><RiNextjsFill size='1.35rem' /><Text>Next.js</Text></Flex></Card>
              <Card size='2' className='transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-radix-indigo-10 duration-400 ...'><Flex gap='1' align='center' justify='center'><FaNodeJs size='1.35rem' /><Text>Node.js</Text></Flex></Card>
              <Card size='2' className='transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-radix-indigo-10 duration-400 ...'><Flex gap='1' align='center' justify='center'><SiPrisma size='1.35rem' /><Text>Prisma</Text></Flex></Card>
              <Card size='2' className='transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-radix-indigo-10 duration-400 ...'><Flex gap='1' align='center' justify='center'><RiTailwindCssFill size='1.35rem' /><Text>Tailwind</Text></Flex></Card>
              <Card size='2' className='transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-radix-indigo-10 duration-400 ...'><Flex gap='1' align='center' justify='center'><FaSass size='1.35rem' /><Text>Sass</Text></Flex></Card>
              <Card size='2' className='transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-radix-indigo-10 duration-400 ...'><Flex gap='1' align='center' justify='center'><GrMysql size='1.35rem' /><Text>MySQL</Text></Flex></Card>
              <Card size='2' className='transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-radix-indigo-10 duration-400 ...'><Flex gap='1' align='center' justify='center'><SiMongodb size='1.35rem' /><Text>MongoDB</Text></Flex></Card>
              <Card size='2' className='transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-radix-indigo-10 duration-400 ...'><Flex gap='1' align='center' justify='center'><SiPostgresql size='1.35rem' /><Text>PostgreSQL</Text></Flex></Card>
              <Card size='2' className='transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-radix-indigo-10 duration-400 ...'><Flex gap='1' align='center' justify='center'><SiExpress size='1.35rem' /><Text>Express</Text></Flex></Card>
              <Card size='2' className='transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-radix-indigo-10 duration-400 ...'><Flex gap='1' align='center' justify='center'><FaWordpressSimple size='1.35rem' /><Text>Wordpress</Text></Flex></Card>
              <Card size='2' className='transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-radix-indigo-10 duration-400 ...'><Flex gap='1' align='center' justify='center'><FaGitAlt size='1.35rem' /><Text>Git</Text></Flex></Card>
            </Grid>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default HeroSection