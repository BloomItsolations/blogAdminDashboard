import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Stack, Button, Container, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';

import ListView from 'src/sections/product/List';
import Create from 'src/sections/product/Create';

import { createCategory, fetchCategories } from '../store/categorySlice';

export default function SubCategory() {
  const [isEditing, setisEditing] = useState(false);
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.categories);
  const handleCreateCategory = (formData) => {
    dispatch(createCategory(formData));
  };

  useEffect(() => {
    dispatch(fetchCategories());
    return () => {};
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title> Product | Hemtej Sea Foods </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Subcategory</Typography>

          <Button
            variant="contained"
            color="inherit"
            startIcon={!isEditing ? <Iconify icon="eva:plus-fill" /> : null}
            onClick={() => setisEditing(!isEditing)}
          >
            {isEditing ? 'List Product' : 'New Product'}
          </Button>
        </Stack>
        {isEditing ? (
          <Create onSaveCategory={handleCreateCategory} existingList={list} />
        ) : (
          <>{list !== null ? <ListView rowData={list} /> : null}</>
        )}
      </Container>
    </>
  );
}
