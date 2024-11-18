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
      <Box width='100%' height='100%' maxWidth='600px'>
        <Card>
          <Flex direction='column' justify='between' width='100%' height='100%' gap='8'>
            <Flex width='100%' align='center' justify='center'>
              <Heading as='h1' size='6'>Account Page</Heading>
            </Flex>
            <Card>
              <Flex direction='column' justify='center' width='100%' gap='2'>
                <Heading as='h2' size='4'>User Details:</Heading>
                <Flex width='100%' gap='3' align='center'>
                  <Text>Name:</Text>
                  <Text size='2'>{session.user?.name}</Text>
                </Flex>
                <Flex width='100%' gap='3' align='center'>
                  <Text>Email:</Text>
                  <Text size='2'>{session.user?.email}</Text>
                </Flex>
                <Flex width='100%' gap='3' align='center'>
                  <Text>Avatar:</Text>
                  <Avatar
                    src={session!.user!.image!}
                    fallback='?'
                    size='2'
                    radius='full'
                    className='cursor-pointer'
                    referrerPolicy='no-referrer'
                  />
                </Flex>
                <Flex width='100%' gap='3' align='center'>
                  <Text>Posts:</Text>
                  <Text size='2'>{postCount}</Text>
                </Flex>
                <Flex width='100%' gap='3' align='center'>
                  <Text>Likes:</Text>
                  <Text size='2'>{likeCount}</Text>
                </Flex>
              </Flex>
            </Card>
            <DeleteUserBtn />
          </Flex>
        </Card>
      </Box>
    </Flex>
  )
}