import prisma from '../../../prisma/prisma';
import PostList from './PostsList';
import PostForm from './PostForm';
import SortPosts from './SortPosts';
import { Post as PrismaPost, Like, Prisma } from '@prisma/client';
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
  page: string;
}

const Posts = async ({ searchParams }: { searchParams: SearchParams }) => {
  let orderBy: Prisma.PostOrderByWithRelationInput;

  if (searchParams.sortPosts === 'like_amount') {
    //sort by the number of likes in descending order
    orderBy = { likes: { _count: 'desc' } };
  } else if (searchParams.sortPosts === 'date_asc') {
    //sort by createdAt in ascending order
    orderBy = { createdAt: 'asc' };
  } else {
    //default sorting by createdAt in descending order
    orderBy = { createdAt: 'desc' };
  }
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const pageSize = 10;

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
    orderBy,
    take: page * pageSize
  });
  const totalPosts = await prisma.post.count();
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
      <PostList posts={posts} totalPosts={totalPosts} />
    </Flex>
  );
}
export default Posts;

export const metadata: Metadata = {
  title: 'Posts App',
  description: 'A web application where users can create posts.',
};