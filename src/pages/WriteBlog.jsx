import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';

import { Box, Grid, Button, TextField,Typography, FormControl  } from '@mui/material';

import RestApi from 'src/api/RestApi';

import Loader from './Loader';

const WritePage = () => {
    const [file, setFile] = useState(null);
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [loading, setLoading] = useState(false);
    const adminid = JSON.parse(sessionStorage.getItem('userInfo')).id;

    const modules = {
        toolbar: [
            [{ 'font': [] }],
            [{ 'header': [1, 2, 3, 4, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handlePublish = async () => {
        if (!title || !value || !author || !file) {
            alert('Please fill in all fields and upload an image.');
            return;
        }
     
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', value);
            formData.append('authername', author);
            formData.append('file', file);
            formData.append('AdminId', adminid);
            const response = await RestApi.post('api/blogpost', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Blog Upload Successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    customClass: {
                        popup: 'my-custom-popup',
                        title: 'my-custom-title',
                        content: 'my-custom-content',
                        confirmButton: 'my-custom-button'
                    }
                });
                setFile(null);
                setValue('');
                setTitle('');
                setAuthor('');
            }

            console.log("REsponse", response)
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Some went Wrong! Please try After sometimes',
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
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div style={{ display: 'flex', flexDirection:'column', gap:'15px', textAlign:'center', height: '70vh', width: '100%',  justifyContent: 'center', alignItems: 'center' }}>
              <div>
              <Loader/>
              </div>
             <div style={{fontSize:'25px',fontWeight:'700'}}>
            Your Blog is Publishing .... Please wait!
             </div>
        </div>
    }

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#f0f0f0',
            color: '#333',
            p: { xs: 2, md: 4 }
        }}>
            <Box sx={{
                maxWidth: 800,
                width: '100%',
                p: { xs: 2, md: 4 },
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}>
                <FormControl
                    fullWidth
                    mb={4}
                    variant="outlined"
                    sx={{
                        border: '2px dashed #ccc',
                        borderRadius: '8px',
                        padding: '8px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        mb: 3
                    }}
                >
                    <label htmlFor="image" style={{ display: 'block', marginBottom: '20px', fontSize: '18px', fontWeight: 'bold' }}>
                        {file ? file.name : 'Choose an image'}
                    </label>
                    <input
                        type="file"
                        id="image"
                        onChange={handleFileChange}
                        accept="image/*,video/*"
                        style={{ display: 'none' }}
                    />
                    <Typography variant="body2" color="textSecondary">
                        Upload JPG, PNG, GIF up to 5MB
                    </Typography>
                </FormControl>
                <TextField
                    type="text"
                    placeholder="Blog Title"
                    variant="outlined"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{ mb: 3 }}
                />
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    placeholder="Tell your story..."
                    modules={modules}
                    style={{
                        width: '100%', height: '250px', marginBottom: { xs: '24px', md: '54px' }
                    }}
                />
                <TextField
                    type="text"
                    placeholder="Author Name"
                    variant="outlined"
                    fullWidth
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    sx={{marginTop:{ xs: '100px', md: '50px' }}}
                />
                <Grid container spacing={2} mt={4}>
                    <Grid item xs={12} sx={{ textAlign: 'right' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handlePublish}
                        >
                            Publish
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default WritePage;
