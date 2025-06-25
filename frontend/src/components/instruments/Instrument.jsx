import { TableRow, TableCell, IconButton ,Box, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { memo } from 'react';
import {NavLink} from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

const InstrumentMemoized = memo(function Instrument({ id, name, tuningCount, onDelete , user_id}) {
  const { user, isAuthed } = useAuth();
  
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <TableRow data-cy="instrument">
      <TableCell data-cy="instrument_name" width={'45%'}>
        <Typography
          component={NavLink}
          to={`/instruments/${id}`}
          color="text.primary"
          variant="body1"
          sx={{
            fontSize: '1rem',
            textDecoration: 'none',
            '&:hover': {
              color: 'secondary.main',
            },
          }}
        >
          {name}
        </Typography>
      </TableCell>

      <TableCell sx={{ fontSize: '1rem' }} align='center' width={'45%'}>
        {tuningCount}
      </TableCell>

      {/* Buttons */}
      
      <TableCell>
        <Box display={'flex'} >
          {/* Only show delete & edit button if user is admin (id === 1) or instrument is created by the user */}
          {isAuthed && (user?.id === 1 || user_id === user?.id) && (
            <>
              <NavLink to={`/instruments/edit/${id}`}>
                <IconButton
                  color="secondary"
                  size="small"
                  data-cy="instrument_edit_btn"
                >
                  <EditIcon />
                </IconButton>
              </NavLink>
              <IconButton
                color="error"
                onClick={handleDelete}
                size="small"
                data-cy="instrument_remove_btn"
              >
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </Box>
      </TableCell>
    </TableRow>
  );
});

export default InstrumentMemoized;
