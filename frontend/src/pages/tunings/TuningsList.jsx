import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
  useMediaQuery, useTheme,
} from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { deleteById, getAll } from '../../api/index';
import AsyncData from '../../components/AsyncData';
import TuningTable from '../../components/tunings/TuningTable';

const TuningsList = () => {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { data: tunings = [], isLoading, error } = useSWR('tunings', getAll);

  const { trigger: deleteTuning, error: deleteError } = useSWRMutation(
    'tunings',
    deleteById,
  );

  const filteredTunings = useMemo(
    () =>
      tunings.filter((tuning) => {
        return tuning.name.toLowerCase().includes(search.toLowerCase());
      }),
    [search, tunings],
  );

  const handleDeleteTuning = useCallback(
    async (id) => {
      await deleteTuning(id);
      alert('Tuning is removed');
    },
    [deleteTuning],
  );

  return (
    <Container>
      <Box mt={3}>
        <Typography variant="h3" gutterBottom>
          Tunings
        </Typography>
      </Box>
      <Divider />

      <Grid
        container
        spacing={1}
        mt={2}
        justifyContent={'center'}
        alignItems={'center'}
        direction={isSmallScreen ? 'column' : 'row'}
      >
        <Grid size={2}>
          <TextField
            type="search"
            id="search"
            label="Search"
            value={text}
            onChange={(e) => setText(e.target.value)}
            variant="standard"
          />
        </Grid>

        <Grid>
          <IconButton
            color="secondary"
            onClick={() => setSearch(text)}
            size="small"
          >
            <SearchIcon fontSize="medium" />
          </IconButton>
        </Grid>
      </Grid>
      <Box mt={3}>
        <AsyncData loading={isLoading} error={error || deleteError}>
          {!error ? (
            <TuningTable
              tunings={filteredTunings}
              onDelete={handleDeleteTuning}
            />
          ) : null}
        </AsyncData>
      </Box>
    </Container>
  );
};

export default TuningsList;
