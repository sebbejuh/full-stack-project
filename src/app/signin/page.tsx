import GoogleSignInBtn from "./GoogleSignInBtn"
import { Flex, Text, Card, Heading } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import authOptions from '../auth/authOptions';
import { redirect } from 'next/navigation';

const SignInPage = async () => {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect('/');
  }
  return (
    <>
      <Flex direction='column' align='center' gap='5'>
        <Heading as='h1' size='6'> Sign In </Heading>
        <Card className=' max-w-[600px] w-full' style={{ display: 'block', width: '100%', maxWidth: '600px' }}>
          <Flex direction='column' gap='4'>
            <Card>
              <Flex direction='column' gap='1' justify='center' align='center'>
                <Text size='1'>By signing in with Google you allow us to save user details from your Google account, such as: your Name, Email and a link to your profile picture.</Text>
                <Text size='1'>You can always choose to delete these saved user details together with any data related to your account by going to your account page after signing in.</Text>
                <Text size='3' color='red'>Currently only approved users can sign in to this site.</Text>
              </Flex>
            </Card>
            <Flex>
              <GoogleSignInBtn />
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </>
  )
}

export default SignInPage