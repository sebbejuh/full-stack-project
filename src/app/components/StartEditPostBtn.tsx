'use client'
import { useRouter, useSearchParams } from "next/navigation";

const StartEditPostBtn = ({ postId }: { postId: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleShowSort = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page')
    params.set('editPost', 'true');
    router.push(`/posts/${postId}?${params.toString()}`);
  };

  return (
    <button onClick={handleShowSort} >Edit</button>
  )
}

export default StartEditPostBtn