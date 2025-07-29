// src/pages/Layout.jsx
import { CssBaseline } from '@mui/material';
import { grey, red, teal } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navbar from '../components/Navbar';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: teal[400],
    },
    secondary: {
      main: teal.A700,
    },
    background: {
      default: teal[50],

    },

    text: {
      primary: '#000000',
      secondary: '#555555',
      
    },
    divider: teal[400],
    error: {
      main: red[500], // Custom error color for light theme
    },

  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: teal.A700,
    },
    secondary: {
      main: teal[400],
    },
    background: {
      default: grey[900],
      paper: grey[900],
    },
    text: {
      primary: '#ffffff',
      secondary: '#bbbbbb',
    },
    divider: teal[700],
    error: {
      main: red[600], // Custom error color for light theme
    },

  },
});

export default function Layout() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(mediaQuery.matches);

    const handleChange = () => {
      setDarkMode(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const theme = darkMode ? darkTheme : lightTheme;

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='container-xl'>
        <Navbar darkMode={darkMode} onToggleTheme={handleThemeToggle} />
        <Outlet />
        <ScrollRestoration />
      </div>
    </ThemeProvider>
  );
}