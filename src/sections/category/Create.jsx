import * as Yup from 'yup';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';

import {
  Grid,
  Paper,
  Button,
  Container,
  TextField,
  Typography,
  FormHelperText,
} from '@mui/material';

const Create = ({ onSaveCategory }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      position: '',
      image: null,
    },

    validationSchema: Yup.object({
      name: Yup.string().required('Category name is required'),
      position: Yup.string().required('Category position is required'),
      description: Yup.string().required('Category description is required'),
      image: Yup.mixed().required('Category Image is required'),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('position', values.position);
        formData.append('description', values.description);
        formData.append('image', values.image);
        console.log(values?.image);
        onSaveCategory(formData);
        // Handle the response as needed
      } catch (error) {
        console.error('Error creating category:', error);
      }
    },
  });

  const handleImageChange = useCallback(
    (event) => {
      const file = event.target.files[0]; // Use the value from the input field
      console.log(file);
      formik.setFieldValue('image', file);

      // Display image preview
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    },
    [formik]
  );

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      // Use the value from the input field
      const file = event.dataTransfer.files[0];
      console.log(file);
      formik.setFieldValue('image', file);

      // Display image preview
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    },
    [formik]
  );

  return (
    <Container
      sx={{
        boxShadow: 2,
        padding: 3,
        '& .MuiDataGrid-cell:hover': {
          color: 'primary.main',
        },
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={12} sm={6}>
            <TextField
              label="Category Name"
              name="name"
              fullWidth
              {...formik.getFieldProps('name')}
              error={formik.touched.name && !!formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Category position"
              name="position"
              type="number"
              fullWidth
              {...formik.getFieldProps('position')}
              error={formik.touched.position && !!formik.errors.position}
              helperText={formik.touched.position && formik.errors.position}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Category Description"
              name="description"
              fullWidth
              {...formik.getFieldProps('description')}
              error={formik.touched.description && !!formik.errors.description}
              helperText={formik.touched.description && formik.errors.description}
            />
          </Grid>

          <Grid item xs={12}>
            <label htmlFor="imageInput">
              <Paper
                elevation={imagePreview ? 3 : 0}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={{
                  padding: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ maxWidth: '100%', maxHeight: '200px' }}
                    />
                    <Typography variant="caption">Image Preview</Typography>
                  </>
                ) : (
                  <Typography sx={{ color: 'primary.light' }}>
                    Drag and drop an image here or click to select one.
                  </Typography>
                )}
              </Paper>
            </label>
            <input
              id="imageInput"
              type="file"
              name="image"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => {
                handleImageChange(e);
                formik.handleChange(e);
              }}
            />
            <FormHelperText error={formik.touched.image && !!formik.errors.image}>
              {formik.touched.image && formik.errors.image}
            </FormHelperText>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Category
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
// Define prop types for the component
Create.propTypes = {
  onSaveCategory: PropTypes.func.isRequired,
};
export default Create;
