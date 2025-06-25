import { Container, Typography, Grid2 ,Box, Divider, TextField, IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuningTable from '../../components/tunings/TuningTable';
import useSWR from 'swr';
import {useState, useMemo} from 'react';
import useSWRMutation from 'swr/mutation';
import { getAll, deleteById } from '../../api/index';
import AsyncData from '../../components/AsyncData';
import { useCallback } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

const TuningsList = () => {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    data: tunings = [],
    isLoading,
    error,
  } = useSWR('tunings', getAll);

  const { trigger: deleteTuning, error: deleteError } = useSWRMutation(
    'tunings',
    deleteById,
  );

  const filteredTunings = useMemo(
    ()=> tunings.filter((tuning) => {
      return tuning.name.toLowerCase().includes(search.toLowerCase());
    },
    ), [search, tunings]);

  const handleDeleteTuning = useCallback(async (id) => {
    await deleteTuning(id);
    alert('Tuning is removed');
  },[deleteTuning]);

  return (
    <Container>
      <Box mt={3}>
        <Typography variant="h3" gutterBottom>
          Tunings
        </Typography>
      </Box>
      <Divider />

      <Grid2 
        container 
        spacing={1} mt={2} 
        justifyContent={'center'} 
        alignItems={'center'} 
        direction={isSmallScreen ? 'column' : 'row'}>

        <Grid2 size={2}>
          <TextField
            type='search'
            id='search'
            label='Search'
            value={text}
            onChange={(e) => setText(e.target.value)}
            variant="standard"
          />
        </Grid2>

        <Grid2>
          <IconButton 
            color="secondary"
            onClick={() => setSearch(text)}
            size='small'
          >
            <SearchIcon fontSize="medium"/>
          </IconButton>
        </Grid2>

      </Grid2>
      <Box mt={3}>
        <AsyncData loading={isLoading} error={error|| deleteError}>
          {!error ? (
            <TuningTable tunings={filteredTunings} onDelete={handleDeleteTuning} />
          ): null}
        </AsyncData>
      </Box>
    </Container>
  );
};

export default TuningsList;