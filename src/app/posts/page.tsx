import prisma from '../../../prisma/prisma';
import PostCard from './PostCard';
import PostForm from './PostForm';
import { Post as PrismaPost, Like } from '@prisma/client';
import { Flex, Heading } from '@radix-ui/themes';
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

async function getPosts(): Promise<PostWithAuthorAndLikes[]> {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: { name: true, image: true }
      },
      likes: {
        include: {
          user: {
            select: { name: true, }
          }
        }
      }
    }
  })
  return posts
}

export default async function Posts() {
  const posts: PostWithAuthorAndLikes[] = await getPosts();

  return (
    <Flex direction='column' align='center' gap='5'>
      <Heading as='h1' size='6'>Posts App</Heading>
      <Flex direction='column' align='center' justify='center' width='100%' >
        <PostForm />
      </Flex>
      <Flex direction='column' align='center' justify='center' width='100%' gap='4'>
        {
          posts.slice().reverse().map((post) => {
            return (
              <PostCard key={post.id} post={post} />
            )
          })
        }
      </Flex>
    </Flex>
  );
}
export const metadata: Metadata = {
  title: 'Posts App',
  description: 'A web application where users can create posts.',
};