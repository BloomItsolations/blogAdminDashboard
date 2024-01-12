import React from 'react';
import PropTypes from 'prop-types';

import { Box, Typography } from '@mui/material';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const List = ({ rowData }) => {
  const columns = [
    {
      field: 's.no',
      width: 80,
      headerName: 'S.No.',
      filterable: false,
      renderCell: (params) => params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
    },
    {
      field: 'driverName',
      headerName: 'Rider Name',
      width: 150,
      editable: false,
    },
    {
      field: 'driverMobile',
      headerName: 'Phone Number',
      width: 150,
      editable: false,
    },
    {
      field: 'driverAlternateNo',
      headerName: 'Alternate Phone No.',
      width: 150,
      editable: false,
    },
    {
      field: 'drivingLicenceNo',
      headerName: 'Driving Licence No.',
      width: 150,
      editable: false,
    },
    {
      field: 'driverAdharNo',
      headerName: 'Aadhar No',
      width: 200,
      editable: false,
    },

    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      editable: false,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 150,
      editable: false,
      renderCell: (params) => (
        <Typography>{new Date(params.row?.createdAt).toLocaleDateString()}</Typography>
      ),
    },
  ];

  return (
    <Box>
      {rowData === null ? null : (
        <Box sx={{ height: '65vh', width: '100%' }}>
          <DataGrid
            getRowId={(row) => row.id}
            rows={[...rowData].reverse()}
            density="standard"
            autoHeight
            columns={columns}
            initialState={{
              ...rowData.initialState,
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[5, 10, 20, 30, 40, 50, 75, 100]}
            slots={{
              toolbar: GridToolbar,
            }}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: false }}
          />
        </Box>
      )}
    </Box>
  );
};

List.propTypes = {
  rowData: PropTypes.shape({
    initialState: PropTypes.object, // Add this line to specify the shape of initialState
  }),
};

export default List;
