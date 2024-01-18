import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Stack, Button, Container, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';

import ListView from 'src/sections/subcategory/List';
import Create from 'src/sections/subcategory/Create';

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
        <title> Subcategory | Hemtej Sea Foods </title>
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
            {isEditing ? 'List Subcategory' : 'New Subcategory'}
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
