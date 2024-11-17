'use client'
import PostCard from './PostCard';
import { Flex } from '@radix-ui/themes';
import { Post as PrismaPost, Like } from '@prisma/client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback, useRef } from 'react';
import { MotionDiv } from '../components/MotionDiv';

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
interface PostListProps {
  posts: PostWithAuthorAndLikes[];
  totalPosts: number;
}
// custom hook as an intersection observer
const useIntersectionObserver = (callback: () => void) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });

    if (bottomRef.current) {
      observerRef.current.observe(bottomRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [callback]);

  return bottomRef;
};
// uses intersection observer hook to update page url-parameter when user scrolls to bottom of list
// maps posts that are updated with page parameter & stops when there are no more posts to map
const PostsList = ({ posts, totalPosts }: PostListProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [page, setPage] = useState<number>(parseInt(searchParams.get('page') || '1', 10));
  const [loadedPosts, setLoadedPosts] = useState<PostWithAuthorAndLikes[]>(posts);

  //increments page state if more posts are available
  const loadMorePosts = useCallback(() => {
    if (loadedPosts.length < totalPosts) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loadedPosts, totalPosts]);

  const bottomRef = useIntersectionObserver(loadMorePosts); //calls loadMorePosts when user scrolls to bottom of list

  // updates page url-parameter when page state changes if there are more posts to load
  useEffect(() => {
    if (loadedPosts.length < totalPosts) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('page', page.toString());
      router.replace(`?${newSearchParams.toString()}`, { scroll: false });
    }
  }, [page, searchParams, router, loadedPosts.length, totalPosts]);

  // keeps loadedPosts up to date with the loaded posts
  useEffect(() => {
    setLoadedPosts(posts);
  }, [posts]);

  const variants = {  //framer-motion object
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <Flex direction='column' align='center' justify='center' width='100%' gap='4'>
      {posts.map((post) => (
        <MotionDiv
          key={post.id}
          variants={variants}
          initial='hidden'
          animate='visible'
          transition={{ delay: 0.2, easy: 'easeInOut', duration: 0.5 }}
          viewport={{ amount: 0 }}
        >
          <PostCard key={post.id} post={post} />
        </MotionDiv>
      ))}
      <div ref={bottomRef} style={{ height: '1px' }} />
    </Flex>
  )
}

export default PostsList