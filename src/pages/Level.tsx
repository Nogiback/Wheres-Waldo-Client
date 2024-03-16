import { Container, Image, Text, Box, useDisclosure } from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchGametime, fetchLevel, addLevelScore } from '../utils/API';
import Loading from '../components/Loading';
import CharacterSelectionBox from '../components/CharacterSelectionBox';
import HighScoreModal from '../components/HighScoreModal';

type Level = {
  _id: string;
  name: string;
  characters: object[];
  dimensions: {
    width: number;
    height: number;
  };
  scores: string[];
  imageURL: string;
};

type Character = {
  character: string;
  locationX: number;
  locationY: number;
};

export default function Level() {
  const [level, setLevel] = useState<Level | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [remainingCharacters, setRemainingCharacters] = useState<Character[]>(
    [],
  );
  const [foundCharacters, setFoundCharacters] = useState<Character[]>([]);
  const [showTarget, setShowTarget] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [targetBoundaries, setTargetBoundaries] = useState({
    minX: 0,
    minY: 0,
    maxX: 0,
    maxY: 0,
  });
  const [currentDimensions, setCurrentDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [gametime, setGametime] = useState(0);
  const [username, setUsername] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { levelID } = useParams() as { levelID: string };
  const imageRef = useRef<HTMLImageElement | null>(null);
  const nav = useNavigate();
  const targetStyle = {
    left: `${targetBoundaries.minX}px`,
    top: `${targetBoundaries.minY}px`,
  };

  useEffect(() => {
    async function getLevel() {
      try {
        const levelData = await fetchLevel(levelID);
        setLevel(levelData);
        setCharacters(levelData.characters);
        setRemainingCharacters(levelData.characters);
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

  useEffect(() => {
    async function getGametime() {
      try {
        const res = await fetchGametime(levelID);
        console.log(res);
        setGametime(res.gametime);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        setLevel(null);
      }
    }

    if (
      foundCharacters.length > 0 &&
      foundCharacters.length === characters?.length
    ) {
      getGametime();
      onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foundCharacters]);

  useEffect(() => {
    const remainingChars =
      characters &&
      characters.filter((character) => {
        return !foundCharacters.some(
          (foundCharacter) => foundCharacter.character === character.character,
        );
      });
    setRemainingCharacters(remainingChars);
  }, [characters, foundCharacters]);

  function handleLevelClick(e: React.MouseEvent) {
    const image = imageRef.current;
    const boundingBox = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - boundingBox.left;
    const y = e.clientY - boundingBox.top;
    setCurrentDimensions({ width: image!.width, height: image!.height });
    setTargetPosition({ x, y });
    setTargetBoundaries({
      minX: x - 30,
      minY: y - 30,
      maxX: x + 30,
      maxY: y + 30,
    });
    setShowTarget(true);
  }

  function handleCharacterSelection(selectedCharacter: string) {
    setShowTarget(false);
    const characterDetails = characters?.find(
      (character) => character.character === selectedCharacter,
    );
    const isAlreadyFound = foundCharacters.find(
      (character) => character.character === selectedCharacter,
    );

    if (isAlreadyFound) {
      return;
    } else {
      const widthScaleFactor =
        currentDimensions.width / level!.dimensions.width;
      const heightScaleFactor =
        currentDimensions.height / level!.dimensions.height;
      const normalizedCharacterX =
        characterDetails!.locationX * widthScaleFactor;
      const normalizedCharacterY =
        characterDetails!.locationY * heightScaleFactor;

      if (
        targetBoundaries.minX < normalizedCharacterX &&
        targetBoundaries.maxX > normalizedCharacterX &&
        targetBoundaries.minY < normalizedCharacterY &&
        targetBoundaries.maxY > normalizedCharacterY
      ) {
        setFoundCharacters((foundCharacters) => [
          ...foundCharacters,
          {
            character: selectedCharacter,
            locationX: targetPosition.x,
            locationY: targetPosition.y,
          },
        ]);
      } else {
        return;
      }
    }
  }

  async function submitScore(e: React.FormEvent) {
    e.preventDefault();
    const scoreDetails = {
      username: username,
      score: gametime,
      level: levelID,
    };

    try {
      const res = await addLevelScore(levelID, scoreDetails);
      console.log(res);
      setError(null);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      setLevel(null);
    }
    onClose();
    nav(`/level/${levelID}/scores`);
  }

  return (
    <Container maxWidth='1600px' p='5'>
      {isLoading && <Loading message='Loading Level...' />}
      {error && <Text>{error}</Text>}
      <Container maxWidth='1600px' position='relative' p='0'>
        <Image
          ref={imageRef}
          src={level?.imageURL}
          mb='72px'
          onClick={handleLevelClick}
        />
        {showTarget && (
          <CharacterSelectionBox
            targetStyle={targetStyle}
            remainingCharacters={remainingCharacters}
            handleCharacterSelection={handleCharacterSelection}
          />
        )}
        {foundCharacters.map((character) => (
          <Box
            width='60px'
            height='60px'
            borderColor='green.400'
            borderWidth='5px'
            borderRadius='full'
            position='absolute'
            key={character.character}
            style={{
              left: `${character.locationX - 30}px`,
              top: `${character.locationY - 30}px`,
            }}
          ></Box>
        ))}
      </Container>
      <HighScoreModal
        isOpen={isOpen}
        onClose={onClose}
        username={username}
        setUsername={setUsername}
        gametime={gametime}
        submitScore={submitScore}
      />
    </Container>
  );
}
