import { isAxiosError } from 'axios';
import { Alert, AlertTitle, Typography } from '@mui/material';

export default function Error({ error }) {
  if (isAxiosError(error)) {
    return (
      <Alert severity="error" data-cy="axios_error_message">
        <AlertTitle>Oops, something went wrong</AlertTitle>
        <Typography variant="body2">
          {error?.response?.data?.message || error.message}
        </Typography>
      </Alert>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>An unexpected error occurred</AlertTitle>
        <Typography variant="body2">
          {error.message || JSON.stringify(error)}
        </Typography>
      </Alert>
    );
  }

  return null;
}