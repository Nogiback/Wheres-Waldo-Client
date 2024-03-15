import { Container, SimpleGrid, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { fetchLevels } from '../utils/API';
import LevelCard from '../components/LevelCard';
import Loading from '../components/Loading';

type Level = {
  _id: string;
  name: string;
  characters: object[];
  dimensions: object;
  scores: string[];
  imageURL: string;
};

export default function Home() {
  const [levels, setLevels] = useState<Level[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getLevels() {
      try {
        const allLevels = await fetchLevels();
        setLevels(allLevels);
        setError(null);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        setLevels(null);
      } finally {
        setIsLoading(false);
      }
    }
    getLevels();
  }, []);

  return (
    <Container maxW='1600px' p={{ base: 5, md: 10 }}>
      {isLoading && <Loading message='Loading Levels...' />}
      {error && <Text>{error}</Text>}
      {levels && (
        <SimpleGrid columns={[1, 2, 3]} minChildWidth='300px' gap='8' mb='72px'>
          {levels.map((level) => {
            return <LevelCard key={level._id} level={level} />;
          })}
        </SimpleGrid>
      )}
    </Container>
  );
}
