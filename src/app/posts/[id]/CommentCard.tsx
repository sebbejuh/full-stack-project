import { Comment as PrismaComment } from '@prisma/client';
import { Flex, Text, Card, Avatar, Badge, Box } from '@radix-ui/themes';
import { PersonIcon } from "@radix-ui/react-icons";
import ClientTimezoneDate from '../../components/ClientTimezoneDate';
import { recentDate } from '@/app/components/snippets';
import CommentDropDownBtn from './CommentDropDownBtn'
import { getServerSession } from 'next-auth';
import authOptions from '../../auth/authOptions';

type Author = {
  name: string | null;
  image: string | null;
};
type CommentWithAuthor = PrismaComment & {
  author: Author;
};
interface CommentCardProps {
  comment: CommentWithAuthor;
}

const CommentCard = async ({ comment }: CommentCardProps) => {
  const session = await getServerSession(authOptions)
  const dateObject = recentDate(comment.createdAt, comment.updatedAt)
  return (
    <Card className='pb-0 px-0 w-full'>
      <Flex direction='column' gap='2' className='px-3 pb-3'>
        <Flex justify='between'>
          <Flex gap='3' align='center' wrap='wrap'>
            <Avatar
              size='1'
              src={comment.author?.image ?? undefined}
              radius='full'
              fallback={<PersonIcon width="32" height="32" />}
            />
            <Text size='1' weight='bold'>{comment.author?.name}</Text>
            <Badge size='1' variant='surface' className='text-slate-300'>{dateObject.isUpdated && 'Edited: '}<ClientTimezoneDate date={dateObject.date} /></Badge>
          </Flex>
          {session && session.user?.id == comment.authorId && (
            <CommentDropDownBtn commentId={comment.id} />
          )}
        </Flex>
        <Flex direction='column' gap='1'>
          <Box>
            <Text size='2'> {comment.content}</Text>
          </Box>
        </Flex>
      </Flex>
    </Card>
  )
}

export default CommentCard