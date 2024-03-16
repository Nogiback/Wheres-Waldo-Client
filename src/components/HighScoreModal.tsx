import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  HStack,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  setUsername: (username: string) => void;
  gametime: number;
  submitScore: (e: React.FormEvent) => Promise<void>;
};

export default function HighScoreModal({
  isOpen,
  onClose,
  username,
  setUsername,
  gametime,
  submitScore,
}: Props) {
  const nav = useNavigate();

  function handleRestart() {
    window.location.reload();
  }

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bg={useColorModeValue('blue.100', 'red.800')}>
        <ModalHeader alignContent='center' fontSize='24'>
          Congratulations!
        </ModalHeader>
        <ModalBody textAlign={'center'} fontSize='18' fontWeight='800'>
          {`You found all the characters in ${gametime} seconds!`}
        </ModalBody>
        <ModalBody textAlign={'center'}>
          Enter your username below to join the leaderboard!
        </ModalBody>
        <ModalBody textAlign={'center'}>
          <form onSubmit={submitScore}>
            <FormControl isRequired mb='6'>
              <FormLabel>Username</FormLabel>
              <Input
                bg='white'
                color='black'
                name='username'
                value={username}
                type='text'
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <HStack alignItems={'center'} justifyContent={'center'} mb='6'>
              <Button
                bg={useColorModeValue('red.700', 'blue.800')}
                color={'white'}
                _hover={{
                  bg: 'blue.300',
                }}
                onClick={() => nav('/')}
              >
                Home
              </Button>
              <Button
                bg={useColorModeValue('red.700', 'blue.800')}
                color={'white'}
                _hover={{
                  bg: 'blue.300',
                }}
                onClick={handleRestart}
              >
                Restart
              </Button>
              <Button
                type='submit'
                bg={useColorModeValue('red.700', 'blue.800')}
                color={'white'}
                _hover={{
                  bg: 'blue.300',
                }}
              >
                Submit
              </Button>
            </HStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
