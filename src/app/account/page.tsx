import prisma from '../../../prisma/prisma';
import { Flex, Text, Card, Box, Avatar, Heading } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import authOptions from '../auth/authOptions';
import DeleteUserBtn from './DeleteUserBtn'

export default async function Account() {
  const session = await getServerSession(authOptions)

  if (!session)
    return (<Flex direction='column' align='center' justify='center'><Text>You are not logged in</Text></Flex>)

  const postCount = await prisma.post.count({
    where: {
      authorId: session?.user?.id,
    },
  });
  const likeCount = await prisma.like.count({
    where: {
      userId: session?.user?.id,
    },
  });

  return (
    <Flex direction='column' align='center' justify='center' width='100%'>
      <Box width='100%' height='100%' maxWidth='410px'>
        <Flex direction='column' justify='between' width='100%' height='100%' gap='6'>
          <Flex width='100%' align='center' justify='center'>
            <Heading as='h1' size='6'>Account Page</Heading>
          </Flex>
          <Card className='flex justify-around pb-3'>
            <Flex direction='row' gap='2' justify='center' wrap='wrap'>
              <Card className='w-full'>
                <Flex width='100%' gap='3' align='center' justify='center'>
                  <Heading as='h2' size='4'>User Details:</Heading>
                </Flex>
                <Flex width='100%' gap='3' align='center' wrap='wrap'>
                  <Text wrap='wrap' >Name:</Text>
                  <Text wrap='wrap' size='2'>{session.user?.name}</Text>
                </Flex>
                <Flex width='100%' gap='3' align='center' wrap='wrap'>
                  <Text wrap='wrap' >Email:</Text>
                  <Text wrap='pretty' size='2'>{session.user?.email}</Text>
                </Flex>
                <Flex width='100%' gap='3' align='center' wrap='wrap'>
                  <Text wrap='wrap' >Avatar:</Text>
                  <Avatar
                    src={session!.user!.image!}
                    fallback='?'
                    size='2'
                    radius='full'
                    className='cursor-pointer'
                    referrerPolicy='no-referrer'
                  />
                </Flex>
                <Flex width='100%' gap='3' align='center' wrap='wrap'>
                  <Text wrap='wrap' >Posts:</Text>
                  <Text wrap='wrap' size='2'>{postCount}</Text>
                </Flex>
                <Flex width='100%' gap='3' align='center' wrap='wrap'>
                  <Text wrap='wrap' >Likes:</Text>
                  <Text wrap='wrap' size='2'>{likeCount}</Text>
                </Flex>
              </Card>
              <Card className='w-full'>
                <Flex width='100%' gap='3' align='center' justify='center'>
                  <Heading as='h2' size='4'>Actions:</Heading>
                </Flex>
                <Flex align='center' width='100%' gap='2' justify='center' className='pt-2'>
                  <DeleteUserBtn />
                </Flex>
              </Card>
            </Flex>
          </Card>
        </Flex>
      </Box>
    </Flex>
  )
}