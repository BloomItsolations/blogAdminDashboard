import React from 'react';
import PropTypes from 'prop-types';

import { Box, Avatar, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const List = ({ rowData }) => {
  console.log(rowData);
  const columns = [
    {
      field: 's.no',
      width: 80,
      headerName: 'S.No.',
      filterable: false,
      renderCell: (params) => params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
    },
    {
      field: 'imageURL',
      headerName: '',
      width: 150,
      editable: false,
      renderCell: ({ row }) => (
        <Avatar
          alt={row.imageUrl}
          style={{ mixBlendMode: 'color-burn' }}
          src={`https://hemtejseafoodsapi.bloomitsolutions.in/${row.imageUrl}`}
        />
      ),
    },
    {
      field: 'name',
      headerName: 'Title',
      width: 200,
      editable: false,
      renderCell: ({ row }) => <Typography>{row.name}</Typography>,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 300,
      editable: false,
    },
    {
      field: 'updatedAt',
      headerName: 'Last Time Update',
      width: 150,
      editable: false,
      renderCell: ({ row }) => (
        <Typography>{new Date(row?.createdAt).toLocaleDateString()}</Typography>
      ),
    },
  ];

  return (
    <>
      {rowData === null ? null : (
        <Box sx={{ height: '65vh', width: '100%' }}>
          <DataGrid
            getRowId={(row) => row.id}
            rows={[...rowData].reverse()}
            density="standard"
            sx={{
              boxShadow: 2,
              padding: 3,
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
            }}
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
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: false }}
          />
        </Box>
      )}
    </>
  );
};

List.propTypes = {
  rowData: PropTypes.shape({
    initialState: PropTypes.array, // Add this line to specify the shape of initialState
  }),
};

export default List;
