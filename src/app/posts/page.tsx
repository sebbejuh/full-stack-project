import prisma from '../../../prisma/prisma';
import PostCard from './PostCard';
import PostForm from './PostForm';
import SortPosts from './SortPosts';
import { Post as PrismaPost, Like } from '@prisma/client';
import { Flex, Heading, Box } from '@radix-ui/themes';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

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
  likes: LikeWithUser[];
};
interface SearchParams {
  sortPosts: string;
}

const Posts = async ({ searchParams }: { searchParams: SearchParams }) => {
  const sortOrder = searchParams.sortPosts === 'date_asc' ? 'asc' : 'desc';

  const posts: PostWithAuthorAndLikes[] = await prisma.post.findMany({
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
    orderBy: {
      createdAt: sortOrder,
    },
  });

  return (
    <Flex direction='column' align='center' gap='4'>
      <Heading as='h1' size='6'>Posts App</Heading>
      <Flex direction='column' align='center' justify='center' width='100%' className='py-2'>
        <PostForm />
      </Flex>
      <Flex direction='column' align='center' justify='center' width='100%'>
        <Box width='100%' maxWidth='600px'>
          <Flex justify='end' align='center'>
            <SortPosts />
          </Flex>
        </Box>
      </Flex>
      <Flex direction='column' align='center' justify='center' width='100%' gap='4'>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Flex>
    </Flex>
  );
}
export default Posts;

export const metadata: Metadata = {
  title: 'Posts App',
  description: 'A web application where users can create posts.',
};