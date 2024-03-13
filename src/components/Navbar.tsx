import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  Image,
  useColorMode,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import InfoModal from './InfoModal';
import { MoonIcon, SunIcon, InfoIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import WaldoSVG from '../assets/waldo.svg';

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('blue.100', 'red.800')} px={4} py={2}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Link to={'/'}>
            <Flex alignItems={'center'} justifyContent={'center'}>
              <Image src={WaldoSVG} boxSize={16} mr='1' />
              <Text fontSize={'24'} fontWeight={800}>
                Where's Waldo?
              </Text>
            </Flex>
          </Link>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={2}>
              <Button
                onClick={toggleColorMode}
                bg={useColorModeValue('blue.200', 'red.700')}
              >
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Button
                bg={useColorModeValue('blue.200', 'red.700')}
                onClick={onOpen}
              >
                <InfoIcon />
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <InfoModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
