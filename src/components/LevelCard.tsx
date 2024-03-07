import {
  Heading,
  Box,
  Stack,
  Image,
  Container,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

type Props = {
  image: string;
  name: string;
};

export default function LevelCard({ image, name }: Props) {
  return (
    <Container p={{ base: 2, md: 5 }}>
      <Box
        borderWidth='1px'
        _hover={{ shadow: 'lg' }}
        rounded='md'
        overflow='hidden'
        bg={useColorModeValue('white', 'gray.800')}
      >
        <Image src={image} objectFit='cover' w='100%' />
        <Box p={{ base: 3, sm: 5 }}>
          <Box mb={6}>
            <Heading
              fontSize={{ base: 'lg', sm: 'xl' }}
              fontWeight='bold'
              lineHeight='1.2'
              mb={2}
              textAlign={'center'}
            >
              {name}
            </Heading>
          </Box>
          <Stack
            justifyContent='space-between'
            direction={{ base: 'column', sm: 'row' }}
            spacing={{ base: 2, sm: 0 }}
          >
            <Button variant='outline'>Leaderboards</Button>
            <Button colorScheme='red' variant='solid'>
              Play
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
