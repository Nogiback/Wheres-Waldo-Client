import { Container, SimpleGrid } from '@chakra-ui/react';
import LevelCard from '../components/LevelCard';
import BeachLevel from '../assets/WaldoBeach.jpg';
import SkiLevel from '../assets/WaldoSkiHill.jpg';
import SpaceLevel from '../assets/WaldoSpace.jpg';

export default function Home() {
  return (
    <Container maxW='1600px' p={{ base: 5, md: 10 }} m='auto'>
      <SimpleGrid columns={[1, 2, 3]} spacing='auto'>
        <LevelCard image={BeachLevel} name={'Beach'} />
        <LevelCard image={SkiLevel} name={'Ski Level'} />
        <LevelCard image={SpaceLevel} name={'Space'} />
      </SimpleGrid>
    </Container>
  );
}
