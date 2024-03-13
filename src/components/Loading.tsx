import { Box, Heading, Spinner } from '@chakra-ui/react';

type Props = {
  message: string;
};

export default function Loading({ message }: Props) {
  return (
    <Box h='100vh' textAlign='center' mt='60px'>
      <Spinner size='xl' />
      <Heading as='h2' size='xl' mt={6} mb={2}>
        {message}
      </Heading>
    </Box>
  );
}
