import { Container, Typography, Box, Divider } from '@mui/material';

import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import {save, getById} from '../../api/index';
import InstrumentForm from '../../components/instruments/InstrumentForm';
import AsyncData from '../../components/AsyncData';

const AddOrEditInstrument = () => {

  const { id } = useParams();

  const {trigger: saveInstrument,error: saveError} = useSWRMutation('instruments', save);

  const {
    data: instrument,
    error: instrumentError,
    isLoading: instrumentLoading,
  } = useSWR(id ? `instruments/${id}` : null, getById);
  
  return (
    <Container >
      <Box mt= {3}>
        <Typography display={'flex'} justifyContent={'center'} variant="h4" component="h1" gutterBottom>
          {id ? 'Edit' : 'Add'} {instrument?.name || 'Instrument'}
        </Typography>
        <Divider variant='middle'/>
        <AsyncData error={instrumentError||saveError} loading={instrumentLoading}>
          <Box display={'flex'} justifyContent={'center'}>
            <InstrumentForm 
              saveInstrument={saveInstrument} 
              instrument={instrument} 
            />

          </Box>
        </AsyncData>
      </Box>
      
    </Container>
  );
};

export default AddOrEditInstrument;