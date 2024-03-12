import { Container, SimpleGrid } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { fetchLevels } from '../utils/API';
import LevelCard from '../components/LevelCard';
import BeachLevel from '../assets/WaldoBeach.jpg';
import SkiLevel from '../assets/WaldoSkiHill.jpg';
import SpaceLevel from '../assets/WaldoSpace.jpg';

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
    getLevels();
  }, []);

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

  return (
    <Container maxW='1600px' p={{ base: 5, md: 10 }}>
      {/* Add Loading Section */}
      {/* Add Error section */}
      <SimpleGrid columns={[1, 2, 3]} minChildWidth='300px' gap='8' mb='72px'>
        <LevelCard image={BeachLevel} name={'Beach'} />
        <LevelCard image={SkiLevel} name={'Ski Hill'} />
        <LevelCard image={SpaceLevel} name={'Space'} />
      </SimpleGrid>
    </Container>
  );
}
