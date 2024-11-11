'use client'
import { AlertDialog, Flex, Button, Skeleton, DropdownMenu, Text } from '@radix-ui/themes';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

const DeletePostBtn = ({ postId }: { postId: string }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const { status, } = useSession();

  const deletePost = async () => {
    try {
      setLoading(true);
      await axios.delete("/api/posts/" + postId, {
        data: { postId }
      });
      toast.success('Post Deleted!')
      router.push("/posts");
      router.refresh();
      setLoading(false);
      setDeleted(true)
    } catch (error) {
      toast.error(`Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`)
      setLoading(false);
      setError(true);
    }
  };
  if (deleted)
    return (
      <>
      </>
    )
  return (
    <>
      <AlertDialog.Root>
        <DropdownMenu.Root>
          <Skeleton loading={status === 'loading'}>
            <DropdownMenu.Trigger>
              <Button size='2' variant="soft" className='cursor-pointer'>
                <DropdownMenu.TriggerIcon />
              </Button>
            </DropdownMenu.Trigger>
          </Skeleton >
          <DropdownMenu.Content>
            <DropdownMenu.Item color="red">
              <AlertDialog.Trigger>
                <Text className='cursor-pointer'>Delete</Text>
              </AlertDialog.Trigger>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
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
              <Button variant="solid" color="tomato" disabled={isLoading} onClick={deletePost} className='hover:cursor-pointer'>
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