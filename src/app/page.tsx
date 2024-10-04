import { Flex, Text} from '@radix-ui/themes';
import { getServerSession } from "next-auth";
import authOptions from "./auth/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <Flex direction='column' align='center' justify='center'>
      <Text weight='medium' size='5'>Home</Text>
      <Text>Welcome {session?.user?.email}</Text>
    </Flex>
  );
}
