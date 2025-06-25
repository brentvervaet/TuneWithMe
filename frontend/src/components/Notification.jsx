import { Snackbar, Alert, Slide } from '@mui/material';

export default function CustomSnackbar({ open, onClose, message,error}) {
  return (
    <Snackbar 
      open={open} 
      autoHideDuration={6000} 
      onClose={onClose} 
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      TransitionComponent={Slide}
    >
      <Alert 
        onClose={onClose} 
        severity={error? 'error': 'success'} 
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}