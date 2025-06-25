// src/components/PrivateRoute.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import { Container, Box, Typography, CircularProgress } from '@mui/material';

export default function PrivateRoute() {
  const { ready, isAuthed } = useAuth();
  const { pathname } = useLocation();

  if (!ready) {
    return (
      <Container>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
          <Typography variant="h4" component="h1" gutterBottom>
            Loading...
          </Typography>
          <Typography variant="body1">
            Please wait while we are checking your credentials and loading the application.
          </Typography>
        </Box>
      </Container>
    );
  }

  if (isAuthed) {
    return <Outlet />;
  }

  return <Navigate replace to={`/login?redirect=${pathname}`} />;
}