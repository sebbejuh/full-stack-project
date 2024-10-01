import { Flex, Text, Card, Box, Avatar, Badge } from '@radix-ui/themes';
import { PersonIcon } from "@radix-ui/react-icons";

interface PostCardProps {
  id: string;
  title: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
  authorName: string | null;
  authorImage: string | null;
}

const PostCard: React.FC<PostCardProps> = ({ title, content, createdAt, updatedAt, authorName, authorImage }) => {
  const formattedCreatedAt = new Date(createdAt).toLocaleDateString();
  const formattedUpdatedAt = new Date(updatedAt).toLocaleDateString();

  return (
    <Box maxWidth='240px'>
      <Card>
        <Flex gap='3' align='center'>
          <Avatar
            size='3'
            src={authorImage ?? undefined}
            radius='full'
            fallback={<PersonIcon width="32" height="32" />}
          />
          <Text size='1' weight='bold'>{authorName}</Text>
        </Flex>
        <Flex gap='3' align='center'>
          <Text size='3' weight='medium'>{title}</Text>
        </Flex>
        <Box>
          <Text size='1'> {content}</Text>
          <br/>
          <Badge>Created: {formattedCreatedAt}</Badge>
          <br/>
          <Badge>Updated: {formattedUpdatedAt}</Badge>
        </Box>
      </Card>
    </Box>
  )
}

export default PostCard