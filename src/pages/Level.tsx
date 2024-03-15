import { Container, Image, Text, Button, Flex, Box } from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { fetchLevel } from '../utils/API';
import Loading from '../components/Loading';
import Clock from '../components/Clock';

type Level = {
  _id: string;
  name: string;
  characters: object[];
  dimensions: object;
  scores: string[];
  imageURL: string;
};

type Dimensions = {
  width: number | undefined;
  height: number | undefined;
};

export default function Level() {
  const [level, setLevel] = useState<Level | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTarget, setShowTarget] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [targetBoundaries, setTargetBoundaries] = useState({
    minX: 0,
    minY: 0,
    maxX: 0,
    maxY: 0,
  });
  const [isRunning, setIsRunning] = useState(false); // remember to set to true
  const [currentDimensions, setCurrentDimensions] = useState<Dimensions | null>(
    null,
  );
  const { levelID } = useParams() as { levelID: string };
  const imageRef = useRef<HTMLImageElement | null>(null);
  const targetStyle = {
    left: `${targetBoundaries.minX}px`,
    top: `${targetBoundaries.minY}px`,
  };

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

  function handleLevelClick(e: React.MouseEvent) {
    const image = imageRef.current;
    const boundingBox = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - boundingBox.left;
    const y = e.clientY - boundingBox.top;
    setCurrentDimensions({ width: image?.width, height: image?.height });
    setTargetPosition({ x, y });
    setTargetBoundaries({
      minX: x - 30,
      minY: y - 30,
      maxX: x + 30,
      maxY: y + 30,
    });
    setShowTarget(true);
  }

  return (
    <Container maxWidth='1600px' p='5'>
      {isLoading && <Loading message='Loading Scores...' />}
      {error && <Text>{error}</Text>}
      <Clock isRunning={isRunning} />
      <Button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Stop' : 'Start'}
      </Button>
      <Container maxWidth='1600px' position='relative' p='0'>
        <Image
          ref={imageRef}
          src={level?.imageURL}
          mb='72px'
          onClick={handleLevelClick}
        />
        {showTarget && (
          <Flex
            style={targetStyle}
            direction={'column'}
            alignItems={'center'}
            position={'absolute'}
            width={'60px'}
          >
            <Box
              width='60px'
              height='60px'
              borderColor={'red.600'}
              borderWidth={'5px'}
              borderRadius={'full'}
            ></Box>
          </Flex>
        )}
      </Container>
    </Container>
  );
}
