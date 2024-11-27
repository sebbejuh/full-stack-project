'use client'
import { Flex, Text, Box, Skeleton, Button } from '@radix-ui/themes';
import { Post } from '@prisma/client';
import * as Form from '@radix-ui/react-form';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { postSchema } from '../../components/validationSchema';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

interface EditPostProps {
  post: Post;
}

const EditPostForm = ({ post }: EditPostProps) => {
  const { status, data: session } = useSession();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    setIsSubmitting(true)
    setError('')
    event.preventDefault();

    if (!session) {
      toast.error('You are not logged in.');
      setIsSubmitting(false)
      return;
    }

    const validationResult = postSchema.safeParse({ title: title, content: content });

    if (!validationResult.success) {
      let errorMessage = '';
      validationResult.error.issues.forEach((issue) => {
        errorMessage = errorMessage + issue.message + '. ';
      })

      console.log(errorMessage)
      toast.error('Failed to edit post.')
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
      await axios.patch('/api/posts/' + post.id, {
        title,
        content
      });

      toast.success('Post Edited!')
      setTitle('');
      setContent('');
      setIsSubmitting(false)
      router.push('/posts/' + post.id);
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
      <Form.Root onSubmit={handleSubmit}>
        <Flex direction='column' gap='1'>
          <Flex align='center'>
            <Form.Field className='grid max-w-[600px] w-full' name='title'>
              <div className='flex items-baseline justify-between'>
                <Form.Message
                  className='text-[13px] text-red-600  opacity-80'
                  match='valueMissing'
                >
                  Please enter a title
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  className='box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded bg-blackA2 px-2.5 text-[12px] leading-none shadow-[0_0_0_1px] shadow-gray-700 outline-none selection:bg-gray-400 selection:text-black hover:shadow-[0_0_0_1px_gray] focus:shadow-[0_0_0_1px_gray]'
                  type='text'
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Control>
              <Form.Message className={`text-[12px] ${title.length > 60 ? 'text-red-600' : 'text-black-600'} opacity-90 justify-self-end pt-0.5`}>
                {title.length} / 60
              </Form.Message>
            </Form.Field>
          </Flex>
          <Box>
            <Form.Field className='mb-2.5 grid max-w-[600px] w-full' name='content'>
              <div className='flex items-baseline justify-between'>
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
          </Box>
        </Flex>
        <Form.Submit asChild>
          <Flex justify='end'>
            <Button disabled={isSubmitting} color={isSubmitting ? 'gray' : 'indigo'} className='w-full hover:cursor-pointer hover:underline underline-offset-2 max-w-[200px]'>
              Edit Post
            </Button>
          </Flex>
        </Form.Submit>
      </Form.Root>
    </Skeleton>
  )
}

export default EditPostForm