import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function InfoModal({ isOpen, onClose }: Props) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent bg={useColorModeValue('blue.100', 'red.800')}>
        <ModalHeader>How to Play</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Your journey takes you across 3 strange and unique worlds. Each one is
          full of exciting quests for you to complete! Your goal is to find
          Waldo and his friends as fast as you can! After every quest, you can
          enter your name onto the leaderboards. The faster you are, the higher
          your rank will be. Can you be the fastest? With Wizard
          Whitebeard&apos;s tutoring and a little practice, you never know…
        </ModalBody>
        <ModalFooter gap='3'>
          <Button
            bg={useColorModeValue('red.700', 'blue.800')}
            color={'white'}
            _hover={{
              bg: 'blue.300',
            }}
            onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
