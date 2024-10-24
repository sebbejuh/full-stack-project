import { Flex, Text, Card, Box, Avatar, Badge } from '@radix-ui/themes';
import { PersonIcon } from "@radix-ui/react-icons";
import { Post as PrismaPost } from '@prisma/client';
import ClientTimezoneDate from '../components/ClientTimezoneDate';
import DeletePostBtn from './DeletePostBtn';
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";

type Author = {
  name: string | null;
  image: string | null;
};
type PostWithAuthor = PrismaPost & {
  author: Author | null;
};
interface PostCardProps {
  post: PostWithAuthor;
}

const PostCard: React.FC<PostCardProps> = async ({ post }) => {
  const { id, title, content, createdAt, updatedAt, author, authorId } = post;
  const session = await getServerSession(authOptions)
  const isSameDate = new Date(createdAt).getTime() === new Date(updatedAt).getTime();
  const mostRecentDate = isSameDate ? createdAt : (new Date(updatedAt).getTime() > new Date(createdAt).getTime() ? updatedAt : createdAt);
  const isUpdated = !isSameDate && new Date(updatedAt).getTime() > new Date(createdAt).getTime();

  return (
    <Box width='100%' maxWidth='600px'>
      <Card>
        <Flex direction='column' gap='2'>
          <Flex justify='between'>
            <Flex gap='3' align='center'>
              <Avatar
                size='3'
                src={author?.image ?? undefined}
                radius='full'
                fallback={<PersonIcon width="32" height="32" />}
              />
              <Flex direction='column' gap='1'>
                <Text size='2' weight='bold'>{author?.name}</Text>
                <Flex>
                  <Badge >{isUpdated && 'Updated at'}<ClientTimezoneDate date={mostRecentDate} /></Badge>
                </Flex>
              </Flex>
            </Flex>
            {session && session.user?.id == authorId && (
              <DeletePostBtn postId={id} />
            )}
          </Flex>
          <Flex direction='column' gap='1'>
            <Flex align='center'>
              <Text size='3' weight='medium'>{title}</Text>
            </Flex>
            <Box>
              <Text size='2'> {content}</Text>
            </Box>
          </Flex>
        </Flex>
      </Card>
    </Box>
  )
}

export default PostCard