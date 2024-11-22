import prisma from '../../../../prisma/prisma';
import { Flex, Text, Card, Box, Avatar, Badge } from '@radix-ui/themes';
import { PersonIcon } from "@radix-ui/react-icons";
import { notFound } from "next/navigation";
import ClientTimezoneDate from '../../components/ClientTimezoneDate';
import { getServerSession } from 'next-auth';
import authOptions from '../../auth/authOptions';
import LikeCount from '../../components/LikeCount';
import PostDropDownBtn from '../PostDropDownBtn';
import LikePostBtn from '../../components/LikePostBtn';

interface Props {
  params: { id: string };
}

const page = async ({ params }: Props) => {
  const postId = params.id.toString()
  const session = await getServerSession(authOptions)

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: {
        select: { name: true, image: true }
      },
      likes: {
        include: {
          user: {
            select: { name: true }
          }
        }
      }
    },
  })
  if (!post) notFound();
  const isSameDate = new Date(post.createdAt).getTime() === new Date(post.updatedAt).getTime();
  const mostRecentDate = isSameDate ? post.createdAt : (new Date(post.updatedAt).getTime() > new Date(post.createdAt).getTime() ? post.updatedAt : post.createdAt);
  const isUpdated = !isSameDate && new Date(post.updatedAt).getTime() > new Date(post.createdAt).getTime();

  return (
    <Flex direction='column' align='center' gap='4'>
      <Box width='100%' maxWidth='600px'>
        <Card className='pb-0 px-0'>
          <Flex direction='column' gap='2' className='px-3 pb-3'>
            <Flex justify='between'>
              <Flex gap='3' align='center'>
                <Avatar
                  size='3'
                  src={post.author?.image ?? undefined}
                  radius='full'
                  fallback={<PersonIcon width="32" height="32" />}
                />
                <Flex direction='column' gap='1'>
                  <Text size='2' weight='bold'>{post.author?.name}</Text>
                  <Flex gap='2' align='center'>
                    <Badge variant='surface' className='text-slate-300'>{isUpdated && 'Updated at'}<ClientTimezoneDate date={mostRecentDate} /></Badge>
                    {post.likes.length > 0 && (
                      <LikeCount likes={post.likes} />
                    )}
                  </Flex>
                </Flex>
              </Flex>
              {session && session.user?.id == post.authorId && (
                <PostDropDownBtn postId={post.id} />
              )}
            </Flex>
            <Flex direction='column' gap='1'>
              <Flex align='center'>
                <Text size='3' weight='medium'>{post.title}</Text>
              </Flex>
              <Box>
                <Text size='2'> {post.content}</Text>
              </Box>
            </Flex>
          </Flex>
          <Flex justify='between' style={{ backgroundColor: "#d8f4f609" }} className='px-3 py-2'>
            <Flex>
              <LikePostBtn likes={post.likes} postId={post.id} />
            </Flex>
            <Flex>

            </Flex>
          </Flex >
        </Card>
      </Box >
    </Flex>
  )
}

export async function generateMetadata({ params }: Props) {
  const postId = params.id.toString()
  const post = await prisma.post.findUnique({
    where: { id: postId },
  })

  return {
    title: post?.title,
    description: "Details of post" + post?.id,
  };
}

export default page