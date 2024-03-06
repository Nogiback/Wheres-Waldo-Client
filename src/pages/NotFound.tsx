import { Container, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Container
      justifyContent={'center'}
      centerContent
      h='100vh'
      textAlign='center'
    >
      <Heading
        display='inline-block'
        as='h2'
        size='4xl'
        bgColor='red.700'
        backgroundClip='text'
      >
        404
      </Heading>
      <Text fontSize='18px' mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={'gray.500'} mb={6}>
        The page you&apos;re looking for does not seem to exist
      </Text>

      <Button as={Link} to='/' bgColor='blue.700' color='white' variant='solid'>
        Go to Home
      </Button>
    </Container>
  );
}
