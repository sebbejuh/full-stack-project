'use client'
import { IoTrashBinOutline } from "react-icons/io5";
import { IconButton, AlertDialog, Flex, Button } from '@radix-ui/themes';
import Spinner from '@/app/components/Spinner'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from 'react-hot-toast';

const DeletePostBtn = ({ postId }: { postId: string }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const deletePost = async () => {
    try {
      setLoading(true);
      await axios.delete("/api/posts/" + postId, {
        data: { postId }
      });
      toast.success('Post Deleted!')
      setLoading(false);
      router.push("/posts");
      router.refresh();
    } catch (error) {
      toast.error(`Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`)
      setLoading(false);
      setError(true);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <IconButton variant="soft" color='red' size='1' className='hover:cursor-pointer'>
            {isLoading ? <Spinner /> : <IoTrashBinOutline />}
          </IconButton>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to delete this post? This action cannot be
            undone.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray" className='hover:cursor-pointer'>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" disabled={isLoading} onClick={deletePost} className='hover:cursor-pointer'>
                Delete Post
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This post cannot be deleted.
          </AlertDialog.Description>
          <Button
            color="gray"
            variant="soft"
            mt="2"
            onClick={() => setError(false)}
          >
            Ok
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default DeletePostBtn