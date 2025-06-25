import { useCallback } from 'react';
import { Container, Typography, Box, Divider, Button, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import useSWR from 'swr';
import { getTrackofTheDay } from '../api';
import AsyncData from '../components/AsyncData';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
const Home = () => {
  const fetchTrack = useCallback(async (url) => {
    const storedTrack = JSON.parse(localStorage.getItem('trackOfTheDay'));
    const today = new Date().toISOString().split('T')[0];
    if (storedTrack && storedTrack.date === today && storedTrack.track !== null) {
      return storedTrack.track;
    } else {
      const fetchedTrack = await getTrackofTheDay(url);
      localStorage.setItem('trackOfTheDay', JSON.stringify({ track: fetchedTrack, date: today }));
      return fetchedTrack;
    }
  }, []);

  const { data: track, error , isLoading} = useSWR('/home/spotify/track', fetchTrack);
  // const { data: track, error , isLoading} = useSWR('/home', getTrackofTheDay);

  const { user } = useAuth();

  return (
    <Container>
      <Box 
        mt={5}
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        textAlign="center"
      >   
        <Box
          width="100%">
          <Typography fontWeight={'bold'} variant="h2" component="h1" gutterBottom>
            Welcome {user ? user.username :''}
          </Typography>
          <Divider variant="middle" />

          <Box mt={1}>
            <Stack mt={1} p={1} direction="column" alignItems="center">
              <Button variant="text" color="secondary" component={NavLink} to="/instruments">
                <b>Instruments</b>
              </Button>
              <Button variant="text" color="secondary" component={NavLink} to="/tuner">
                <b>Tuner</b>
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
      <Box 
        mt={1}
        display={'flex'} 
        flexDirection={'column'} 
        alignItems={'center'} 
      >
        <Box display={'flex'}>
          <Typography fontWeight={'bold'} variant="body1" gutterBottom>
            Song of the day 
          </Typography>
          <MusicNoteIcon fontSize='small'/>
        </Box>
        <AsyncData error={error} loading={isLoading}>
          <iframe
            src={`https://open.spotify.com/embed/track/${track?.id}`}
            width="300"
            height="350"
            frameBorder="0"
            allow="encrypted-media"
            title="Spotify Track"
          ></iframe>
        </AsyncData>
      </Box>
    </Container>
  );
};

export default Home;