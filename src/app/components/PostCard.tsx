
interface PostCardProps {
  id: string;
  title: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
  authorName: string | null;
  authorImage: string | null;
}

const PostCard: React.FC<PostCardProps> = ({title, content, createdAt, updatedAt, authorName, authorImage}) => {
  const formattedCreatedAt = new Date(createdAt).toLocaleDateString();
  const formattedUpdatedAt = new Date(updatedAt).toLocaleDateString();

  return (
    <div style={{border: '1px solid white', padding: '15px'}}>
      <h4>Title: {title}</h4>
      <p>Content: {content}</p>
      <p>Created: {formattedCreatedAt}</p>
      <p>Updated: {formattedUpdatedAt}</p>
      <p>Author: {authorName}</p>
      <img style={{width: '50px'}} src={authorImage ?? undefined} alt={authorName ?? 'User Image'} />
    </div>
  )
}

export default PostCard