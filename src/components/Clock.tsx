import { Container, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

type Props = {
  isRunning: boolean;
};

export default function Clock({ isRunning }: Props) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId: number;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  return (
    <Container>
      <Text textAlign={'center'} fontSize={'64'}>
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}:
        {milliseconds.toString().padStart(2, '0')}
      </Text>
    </Container>
  );
}
