import prisma from "../../prisma/prisma";
import PostCard from "./components/PostCard";
import { Post as PrismaPost } from "@prisma/client";
import { Flex, Text} from '@radix-ui/themes';

type Author = {
  name: string | null;
  image: string | null;
};
type PostWithAuthor = PrismaPost & {
  author: Author | null;
};

async function getPosts(): Promise<PostWithAuthor[]> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true, image: true }
      }
    }
  })
  return posts
}

export default async function Home() {
  const posts: PostWithAuthor[] = await getPosts();
  console.log({ posts })

  return (
    <Flex direction='column' align='center' justify='center'>
      <Text weight='medium' size='5'>Post feed</Text>
      {
        posts.map((post) => {
          return (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
              authorName={post.author?.name ?? null}
              authorImage={post.author?.image ?? null}
            />
          )
        })
      }
    </Flex>
  );
}
