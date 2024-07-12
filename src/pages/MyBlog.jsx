import React, { useState, useEffect } from 'react';

import RestApi from 'src/api/RestApi';

import Card from './Card';

export default function MyBlog() {
    const [myblog, setMyBlog] = useState([]);
    const [updateState,setUpdateState]=useState(false);
    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await RestApi.get(`api//blogpost`);
                setMyBlog(response.data?.Post)
            } catch (error) {
                console.error("Error fetching blog data:", error);
            }
        };

        fetchBlogData();
    }, [updateState]); 

    return (
        <>

            {
                myblog && myblog?.map((value) => (
                    <Card blogData={value} updateState={updateState} setUpdateState={setUpdateState}/>
                ))
            }
        </>
    );
}
