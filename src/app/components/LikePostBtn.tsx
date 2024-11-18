'use client'
import { IconButton, Skeleton, Text, Tooltip } from '@radix-ui/themes';
import { AiOutlineLike } from "react-icons/ai";
import { useSession } from 'next-auth/react';
import { Like } from '@prisma/client';
import axios, { AxiosError } from 'axios';
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
    const foundLike = likes.find(like => like.userId === session.user?.id);
    //if post have been liked by user before, deletes the like
    if (foundLike) {
      try {
        await axios.delete('/api/likes/' + foundLike.id, {
        });

        toast.success('Post Unliked!')
        router.refresh();
        setTimeout(() => {
          setIsSubmitting(false);
        }, 2000);
      } catch (error) {
        console.error('Error:', error);
        const axiosError = error as AxiosError<ErrorResponse>;
        const errorMessage = axiosError.response?.data?.error || 'An unknown error occurred';
        const errorDetails = axiosError.response?.data?.details?.join(', ') || '';
        toast.error(`Error: ${errorMessage}${errorDetails ? ` - ${errorDetails}` : ''}`);
        setTimeout(() => {
          setIsSubmitting(false);
        }, 2000);
      } finally {
        setTimeout(() => {
          setIsSubmitting(false);
        }, 2000);
        return;
      }
    }

    try {
      await axios.post('/api/likes', {
        postId,
      });

      toast.success('Post Liked!')
      router.refresh();
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage = axiosError.response?.data?.error || 'An unknown error occurred';
      const errorDetails = axiosError.response?.data?.details?.join(', ') || '';
      toast.error(`Error: ${errorMessage}${errorDetails ? ` - ${errorDetails}` : ''}`);
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
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