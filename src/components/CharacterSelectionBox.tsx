import {
  Flex,
  Box,
  Button,
  useColorModeValue,
  Image,
  Text,
} from '@chakra-ui/react';
import WaldoPNG from '../assets/Waldo.png';
import WendaPNG from '../assets/Wenda.png';
import OdlawPNG from '../assets/Odlaw.png';
import WizardPNG from '../assets/Wizard.png';

type Props = {
  targetStyle: {
    left: string;
    top: string;
  };
  remainingCharacters: Character[];
  handleCharacterSelection: (selectedCharacter: string) => void;
};

type Character = {
  character: string;
  locationX: number;
  locationY: number;
};

type CharacterImageProps = {
  character: string;
};

function CharacterImage({ character }: CharacterImageProps) {
  let src;
  switch (character) {
    case 'Waldo':
      src = WaldoPNG;
      break;
    case 'Wenda':
      src = WendaPNG;
      break;
    case 'Odlaw':
      src = OdlawPNG;
      break;
    case 'Wizard':
      src = WizardPNG;
      break;
    default:
      src = 'No value';
  }

  return <Image src={src} boxSize='40px' alt={character} />;
}

export default function CharacterSelectionBox({
  targetStyle,
  remainingCharacters,
  handleCharacterSelection,
}: Props) {
  return (
    <Flex
      style={targetStyle}
      direction='column'
      alignItems='center'
      position='absolute'
      width='60px'
      gap='2'
      zIndex='1'
    >
      <Box
        width='60px'
        height='60px'
        borderColor='red.600'
        borderWidth='5px'
        borderRadius='full'
      ></Box>
      <Flex
        direction='column'
        bgColor={useColorModeValue('blue.200', 'red.800')}
        p='2'
        gap='2'
        borderRadius='lg'
      >
        {remainingCharacters &&
          remainingCharacters.map((character) => (
            <Button
              p='6'
              size='md'
              key={character.character}
              onClick={() => handleCharacterSelection(character.character)}
            >
              <Flex gap='2' justifyContent='center' alignItems='center'>
                <CharacterImage character={character.character} />
                <Text>{character.character}</Text>
              </Flex>
            </Button>
          ))}
      </Flex>
    </Flex>
  );
}
