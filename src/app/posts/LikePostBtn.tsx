'use client'
import { IconButton, Skeleton, Text, Tooltip } from '@radix-ui/themes';
import { AiOutlineLike } from "react-icons/ai";
import { useSession } from 'next-auth/react';
import { Like } from '@prisma/client';

type LikeWithUser = Like & {
  user: {
    name: string | null;
  };
};
interface LikeBtnProps {
  likes: LikeWithUser[]
}

const LikePostBtn = ({ likes }: LikeBtnProps) => {
  const { status, data: session } = useSession();

  return (
    <Skeleton loading={status === 'loading'}>
      <Tooltip content='I like this'>
        <IconButton variant="solid" className='hover:cursor-pointer w-full px-2 gap-1' disabled={!session}>
          <AiOutlineLike />
          <Text size='1'>Like</Text>
        </IconButton>
      </Tooltip>
    </Skeleton >
  )
}

export default LikePostBtn