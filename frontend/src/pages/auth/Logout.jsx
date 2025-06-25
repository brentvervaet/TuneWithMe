import { useEffect } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import { useAuth } from '../../contexts/auth';

export default function Logout() {
  const { isAuthed, logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  if (isAuthed) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Typography variant="h4" component="h1">
            Logging out...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          You were successfully logged out!
        </Typography>
        <Box mt={2}>
          {isAuthed ? null : (
            <Button
              variant="text"
              component={NavLink}
              to="/login"
              endIcon={<LoginIcon />}
            >
              Log back in
            </Button>
          )}
      
          <Button variant="text" component={NavLink} to="/register">
            or register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}