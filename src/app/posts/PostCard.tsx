import { Flex, Text, Card, Box, Avatar, Badge } from '@radix-ui/themes';
import { PersonIcon } from "@radix-ui/react-icons";
import { Post as PrismaPost } from '@prisma/client';

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

const PostCard: React.FC<PostCardProps> = ({ post }) => {

  const { title, content, createdAt, updatedAt, author } = post;
  const formattedCreatedAt = new Date(createdAt).toLocaleDateString();
  const formattedUpdatedAt = new Date(updatedAt).toLocaleDateString();

  return (
    <Box width='100%' maxWidth='600px'>
      <Card>
        <Flex direction='column' gap='2'>
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
                <Badge highContrast >{formattedCreatedAt}</Badge>
                <Badge>Updated: {formattedUpdatedAt}</Badge>
              </Flex>
            </Flex>
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