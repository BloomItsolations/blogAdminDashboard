import React, { useContext } from 'react';
import { Box, Typography, Button, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

const Card = () => {

    // Static data
    const blogData = {
        id: '1',
        image: '/path/to/image.jpg', // Replace with the actual path to your image
        title: 'Introduction to HackerRank',
        content: "sd <h2><strong>Introduction</strong></h2><p>In the world of coding and software development, keeping your skills sharp and staying updated with the latest technologies is crucial. One platform that has been helping developers achieve this for years is HackerRank. Whether you are a beginner trying to learn the basics or an experienced professional looking to hone your skills, HackerRank has something to offer for everyone.</p><h2><strong>What is HackerRank?</strong></h2><p>HackerRank is a technical hiring platform that focuses on competitive programming challenges and contests. It provides a wide array of coding problems across various domains such as algorithms, data structures, artificial intelligence, and databases. Additionally, it offers tutorials and interview preparation kits to help developers improve their coding skills and prepare for job interviews.</p>",
        authername: 'John Doe'
    };

    // const truncateText = (text, maxLength) => {
    //     if (text && text.length > maxLength) {
    //         return text.substring(0, maxLength) + '...';
    //     }
    //     return text;
    // };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                p: 2,
                boxShadow: '2px 1px 2px 2px #a4a7a8',
                borderRadius: 2,
                backgroundColor: "#f8f9f9",
                flexDirection: { xs: 'column', md: 'row' },
                mb: 6
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
                <img
                    src={blogData.image}
                    alt='Blog '
                />
            </Box>
            <Box
                sx={{
                    flex: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3
                }}
            >
                <MuiLink component={Link} href={`/${blogData.id}`} sx={{ textDecoration: 'none' }}>
                    {/* <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 600,
                            color: "#000000"
                        }}
                    >
                        {truncateText(blogData.title, 150)}
                    </Typography> */}
                </MuiLink>
                {/* <Typography
                    dangerouslySetInnerHTML={{ __html: truncateText(blogData.content, 190) }}
                    sx={{
                        fontSize: 18,
                        fontWeight: 300,
                        color: "#333333"
                    }}
                /> */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <MuiLink component={Link} href={`/${blogData.id}`} sx={{ textDecoration: 'none' }}>
                        <Button variant="outlined" color="primary">
                            Read More..
                        </Button>
                    </MuiLink>
                    <Typography
                        sx={{
                            fontSize: 14,
                            fontWeight: 500,
                            color: 'gray'
                        }}
                    >
                        Author: {blogData.authername}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Card;
