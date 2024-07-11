import * as Yup from 'yup';
import Swal from 'sweetalert2';
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

import RestApi from 'src/api/RestApi';

export default function RegisterPage() {
    const theme = useTheme();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    // Access the auth state from the Redux store
    const { loading, error } = useSelector((state) => state.auth);
    console.log(error);
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
            name: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            const handleRegister = async () => {
                try {
                    const response = await RestApi.post('api/admin/signup', values, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    const {data} = response;
                    console.log(data);
        
                    if (data.msg === 'Sign Up successfully') {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Sign Up successfully.',
                            icon: 'success',
                            confirmButtonText: 'OK',
                            customClass: {
                                popup: 'my-custom-popup',
                                title: 'my-custom-title',
                                content: 'my-custom-content',
                                confirmButton: 'my-custom-button'
                            }
                        })
                        router.push('/login');

                    }
                    else if (data.msg === 'Email Already Exist') {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Email Already Exist',
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
                } catch (err) {
                    console.error('Error:', err); // Handle any errors
                }
            }

            handleRegister();
        },
    });

    const { values, handleChange, handleSubmit, handleBlur, touched, errors } = formik;

    return (
        <>
            <Helmet>
                <title> Register | Blog Admin </title>
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
                            Register  For Writing Blog
                        </Typography>

                        <form onSubmit={handleSubmit}>
                            <Stack spacing={3} marginY={4}>

                                <TextField
                                    name="name"
                                    label="Name "
                                    autoComplete="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={touched.name && errors.name}
                                />
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
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <p>Already have an account ?</p>
                                <Link href='/login'>Login here..</Link>
                            </div>
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
                                    Register
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
