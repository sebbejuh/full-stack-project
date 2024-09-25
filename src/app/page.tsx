import prisma from "../../prisma/prisma";
import PostCard from "./components/PostCard";
import { Post as PrismaPost} from "@prisma/client";

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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <h1>Post feed</h1>
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
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <h1>footer</h1>
      </footer>
    </div>
  );
}
