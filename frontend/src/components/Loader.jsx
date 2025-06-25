// src/components/Loader.jsx
import { Box, CircularProgress, Typography } from '@mui/material';

export default function Loader() {
  return (
    <Box
      data-cy="loader"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="50vh"
    >
      <CircularProgress />
      <Typography variant="srOnly">Loading...</Typography>
    </Box>
  );
}