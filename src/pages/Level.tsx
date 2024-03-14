import { Container, Image, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Loading from '../components/Loading';
import { fetchLevel } from '../utils/API';

type Level = {
  _id: string;
  name: string;
  characters: object[];
  dimensions: object;
  scores: string[];
  imageURL: string;
};

export default function Level() {
  const [level, setLevel] = useState<Level | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { levelID } = useParams() as { levelID: string };

  useEffect(() => {
    async function getLevel() {
      try {
        const levelData = await fetchLevel(levelID);
        setLevel(levelData);
        setError(null);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        setLevel(null);
      } finally {
        setIsLoading(false);
      }
    }
    getLevel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth='1600px' p={{ base: 5, md: 10 }}>
      {isLoading && <Loading message='Loading Scores...' />}
      {error && <Text>{error}</Text>}
      <Image src={level?.imageURL} mb='72px' />
    </Container>
  );
}
