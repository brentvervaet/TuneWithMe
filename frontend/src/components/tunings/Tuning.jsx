import { TableRow, TableCell, IconButton, Box, Typography } from '@mui/material';
import { memo } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import useSWR from 'swr';
import AsyncData from '../AsyncData';
import { getNotesByTuningId } from '../../api/index';
import { useMediaQuery, useTheme } from '@mui/material';
import { useAuth } from '../../contexts/auth';
const TuningMemoized = memo(function Tuning({id,name, isCustom, onDelete, user_id }) {

  const { user, isAuthed } = useAuth();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const  {
    data: notes=[],
    isLoading,
    error,
  } = useSWR(`tunings/${id}/notes`, getNotesByTuningId);

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <TableRow
      data-cy="tuning">
      <TableCell
        data-cy="tuning_name">
        <Typography fontSize={isSmallScreen ? '0.8rem' : '1rem'}>
          {name}
        </Typography>
      </TableCell>
      <TableCell>
        <AsyncData loading={isLoading} error={error}>
          <Box display="flex" flexDirection="row" gap={2} flexWrap="wrap">
            {notes.map((note, index) => (
              <Typography fontSize={isSmallScreen ? '0.6rem' : '0.8rem'} key={index} color='secondary'>
                {note.name} 
              </Typography>
            ))}
          </Box>
        </AsyncData>
      </TableCell>
      <TableCell>{isCustom ? 'Yes' : 'No'}</TableCell>

      {/* Buttons */}
      <TableCell>
        {isAuthed && (user?.id === 1 || user_id === user?.id) && (
       
          <Box display="flex">
            <IconButton
              color="error"
              onClick={handleDelete}
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
      
        )}
      </TableCell>
      
    </TableRow>
  );
});

export default TuningMemoized;