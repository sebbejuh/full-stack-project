import prisma from '../../../prisma/prisma';
import PostCard from './PostCard';
import PostForm from './PostForm';
import { Post as PrismaPost } from '@prisma/client';
import { Flex, Heading } from '@radix-ui/themes';

export const dynamic = 'force-dynamic';

type Author = {
  name: string | null;
  image: string | null;
};
type PostWithAuthor = PrismaPost & {
  author: Author | null;
};

async function getPosts(): Promise<PostWithAuthor[]> {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: { name: true, image: true }
      }
    }
  })
  return posts
}

export default async function Posts() {
  const posts: PostWithAuthor[] = await getPosts();

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