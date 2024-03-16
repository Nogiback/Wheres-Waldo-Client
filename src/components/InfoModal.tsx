import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  useColorModeValue,
  Image,
  Flex,
  Box,
} from '@chakra-ui/react';
import WaldoPNG from '../assets/Waldo.png';
import WendaPNG from '../assets/Wenda.png';
import OdlawPNG from '../assets/Odlaw.png';
import WizardPNG from '../assets/Wizard.png';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function InfoModal({ isOpen, onClose }: Props) {
  const characters = [
    { name: 'Waldo', image: WaldoPNG },
    { name: 'Wenda', image: WendaPNG },
    { name: 'Odlaw', image: OdlawPNG },
    { name: 'Wizard', image: WizardPNG },
  ];

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent bg={useColorModeValue('blue.100', 'red.800')} p='4'>
        <ModalHeader>How to Play</ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign='center'>
          Your journey takes you across 3 strange and unique worlds. Each one is
          full of exciting quests for you to complete! Your goal is to find
          Waldo and his friends as fast as you can! After every quest, you can
          enter your name onto the leaderboards. The faster you are, the higher
          your rank will be. Can you be the fastest? With Wizard
          Whitebeard&apos;s tutoring and a little practice, you never know…
        </ModalBody>
        <ModalBody>
          <Flex alignContent='center' justifyContent='space-around'>
            {characters.map((character, index) => {
              return (
                <VStack key={index}>
                  <Image src={character.image} h='100px' />
                  <Box>{character.name}</Box>
                </VStack>
              );
            })}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
