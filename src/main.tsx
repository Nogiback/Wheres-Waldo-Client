import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/roboto';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';
import { BrowserRouter } from 'react-router-dom';

const colors = {
  red: {
    100: '#ffd2d1',
    200: '#fba4a1',
    300: '#f6726d',
    400: '#f24842',
    500: '#f02e27',
    600: '#f01e18',
    700: '#d60f0c',
    800: '#c00609',
    900: '#a70004',
  },
  blue: {
    100: '#cdf1ff',
    200: '#9ce1ff',
    300: '#68d0fd',
    400: '#41c1fc',
    500: '#2bb8fb',
    600: '#1ab4fd',
    700: '#019de2',
    800: '#008ccb',
    900: '#0079b4',
  },
};

const fonts = {
  fonts: {
    heading: `'Roboto', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
};

const theme = extendTheme({ colors, fonts });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
