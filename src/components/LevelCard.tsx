import {
  Heading,
  Box,
  Stack,
  Image,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

type Level = {
  _id: string;
  name: string;
  characters: object[];
  dimensions: object;
  scores: string[];
  imageURL: string;
};

type Props = {
  level: Level;
};

export default function LevelCard({ level }: Props) {
  return (
    <Box
      borderWidth='1px'
      _hover={{ shadow: '2xl' }}
      rounded='md'
      overflow='hidden'
      boxShadow='xl'
      bg={useColorModeValue('white', 'gray.800')}
    >
      <Image src={level.imageURL} objectFit='cover' w='100%' />
      <Box p={{ base: 3, sm: 5 }}>
        <Box mb={6}>
          <Heading
            fontSize={{ base: 'lg', sm: 'xl' }}
            fontWeight='bold'
            lineHeight='1.2'
            mb={2}
            textAlign={'center'}
          >
            {level.name}
          </Heading>
        </Box>
        <Stack
          justifyContent='space-between'
          direction={{ base: 'column', sm: 'row' }}
          spacing={{ base: 2, sm: 0 }}
        >
          <Button as={Link} to={`/level/${level._id}/scores`} variant='outline'>
            Leaderboards
          </Button>
          <Button
            as={Link}
            to={`/level/${level._id}`}
            colorScheme='red'
            variant='solid'
          >
            Play
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
