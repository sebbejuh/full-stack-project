'use client'
import { Flex, Text, Card, Box, Avatar, Badge, Skeleton, Button } from '@radix-ui/themes';
import { PersonIcon } from "@radix-ui/react-icons";
import { Post as PrismaPost, Like } from '@prisma/client';
import ClientTimezoneDate from '../components/ClientTimezoneDate';
import PostDropDownBtn from './PostDropDownBtn';
import { useSession } from 'next-auth/react';
import LikePostBtn from './LikePostBtn';
import LikeCount from './LikeCount';
import Link from 'next/link'
import { recentDate } from '../components/snippets';

type Author = {
  name: string | null;
  image: string | null;
};
type LikeWithUser = Like & {
  user: {
    name: string | null;
  };
};
type Count = {
  comments: number;
}
type PostWithAuthorAndLikes = PrismaPost & {
  author: Author | null;
  likes: LikeWithUser[]
  _count: Count;
};
interface PostCardProps {
  post: PostWithAuthorAndLikes;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { id, title, content, createdAt, updatedAt, author, authorId, likes, _count } = post;
  const { status, data: session } = useSession();
  const dateObject = recentDate(createdAt, updatedAt)

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
                  <Flex gap='2' align='center' wrap='wrap'>
                    <Badge variant='surface' className='text-slate-300'>{dateObject.isUpdated && 'Updated: '}<ClientTimezoneDate date={dateObject.date} /></Badge>
                    {likes.length > 0 && (
                      <LikeCount likes={likes} />
                    )}
                  </Flex>
                </Flex>
              </Flex>
              {session && session.user?.id == authorId && (
                <PostDropDownBtn postId={id} />
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
              <Link href={'/posts/' + id.toString()} scroll={false}>
                <Button variant='outline' className='cursor-pointer'>
                  Comments ({_count.comments})
                </Button>
              </Link>
            </Flex>
          </Flex >
        </Card>
      </Box >
    </Skeleton>
  )
}

export default PostCard