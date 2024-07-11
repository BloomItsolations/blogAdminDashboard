import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import React, {  useState } from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

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

import RestApi from 'src/api/RestApi';
import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';


export default function LoginPage() {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  // Access the auth state from the Redux store
  const { loading, error } = useSelector((state) => state.auth);

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
      const handlelogin = async () => {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        try {
          const { data } = await RestApi.post('/api/admin/login', values, config);
          if (data.msg === 'Login Successfully') {
            sessionStorage.setItem('userInfo', JSON.stringify(data?.userDetails));
            Swal.fire({
              title: 'Success!',
              text: 'Login  successfully.',
              icon: 'success',
              confirmButtonText: 'OK',
              customClass: {
                popup: 'my-custom-popup',
                title: 'my-custom-title',
                content: 'my-custom-content',
                confirmButton: 'my-custom-button'
              }
            })
            window.location.href = '/';
          }
          else if (data.msg === 'Invalid Email Id!') {
            Swal.fire({
              title: 'Error!',
              text: 'Invalid Email Id!',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#d33',
              customClass: {
                popup: 'my-custom-popup',
                title: 'my-custom-title',
                content: 'my-custom-content',
                confirmButton: 'my-custom-button'
              }
            });
          }
          else if (data.msg === 'Invalid Password') {
            Swal.fire({
              title: 'Error!',
              text: 'Invalid Password',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#d33',
              customClass: {
                popup: 'my-custom-popup',
                title: 'my-custom-title',
                content: 'my-custom-content',
                confirmButton: 'my-custom-button'
              }
            });
          }
          else {
            Swal.fire({
              title: 'Error!',
              text: 'Something went wrong. Please try again later.',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#d33',
              customClass: {
                popup: 'my-custom-popup',
                title: 'my-custom-title',
                content: 'my-custom-content',
                confirmButton: 'my-custom-button'
              }
            });
          }

        }
        catch (err) {
          console.log("Error", err);
        }
      }
      handlelogin();
    }
  });

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } = formik;

  return (
    <>
      <Helmet>
        <title> Login | Blog Admin </title>
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
              Sign in For Writing Blog
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
              <Link href='/register'>Register here..</Link>
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
