import prisma from '../../../../prisma/prisma';
import { Flex, Text, Card, Box, Avatar, Badge } from '@radix-ui/themes';
import { PersonIcon } from "@radix-ui/react-icons";
import { notFound } from "next/navigation";
import ClientTimezoneDate from '../../components/ClientTimezoneDate';
import { getServerSession } from 'next-auth';
import authOptions from '../../auth/authOptions';
import LikeCount from '../LikeCount';
import PostDropDownBtn from '../PostDropDownBtn';
import LikePostBtn from '../LikePostBtn';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';
import { recentDate } from '@/app/components/snippets';
import EditPostForm from './EditPostForm';

export const dynamic = 'force-dynamic';

interface searchParams {
  editPost: string;
}

interface Props {
  params: { id: string };
  searchParams: searchParams;
}

const page = async ({ params, searchParams }: Props) => {
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
      },
      comments: {
        include: {
          author: {
            select: { name: true, image: true }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    },
  })
  if (!post) notFound();

  const dateObject = recentDate(post.createdAt, post.updatedAt)
  const comments = post.comments
  return (
    <Flex direction='column' align='center' gap='4'>
      <Box width='100%' maxWidth='600px'>
        <Flex direction='column' align='center' gap='4'>
          <Card className='pb-0 px-0 w-full'>
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
                      <Badge variant='surface' className='text-slate-300'>{dateObject.isUpdated && 'Updated: '}<ClientTimezoneDate date={dateObject.date} /></Badge>
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
              {searchParams.editPost ? (
                <EditPostForm post={post} />
              ) : (
                <Flex direction='column' gap='1'>
                  <Flex align='center'>
                    <Text size='3' weight='medium'>{post.title}</Text>
                  </Flex>
                  <Box>
                    <Text size='2'> {post.content}</Text>
                  </Box>
                </Flex>
              )}


            </Flex>
            <Flex justify='between' style={{ backgroundColor: "#d8f4f609" }} className='px-3 py-2'>
              <Flex>
                <LikePostBtn likes={post.likes} postId={post.id} />
              </Flex>
              <Flex>

              </Flex>
            </Flex >
          </Card>
          <CommentForm postId={post.id} />
          <Text>Comments</Text>
          <Flex direction='column' align='center' gap='2' width='100%'>
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </Flex>
        </Flex>
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