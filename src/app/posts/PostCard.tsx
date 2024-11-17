'use client'
import { Flex, Text, Card, Box, Avatar, Badge, Skeleton } from '@radix-ui/themes';
import { PersonIcon } from "@radix-ui/react-icons";
import { Post as PrismaPost, Like } from '@prisma/client';
import ClientTimezoneDate from '../components/ClientTimezoneDate';
import DeletePostBtn from './DeletePostBtn';
import { useSession } from 'next-auth/react';
import LikePostBtn from './LikePostBtn';
import LikeCount from './LikeCount';

type Author = {
  name: string | null;
  image: string | null;
};
type LikeWithUser = Like & {
  user: {
    name: string | null;
  };
};
type PostWithAuthorAndLikes = PrismaPost & {
  author: Author | null;
  likes: LikeWithUser[]
};
interface PostCardProps {
  post: PostWithAuthorAndLikes;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { id, title, content, createdAt, updatedAt, author, authorId, likes } = post;
  const { status, data: session } = useSession();
  const isSameDate = new Date(createdAt).getTime() === new Date(updatedAt).getTime();
  const mostRecentDate = isSameDate ? createdAt : (new Date(updatedAt).getTime() > new Date(createdAt).getTime() ? updatedAt : createdAt);
  const isUpdated = !isSameDate && new Date(updatedAt).getTime() > new Date(createdAt).getTime();

  return (
    <Skeleton loading={status === 'loading'}>
      <Box width='100%' maxWidth='600px'>
        <Card className='pb-0 px-0'>
          <Flex direction='column' gap='2' className='px-3 pb-3'>
            <Flex justify='between'>
              <Flex gap='3' align='center'>
                <Avatar
                  size='3'
                  src={author?.image ?? undefined}
                  radius='full'
                  fallback={<PersonIcon width="32" height="32" />}
                />
                <Flex direction='column' gap='1'>
                  <Text size='2' weight='bold'>{author?.name}</Text>
                  <Flex gap='2' align='center'>
                    <Badge variant='surface' className='text-slate-300'>{isUpdated && 'Updated at'}<ClientTimezoneDate date={mostRecentDate} /></Badge>
                    {likes.length > 0 && (
                      <LikeCount likes={likes} />
                    )}
                  </Flex>
                </Flex>
              </Flex>
              {session && session.user?.id == authorId && (
                <DeletePostBtn postId={id} />
              )}
            </Flex>
            <Flex direction='column' gap='1'>
              <Flex align='center'>
                <Text size='3' weight='medium'>{title}</Text>
              </Flex>
              <Box>
                <Text size='2'> {content}</Text>
              </Box>
            </Flex>
          </Flex>
          <Flex justify='between' style={{ backgroundColor: "#d8f4f609" }} className='px-3 py-2'>
            <Flex>
              <LikePostBtn likes={likes} postId={id} />
            </Flex>
            <Flex>

            </Flex>
          </Flex >
        </Card>
      </Box >
    </Skeleton>
  )
}

export default PostCard