import {
  Heading,
  Text,
  Container,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchLevelScores } from '../utils/API';
import Loading from '../components/Loading';

type Score = {
  _id: string;
  username: string;
  score: number;
  level: {
    _id: string;
    name: string;
  };
};

export default function Leaderboard() {
  const [scores, setScores] = useState<Score[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { levelID } = useParams() as { levelID: string };

  useEffect(() => {
    async function getScores() {
      try {
        const levelScores = await fetchLevelScores(levelID);
        setScores(levelScores);
        setError(null);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        setScores(null);
      } finally {
        setIsLoading(false);
      }
    }
    getScores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxW='1200px' p={{ base: 5, md: 10 }}>
      <Heading textAlign={'center'} mb='8'>
        Leaderboard
      </Heading>
      {isLoading && <Loading message='Loading Scores...' />}
      {error && <Text>{error}</Text>}
      {scores && scores.length === 0 ? (
        <Text textAlign='center' fontSize='20'>
          There are currently no scores for this level.
        </Text>
      ) : (
        <TableContainer>
          <Table variant='striped'>
            <Thead>
              <Tr>
                <Th>Rank</Th>
                <Th>Level</Th>
                <Th>Username</Th>
                <Th isNumeric>Score</Th>
              </Tr>
            </Thead>
            <Tbody>
              {scores?.map((score, index) => {
                return (
                  <Tr key={score._id}>
                    <Td>{index + 1}</Td>
                    <Td>{score.level.name}</Td>
                    <Td>{score.username}</Td>
                    <Td isNumeric>{`${score.score}s`}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
