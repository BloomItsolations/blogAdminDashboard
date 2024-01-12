import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';

import { Stack, Button, Container, Typography } from '@mui/material';

import RestApi from 'src/api/RestApi';

import Iconify from 'src/components/iconify';

import ListView from 'src/sections/category/List';

export default function Category() {
  const [isEditing, setisEditing] = useState(false);
  const [CategoryData, setCategoryData] = useState(null);
  const listCategory = async () => {
    try {
      const response = await RestApi.get('/admin/categories');
      if (response.status === 200) {
        setCategoryData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    listCategory();
    return () => {};
  }, []);

  return (
    <>
      <Helmet>
        <title> Category | Hemtej Sea Foods </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Category</Typography>

          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => setisEditing(!isEditing)}
          >
            {isEditing ? 'List Category' : 'New Category'}
          </Button>
        </Stack>
        {isEditing ? (
          <div>Form</div>
        ) : (
          <>
            {CategoryData !== null ? (
              <ListView
                rowData={CategoryData}
                columns={[
                  { id: 'name', label: 'Name' },
                  { id: 'description', label: 'Description' },
                  { id: 'imageUrl', label: 'imageUrl' },
                  { id: 'id' },
                ]}
              />
            ) : null}
          </>
        )}
      </Container>
    </>
  );
}
