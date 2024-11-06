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
const generateTooltipContent = (likes: LikeWithUser[]): string => {
  const likeCount = likes.length;
  if (likeCount === 0) {
    return '0 likes';
  }
  const displayedLikes = likes.slice(0, 4).map(like => like.user.name).filter(Boolean).join(', ');
  const additionalLikes = likeCount > 4 ? `, and ${likeCount - 4} others have liked this post` : '';
  return displayedLikes + additionalLikes;
}

const LikePostBtn = ({ likes }: LikeBtnProps) => {
  const { status, data: session } = useSession();
  const likeCount = likes.length;
  const tooltipContent = generateTooltipContent(likes);
  return (
    <Skeleton loading={status === 'loading'}>
      <Tooltip content={tooltipContent}>
        <IconButton variant="solid" className='hover:cursor-pointer w-full px-2 gap-1' disabled={!session}>
          <AiOutlineLike />
          <Text size='1' >Like</Text>
          {likeCount > 0 &&
            <Text size='1'>{likeCount}</Text>
          }
        </IconButton>
      </Tooltip>
    </Skeleton >
  )
}

export default LikePostBtn