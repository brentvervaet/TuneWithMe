import { useMemo } from 'react';
import { Container, Typography, Grid2, Card, CardContent ,Box, Divider} from '@mui/material';
import useSWR from 'swr';
import { getAll } from '../../api/index';
import AsyncData from '../../components/AsyncData';

export default function NotesList() {

  const {
    data: notes = [],
    isLoading,
    error,
  } = useSWR('notes', getAll);

  const sortedNotes = useMemo(() => {
    return notes.sort((a, b) => a.frequency - b.frequency);
  }, [notes]);

  return (
    <Container>
      <Box mt={3}>
        <Typography variant="h3" gutterBottom>
          Notes
        </Typography>
        <Divider />
      </Box>
      <AsyncData loading={isLoading} error={error}>
        <Grid2 container spacing={2} mt={3}>
          {sortedNotes.map((note) => (
            <Grid2  xs={12} sm={6} md={4} lg={3} key={note.id}>
              <Card
                data-cy="note_card">
                <CardContent>
                  <Typography variant="h6" component="div" data-cy="note_name">
                    {note.name}
                  </Typography>
                  <Typography variant="body2" color="primary" data-cy="note_frequency">
                    {note.frequency} Hz
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </AsyncData>
      
    </Container>
  );
}