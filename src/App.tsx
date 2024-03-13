import { Box } from '@chakra-ui/react';
import { Route, Routes, Navigate } from 'react-router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Level from './pages/Level';
import Leaderboard from './pages/Leaderboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Box h='100dvh'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/level/:levelID' element={<Level />} />
        <Route path='/level/:levelID/scores' element={<Leaderboard />} />
        <Route path='/404' element={<NotFound />} />
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
