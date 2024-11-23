'use client'
import { Button, Flex, Text, Skeleton } from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { commentSchema } from '../../components/validationSchema';
import { useRouter } from 'next/navigation';

const CommentForm = ({ postId }: { postId: string }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { status, data: session } = useSession();
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent) => {
    setIsSubmitting(true)
    setError('')
    event.preventDefault();

    if (!session) {
      toast.error('You are not logged in.');
      setIsSubmitting(false)
      return;
    }

    const validationResult = commentSchema.safeParse({ content: content });

    if (!validationResult.success) {
      let errorMessage = '';
      validationResult.error.issues.forEach((issue) => {
        errorMessage = errorMessage + issue.message + '. ';
      })
      toast.error('Failed to comment.')
      setError(errorMessage)
      setIsSubmitting(false)
      return;
    }

    if (!session.user) {
      toast.error('User error.')
      toast.error('Please logout & in again.')
      return
    }

    try {
      await axios.post('/api/comments', {
        content,
        postId
      });

      toast.success('Comment Created!')
      setContent('');
      setIsSubmitting(false)
      router.refresh();
    } catch (error) {
      console.error('Error:', error);
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage = axiosError.response?.data?.error || 'An unknown error occurred';
      const errorDetails = axiosError.response?.data?.details?.join(', ') || '';
      toast.error(`Error: ${errorMessage}${errorDetails ? ` - ${errorDetails}` : ''}`);
      setIsSubmitting(false)
    }
  }
  return (
    <Skeleton loading={status === 'loading'}>
      <div className=' max-w-[600px] w-full' style={{ display: 'block', width: '100%', maxWidth: '600px' }}>
        <Form.Root onSubmit={handleSubmit}>
          <Form.Field className='mb-2.5 grid max-w-[600px] w-full' name='content'>
            <div className='flex items-baseline justify-between'>
              <Form.Label className='text-[15px] font-medium leading-[35px]'>
                Comment
              </Form.Label>
              <Form.Message
                className='text-[13px] text-red-600  opacity-80'
                match='valueMissing'
              >
                Please enter content
              </Form.Message>
            </div>
            <Form.Control asChild>
              <textarea
                className='box-border inline-flex w-full h-[175px] md:h-[95px] leading-snug resize-none appearance-none items-center justify-center rounded bg-blackA2 p-2.5 text-[13px] leading-none shadow-[0_0_0_1px] shadow-gray-700 outline-none selection:bg-gray-400 selection:text-black hover:shadow-[0_0_0_1px_gray] focus:shadow-[0_0_0_1px_gray]'
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Control>
            <Form.Message className={`text-[12px] ${content.length > 280 ? 'text-red-600' : 'text-black-600'} opacity-90 justify-self-end pt-0.5`}>
              {content.length} / 280
            </Form.Message>
            {error && (
              <Form.Message className='text-[12px] text-red-600 pt-0.5'>
                <Text className='text-[13px] text-white opacity-90 pt-0.5'>Error: </Text>{error}
              </Form.Message>
            )}
          </Form.Field>
          <Form.Submit asChild>
            <Flex justify='end'>
              <Button disabled={isSubmitting} color={isSubmitting ? 'gray' : 'indigo'} className='w-full hover:cursor-pointer hover:underline underline-offset-2 max-w-[200px]'>
                Add Comment
              </Button>
            </Flex>

          </Form.Submit>
        </Form.Root>
      </div>
    </Skeleton>
  )
}

export default CommentForm