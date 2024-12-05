import { Flex, Text, Card, } from '@radix-ui/themes';
import { SiTypescript, SiCss3, SiPrisma, SiMongodb, SiPostgresql, SiExpress } from 'react-icons/si';
import { FaHtml5, FaReact, FaNodeJs, FaWordpressSimple, FaGitAlt, FaSass } from 'react-icons/fa';
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri';
import { GrMysql } from 'react-icons/gr';
import { MotionDiv } from './MotionDiv';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <Flex justify='center' className='border-b border-neutral-900 pb-4 w-full overflow-hidden'>
      <Flex wrap='wrap'>
        <Flex wrap='wrap' className='w-full lg:w-1/2 items-center lg:items-start justify-center lg:justify-start'>
          <div className='flex flex-col items-center lg:items-start justify-center lg:justify-start flex-wrap'>
            <MotionDiv
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.75, delay: 0 }}>
              <h1 className='pb-16 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl'>Sebastian Locksenius</h1>
            </MotionDiv>
            <MotionDiv
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.75, delay: 0.1 }}
              className='flex gap-5 items-center'>
              <span className='bg-gradient-to-r from-radix-indigo-3 via-radix-indigo-7 to-radix-indigo-9 bg-clip-text text-4xl tracking-tight text-transparent pb-1'>Frontend Developer</span>
              <Link href='https://locksenius.my.canva.site/front-end-cv-sebastian-locksenius' passHref legacyBehavior>
                <a target='_blank'>
                  <div className="p-3 bg-radix-indigo-10 transition ease-in-out delay-25 hover:scale-110 hover:bg-radix-indigo-10 duration-300">
                    <Flex align="center" justify="center">
                      <Text as='label'>Resume</Text>
                    </Flex>
                  </div>
                </a>
              </Link>
            </MotionDiv>
            <MotionDiv
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.75, delay: 0.2 }}>
              <p className='my-2 max-w-xl py-6 font-light tracking-tighter'>
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
              </p>
            </MotionDiv>
          </div>
        </Flex>
        <Flex wrap='wrap' className='w-full lg:w-1/2 items-center lg:items-start justify-center lg:justify-end pb-6'>
          <Flex wrap='wrap' justify='center' direction='column' align='center' className='items-center'>
            <MotionDiv
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.75, delay: 0 }}>
              <h2 className='pt-6 pb-10 text-4xl font-thin tracking-tight lg:mt-16 lg:text-6xl'>Skills</h2>
            </MotionDiv>
            <MotionDiv
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.75, delay: 0.15 }}
            >
              <div className="grid grid-cols-2 grid-rows-7 md:grid-cols-3 md:grid-rows-6 lg:grid-cols-3 lg:grid-rows-5 gap-4">
                {[
                  { icon: <SiTypescript size="1.35rem" />, text: 'TypeScript' },
                  { icon: <FaHtml5 size="1.35rem" />, text: 'HTML' },
                  { icon: <SiCss3 size="1.35rem" />, text: 'CSS' },
                  { icon: <FaReact size="1.35rem" />, text: 'React' },
                  { icon: <RiNextjsFill size="1.35rem" />, text: 'Next.js' },
                  { icon: <FaNodeJs size="1.35rem" />, text: 'Node.js' },
                  { icon: <SiPrisma size="1.35rem" />, text: 'Prisma' },
                  { icon: <RiTailwindCssFill size="1.35rem" />, text: 'Tailwind' },
                  { icon: <FaSass size="1.35rem" />, text: 'Sass' },
                  { icon: <GrMysql size="1.35rem" />, text: 'MySQL' },
                  { icon: <SiMongodb size="1.35rem" />, text: 'MongoDB' },
                  { icon: <SiPostgresql size="1.35rem" />, text: 'PostgreSQL' },
                  { icon: <SiExpress size="1.35rem" />, text: 'Express' },
                  { icon: <FaWordpressSimple size="1.35rem" />, text: 'Wordpress' },
                  { icon: <FaGitAlt size="1.35rem" />, text: 'Git' },
                ].map((item, index) => (
                  <div key={index} >
                    <Card size="2" className="transition ease-in-out delay-25 hover:-translate-y-1 hover:scale-110 duration-300">
                      <Flex gap="1" align="center" justify="center">
                        {item.icon}
                        <Text as='label'>{item.text}</Text>
                      </Flex>
                    </Card>
                  </div>
                ))}
              </div>
            </MotionDiv>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default HeroSection