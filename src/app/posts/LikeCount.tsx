import { Text, Tooltip, Flex, Badge } from '@radix-ui/themes';
import { Like } from '@prisma/client';
import { AiOutlineLike } from "react-icons/ai";

type LikeWithUser = Like & {
  user: {
    name: string | null;
  };
};
interface LikeCountProps {
  likes: LikeWithUser[]
}

const generateTooltipContent = (likes: LikeWithUser[]): string => {
  const likeCount = likes.length;
  if (likeCount === 0) {
    return '0 likes';
  }
  const displayedLikes = likes.slice(0, 4).map(like => like.user.name).filter(Boolean).join(', ');
  if (likeCount <= 4) {
    return `${displayedLikes} liked this`;
  }
  const additionalLikes = `, and ${likeCount - 4} others have liked this`;
  return displayedLikes + additionalLikes;
}

const LikeCount = ({ likes }: LikeCountProps) => {
  const likeCount = likes.length;
  const tooltipContent = generateTooltipContent(likes);
  return (
    <Tooltip content={tooltipContent}>
      <Flex>
        <Badge variant='solid' className='text-slate-200'>
          <AiOutlineLike />
          <Text className='underline' size='1'>{likeCount}</Text>
        </Badge>
      </Flex>
    </Tooltip>
  )
}

export default LikeCount