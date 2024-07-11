import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, Typography, Link as MuiLink } from '@mui/material';

import RestApi from 'src/api/RestApi';

import Loader from './Loader';

const Card = ({ blogData, updateState, setUpdateState }) => {
   const [loading,setLoading]=useState(false);
    const truncateText = (text = "", maxLength) => {
        if (text && text.length > maxLength) {
            return text.substring(0, maxLength);
        }
        return text;
    };

    const isVideo = (url) => ( /\.(mp4|webm|ogg)$/i.test(url));

    const handleDelete = async (id) => {
        setLoading(true)
        const response = await RestApi.delete(`api/blogpost/${id}`)
        setLoading(false)
        setUpdateState(!updateState)
        if (response.data.msg === "Item Deleted Successfully") {
            Swal.fire({
                title: 'Success!',
                text: 'Blog Deleted successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'my-custom-popup',
                    title: 'my-custom-title',
                    content: 'my-custom-content',
                    confirmButton: 'my-custom-button'
                }
            })
        }
    }

    if (loading) {
        return <div style={{ display: 'flex', flexDirection:'column', gap:'15px', textAlign:'center', height: '70vh', width: '100%',  justifyContent: 'center', alignItems: 'center' }}>
              <div>
              <Loader/>
              </div>
             <div style={{fontSize:'25px',fontWeight:'700'}}>
            Your Blog is Deleting .... Please wait!
             </div>
        </div>
    }

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                p: 2,
                boxShadow: '2px 1px 2px 2px #a4a7a8',
                borderRadius: 2,
                backgroundColor: "#f8f9f9",
                flexDirection: { xs: 'column', md: 'row' },
                mb: 6,
                width:{xs:'90%',md:'90%',lg:'98%'},
                marginInline:'auto'
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    height: 250,
                    position: 'relative',
                    width: '100%',
                }}
            >

                {
                    isVideo(blogData.image) ? <video
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                        controls
                    >
                        <source src={blogData.image} type="video/mp4" />
                        <track kind="captions" srcLang="en" label="English captions" />
                        Your browser does not support the video tag.
                    </video> : <img
                        src={blogData.image}
                        alt='Blog '
                    />
                }


            </Box>
            <Box
                sx={{
                    flex: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1
                }}
            >
                <MuiLink component={Link} to={`/${blogData._id}`} sx={{ textDecoration: 'none' }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 600,
                            color: "#000000"
                        }}
                    >
                        {truncateText(blogData.title, 150)}
                    </Typography>
                </MuiLink>
                <Typography
                    dangerouslySetInnerHTML={{ __html: truncateText(blogData.content, 190) }}
                    sx={{
                        fontSize: 18,
                        fontWeight: 300,
                        color: "#333333"
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 2
                    }}
                >
                    <Button variant="outlined" color="primary" component={Link} to={`/updateblog/${blogData._id}`}>
                        Update
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => handleDelete(blogData._id)}>
                        Delete
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Card;


Card.propTypes = {
    blogData: PropTypes.shape({
        _id: PropTypes.string, // Remove isRequired if not needed
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        AdminId: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired
    }).isRequired,
    updateState: PropTypes.bool.isRequired,
    setUpdateState: PropTypes.func.isRequired
};