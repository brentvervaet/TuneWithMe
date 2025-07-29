import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { deleteById, getAll } from '../../api/index';
import AsyncData from '../../components/AsyncData';
import InstrumentsTable from '../../components/instruments/InstrumentsTable';
import Notification from '../../components/Notification';

export default function InstrumentsList() {
  // API call
  const {
    data: instruments = [],
    isLoading,
    error,
  } = useSWR('instruments', getAll);

  const { trigger: deleteInstrument, error: deleteError } = useSWRMutation(
    'instruments',
    deleteById,
  );

  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Search
  const filteredInstruments = useMemo(
    () =>
      instruments.filter((instrument) => {
        return instrument.name.toLowerCase().includes(search.toLowerCase());
      }),
    [search, instruments],
  );

  const handleDeleteInstrument = useCallback(
    async (id) => {
      await deleteInstrument(id);
      setShowAlert(true);
      setAlertMessage('Instrument deleted successfully');
    },
    [deleteInstrument],
  );

  // Handle alert close
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowAlert(false);
  };

  return (
    <Container>
      <Box
        mt={3}
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        alignItems="center"
      >
        <Typography variant="h3" gutterBottom>
          Instruments
        </Typography>
        <Box mb={2}>
          <Link to="/instruments/add">
            <IconButton color="secondary" size="small">
              <AddIcon fontSize="large" />
            </IconButton>
          </Link>
        </Box>
      </Box>

      <Divider />

      <Grid
        container
        spacing={1}
        mt={2}
        justifyContent="center"
        alignItems="center"
      >
        <Grid xs={8} sm={4}>
          <TextField
            type="search"
            id="search"
            label="Search"
            value={text}
            onChange={(e) => setText(e.target.value)}
            variant="standard"
            fullWidth
            data-cy="search_input"
          />
        </Grid>
        <Grid xs={4} sm={2}>
          <IconButton
            color="secondary"
            onClick={() => setSearch(text)}
            size="small"
            data-cy="search_btn"
          >
            <SearchIcon fontSize="medium" />
          </IconButton>
        </Grid>
      </Grid>

      <Box mt={3}>
        <AsyncData loading={isLoading} error={error || deleteError}>
          {!error ? (
            <InstrumentsTable
              instruments={filteredInstruments}
              onDelete={handleDeleteInstrument}
            />
          ) : null}
        </AsyncData>
      </Box>
      <Notification
        open={showAlert}
        onClose={handleCloseAlert}
        message={alertMessage}
        error={deleteError}
      />
    </Container>
  );
}
