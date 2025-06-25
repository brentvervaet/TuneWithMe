import { useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper
  ,Alert, TableSortLabel } from '@mui/material';
import Tuning from './Tuning';
import { useMediaQuery, useTheme } from '@mui/material';

function TuningTable({ tunings, onDelete }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  if (tunings === null || tunings.length === 0) {
    return (
      <Alert severity="info" >There are no tunings yet.</Alert>
    );
  }

  const sortedTunings = orderBy
    ? [...tunings].sort((a, b) => {
      if (orderBy === 'name') {
        return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      return 0;
    })
    : tunings;

  return (
    <TableContainer component={Paper} sx={{ margin: 'auto', maxWidth: '650px' }}>
      <Table sx={{ minWidth: isSmallScreen ? 250 : 650 }}>

        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              <TableSortLabel
                active={orderBy === 'name'}
                direction={orderBy === 'name' ? order : 'asc'}
                onClick={() => handleRequestSort('name')}
                hideSortIcon={false}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Notes</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Custom</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '50px' }}></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedTunings.map((tuning) => (
            <Tuning
              key={tuning.id}
              onDelete={onDelete}
              isCustom={null}
              {...tuning}
            />
          ))}
        </TableBody>
        
      </Table>
    </TableContainer>
  );
}

export default TuningTable;