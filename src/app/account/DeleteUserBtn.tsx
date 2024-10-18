'use client'
import { Button, AlertDialog, Flex } from '@radix-ui/themes';
import Spinner from '@/app/components/Spinner'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import Skeleton from '@/app/components/Skeleton';

const DeleteUserBtn = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const { status, data: session } = useSession();

  const deleteUser = async () => {
    if (!session || !session.user || session.user.id) {
      toast.error('You are not correctly logged in')
      return;
    }
    const userId = session.user.id
    try {
      setLoading(true);
      await axios.delete("/api/users/" + userId, {
        data: { userId }
      });
      toast.success('User Deleted!')
      router.push("/api/auth/signout");
      router.refresh();
      setLoading(false);
      setDeleted(true)
    } catch (error) {
      toast.error(`Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`)
      setLoading(false);
      setError(true);
    }
  };
  if (status === 'loading') return <Skeleton height='2rem' width='100%' />
  if (deleted)
    return (
      <>
      </>
    )
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color='red' className='hover:cursor-pointer' disabled={isLoading || error}>
            {isLoading ? <Spinner /> : 'Delete Account'}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to delete your user account and all of your data? <br />
            This action cannot be undone.
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray" className='hover:cursor-pointer'>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" disabled={isLoading} onClick={deleteUser} className='hover:cursor-pointer'>
                Delete Account
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This user cannot be deleted at this time.
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

export default DeleteUserBtn