import { useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper
  ,Alert, TableSortLabel } from '@mui/material';
import Tuning from '../tunings/Tuning';

function InstrumentTuningsTable({ instrumentTunings, onDelete }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedInstrumentTunings = orderBy
    ? [...instrumentTunings].sort((a, b) => {
      if (orderBy === 'name') {
        return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      return 0;
    })
    : instrumentTunings;

  if (instrumentTunings.length === 0) {
    return (
      <Alert severity="info">There are no tunings for this instrument yet.</Alert>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ margin: 'auto', mt: 3, mb: 3, maxWidth: '80%' }}>
      <Table sx={{ minWidth: 650 }}>
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
            <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedInstrumentTunings.map((tuning) => (
            <Tuning
              key={tuning.id}
              onDelete={onDelete}
              {...tuning}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default InstrumentTuningsTable;