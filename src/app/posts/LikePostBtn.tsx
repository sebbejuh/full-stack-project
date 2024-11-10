'use client'
import { IconButton, Skeleton, Text, Tooltip } from '@radix-ui/themes';
import { AiOutlineLike } from "react-icons/ai";
import { useSession } from 'next-auth/react';
import { Like } from '@prisma/client';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type LikeWithUser = Like & {
  user: {
    name: string | null;
  };
};
interface LikeBtnProps {
  likes: LikeWithUser[]
  postId: string
}

const LikePostBtn = ({ likes, postId }: LikeBtnProps) => {
  const { status, data: session } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleLike = async () => {
    setIsSubmitting(true)
    if (!session) {
      toast.error('You are not logged in.');
      setIsSubmitting(false)
      return;
    }
    if (!session.user) {
      toast.error('User error.')
      toast.error('Please logout & in again.')
      setIsSubmitting(false)
      return;
    }

    if (likes.some(like => like.userId === session.user?.id)) {
      toast.error('You have already liked this post')
      setIsSubmitting(false)
      return
    }
    console.log(likes)

    try {
      await axios.post('/api/likes', {
        postId,
      });

      toast.success('Post Liked!')
      setIsSubmitting(false)
      // router.push('/posts');
      router.refresh();
    } catch (error) {
      console.error('Error:', error);
      toast.error(`Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`)
      setIsSubmitting(false)
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Skeleton loading={status === 'loading'}>
      <Tooltip content='I like this'>
        <IconButton variant="solid" className='hover:cursor-pointer w-full px-2 gap-1' disabled={!session || isSubmitting} onClick={handleLike}>
          <AiOutlineLike />
          <Text size='1'>Like</Text>
        </IconButton>
      </Tooltip>
    </Skeleton >
  )
}

export default LikePostBtn