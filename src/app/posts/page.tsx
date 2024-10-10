import prisma from '../../../prisma/prisma';
import PostCard from './PostCard';
import PostForm from './PostForm';
import { Post as PrismaPost } from '@prisma/client';
import { Flex, Text } from '@radix-ui/themes';

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
    <Flex direction='column' align='center' gap='4'>
      <Flex direction='column' align='center' justify='center' width='100%' >
        <Text weight='medium' size='5'>Posts</Text>
        <PostForm />
      </Flex>
      <Flex direction='column' align='center' justify='center' width='100%' gap='4'>
        <Text weight='medium' size='5'>Post Feed</Text>
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