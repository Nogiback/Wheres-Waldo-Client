import {
  Box,
  Button,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Icon,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { ReactNode } from 'react';

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <Button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      cursor={'pointer'}
      as={'a'}
      href={href}
      target='_blank'
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('blue.100', 'red.800')}
      color={useColorModeValue('gray.700', 'gray.200')}
      position='fixed'
      bottom='0'
      w='full'
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction='row'
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>© 2024 Nogiback. All rights reserved</Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'Github'} href={'https://github.com/Nogiback'}>
            <Icon as={FaGithub} boxSize={6} />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
