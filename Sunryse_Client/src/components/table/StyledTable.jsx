import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutline';

import styles from './StyledTable.module.scss';
import StyledModal from '../modal/StyledModal';
import { useEffect, useState } from 'react';
import CustomSwitch from '../customSwitch/CustomSwitch';

StyledTable.propTypes = {
  headerData: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
  ).isRequired,
  // Must include unique id in each row
  rowData: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  status: PropTypes.bool,
  onStatusChange: PropTypes.func,
};

export default function StyledTable({
  headerData,
  rowData,
  actions = false,
  status = false,
  onStatusChange = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [serviceIdToDelete, setServiceIdToDelete] = useState('');

  const handleClose = () => {
    setOpenDeleteModal(false);
  };

  const handleOpen = (id) => {
    setServiceIdToDelete(id);
    setOpenDeleteModal(true);
  };

  const handleDelete = () => {
    handleClose();
    onDelete(serviceIdToDelete);
  };

  const Headers = () => (
    <TableRow>
      {headerData.map((header, i) => (
        <TableCell key={`${i} column`}>{header.label}</TableCell>
      ))}
      {status && <TableCell key={'second last column'}>Status</TableCell>}
      {actions && <TableCell key={'last column'}>Actions</TableCell>}
    </TableRow>
  );

  const Rows = () =>
    rowData.map((row, k) => (
      <TableRow
        key={`row ${k}`}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        {headerData.map((header, j) => (
          <TableCell key={`row ${k} column ${j}`}>
            {row[header.value]}
          </TableCell>
        ))}
        {status && (
          <TableCell
            key={`row ${k}} column second last`}
            component="th"
            scope="row"
          >
            <CustomSwitch
              checked={row['status']}
              onChange={(event) => {
                onStatusChange(row['id'], event.target.checked);
              }}
            />
          </TableCell>
        )}
        {actions && (
          <TableCell key={`row ${k}} column last`} component="th" scope="row">
            <div className={styles.actionsContainer}>
              <EditIcon
                className={styles.icon}
                sx={{ fontSize: 30 }}
                onClick={() => onEdit()}
              />
              <DeleteIcon
                className={styles.icon}
                sx={{ fontSize: 30 }}
                onClick={() => handleOpen(row['id'])}
              />
            </div>
          </TableCell>
        )}
      </TableRow>
    ));

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead sx={{ bgcolor: '#e4e4e4' }}>
            <Headers />
          </TableHead>
          <TableBody>
            <Rows />
          </TableBody>
        </Table>
      </TableContainer>
      <StyledModal
        title={'Delete'}
        text={'Are you sure you want to delete this?'}
        open={openDeleteModal}
        onClose={handleClose}
        onContinue={handleDelete}
        closeText={'Cancel'}
        continueText={'Delete'}
      />
    </>
  );
}
