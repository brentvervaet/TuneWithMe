import { useState } from 'react';
import Instrument from './Instrument';
import { TableContainer, Table, 
  TableHead, TableRow, 
  TableCell, TableBody, Paper,
  Alert, TableSortLabel } from '@mui/material';

function InstrumentsTable({ instruments, onDelete }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedInstruments = orderBy
    ? [...instruments].sort((a, b) => {
      if (orderBy === 'name') {
        return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (orderBy === 'tuningCount') {
        return order === 'asc' ? a.tuningCount-b.tuningCount : b.tuningCount-a.tuningCount;
      }
      return 0;
    })
    : instruments;

  if (instruments.length === 0) {
    return (
      <Alert severity="info" data-cy="no_instruments">There are no instruments yet.</Alert>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ maxWidth: '650px', margin: 'auto',mt: 3,mb: 3 }}>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              <TableSortLabel
                active={orderBy === 'name'}
                direction={orderBy === 'name' ? order : 'asc'}
                onClick={() => handleRequestSort('name')}
                hideSortIcon={false}
                date-cy="name_header"
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }} align='center'>
              <TableSortLabel
                active={orderBy === 'tuningCount'}
                direction={orderBy === 'tuningCount' ? order : 'asc'}
                onClick={() => handleRequestSort('tuningCount')}
                hideSortIcon={false}
              >
                # of Tunings
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '50px' }}></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {sortedInstruments.map((instrument) => (
            <Instrument key={instrument.id} onDelete={onDelete} {...instrument} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default InstrumentsTable;