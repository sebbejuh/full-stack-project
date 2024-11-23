import { Comment as PrismaComment } from '@prisma/client';
import { Flex, Text, Card, Avatar, Badge, Box } from '@radix-ui/themes';
import { PersonIcon } from "@radix-ui/react-icons";
import ClientTimezoneDate from '../../components/ClientTimezoneDate';
import { recentDate } from '@/app/components/snippets';

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

const CommentCard = ({ comment }: CommentCardProps) => {
  const dateObject = recentDate(comment.createdAt, comment.updatedAt)
  return (
    <Card className='pb-0 px-0 w-full'>
      <Flex direction='column' gap='2' className='px-3 pb-3'>
        <Flex justify='between'>
          <Flex gap='3' align='center'>
            <Avatar
              size='1'
              src={comment.author?.image ?? undefined}
              radius='full'
              fallback={<PersonIcon width="32" height="32" />}
            />
            <Flex direction='row' gap='3' justify='center' align='center'>
              <Text size='1' weight='bold'>{comment.author?.name}</Text>
              <Badge size='1' variant='surface' className='text-slate-300'>{dateObject.isUpdated && 'Updated: '}<ClientTimezoneDate date={dateObject.date} /></Badge>
            </Flex>
          </Flex>
          {/* {session && session.user?.id == post.authorId && (
                <PostDropDownBtn postId={post.id} />
              )} */}
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