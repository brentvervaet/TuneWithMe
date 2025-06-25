import { useParams, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { useCallback,useState } from 'react';
import AsyncData from '../../components/AsyncData';
import { getById , deleteById,getTuningsByInstrumentId} from '../../api/index';
import InstrumentTuningsTable from '../../components/instruments/InstrumentTuningsTable';
import { Container, Typography, Paper, Box, Button, Stack } from '@mui/material';
import Notification from '../../components/Notification';
import { useAuth } from '../../contexts/auth';

const InstrumentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const {user, isAuthed} = useAuth();
  const isAdmin = user?.roles?.includes(('admin'));
  const userId = user?.id;

  const { 
    data: instrument,
    error: instrumentError,
    isLoading: instrumentIsLoading, 
  } = useSWR(id ? `instruments/${id}` : null, getById);

  const {
    data: instrumentTunings = [],
    error: instrumentTuningsError,
    isLoading: instrumentTuningsIsLoading,
  } = useSWR(id ? `instruments/${id}/tunings` : null, getTuningsByInstrumentId);

  const { trigger: deleteTuning, error: deleteError } = useSWRMutation(
    `instruments/${id}/tunings`,
    deleteById,
  );

  const handleDeleteTuning = useCallback(async (id) => {
    await deleteTuning(id);
    setShowAlert(true);  
    setAlertMessage('Instrument deleted successfully');
  },[deleteTuning]);

  //Handle alert close
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowAlert(false);
  };

  if (!instrument) {
    return (
      <Box mt={3} textAlign="center">
        <Typography variant="h3" component="h1" gutterBottom>
          No instrument found
        </Typography>
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <Typography variant="body1">
            No instrument found with id:
          </Typography>
          <Typography ml={1} color='secondary' variant="body1">
            {id}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Container>
      <Paper  sx={{ padding: 2, marginTop: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {instrument.name}
        </Typography>

        <Box display={'flex'}>
          <Typography mr={1} color='primary' fontWeight={'bold'} variant="body1">
            Type:
          </Typography>
          <Typography>
            {instrument.type}
          </Typography>
        </Box>

        <Box display={'flex'}>
          <Typography mr={1} color='primary' fontWeight={'bold'} variant="body1">
            Number of Notes:
          </Typography>
          <Typography>
            {instrument.nrOfNotes}
          </Typography>
        </Box>

        <Box display={'flex'}>
          <Typography mr={1} color='primary' fontWeight={'bold'} variant="body1">
            Description:
          </Typography>
          <Typography>
            {instrument.description}
          </Typography>
        </Box>

        {/* Instrument Tunings Table */}
       
        <Box mt={2} mb={2}>
          <AsyncData 
            loading={instrumentIsLoading||instrumentTuningsIsLoading} 
            error={instrumentError||instrumentTuningsError|| deleteError}>
            {!instrumentTuningsError ? (
              <InstrumentTuningsTable 
                instrumentTunings={instrumentTunings} 
                onDelete={handleDeleteTuning}/>): null
            }
          </AsyncData>
        </Box>

        <Box>
          <Stack spacing={1} direction={'row'}>
            {isAuthed && (isAdmin || userId === instrument.user_id) && (
              <Button variant="outlined" color="primary" onClick={() => navigate(`/instruments/edit/${id}`)}>
                Edit
              </Button>)}
            <Button variant="contained" color="secondary" >
              Add Tuning
            </Button>
          </Stack>
        </Box>
      </Paper>
      <Notification 
        open={showAlert} 
        onClose={handleCloseAlert} 
        message={alertMessage} 
      />
    </Container>
    
  );
};

export default InstrumentDetail;

