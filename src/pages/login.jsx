import * as Yup from 'yup';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

import { userLogin, clearError } from '../store/authSlice';

export default function LoginPage() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  // Access the auth state from the Redux store
  const { loading, error } = useSelector((state) => state.auth);
  console.log(error);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      dispatch(clearError());
      dispatch(userLogin(values))
        .then(() => {
          // If no error occurred during login, navigate to the home page
          router.push('/');
        })
        .catch((err) => {
          // Handle login failure (display an error message, etc.)
          console.error('Login failed:', error);
        });
    },
  });

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } = formik;

  return (
    <>
      <Helmet>
        <title> Login | Hemtej Sea Foods </title>
      </Helmet>
      <Box
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.default, 0.9),
            imgUrl: '/assets/background/overlay_4.jpg',
          }),
          height: 1,
        }}
      >
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, md: 24 },
            left: { xs: 16, md: 24 },
          }}
        />

        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          <Card
            sx={{
              p: 5,
              width: 1,
              maxWidth: 420,
            }}
          >
            <Typography variant="h4" paddingY={2}>
              Sign in to Hemtej Sea Foods
            </Typography>

            <form onSubmit={handleSubmit}>
              <Stack spacing={3} marginY={4}>
                <TextField
                  name="email"
                  label="Email address"
                  autoComplete="current-email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />

                <TextField
                  name="password"
                  label="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="current-password"
                  type={showPassword ? 'Text' : 'password'}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>

              <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
                <Link variant="subtitle2" underline="hover">
                  Forgot password?
                </Link>
              </Stack>

              {loading ? (
                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="inherit"
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<CircularProgress size={20} />}
                >
                  Submitting...
                </LoadingButton>
              ) : (
                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="inherit"
                >
                  Login
                </LoadingButton>
              )}
            </form>
            {error ? (
              <Typography variant="body1" color="error" sx={{ my: 2 }} textAlign="center">
                Error : {error}
              </Typography>
            ) : null}
          </Card>
        </Stack>
      </Box>
    </>
  );
}
