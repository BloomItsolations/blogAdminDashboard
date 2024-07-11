import React, { useState, useEffect } from 'react';

import RestApi from 'src/api/RestApi';

import Card from './Card';

export default function MyBlog() {
    const [myblog, setMyBlog] = useState([]);
    const [updateState,setUpdateState]=useState(false);
    console.log("Myblog", myblog)
    const adminId = JSON.parse(sessionStorage.getItem('userInfo')).id;
    console.log("Adminid", adminId)
    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await RestApi.get(`api/admin/myblog/${adminId}`);
                setMyBlog(response.data?.data)
            } catch (error) {
                console.error("Error fetching blog data:", error);
            }
        };

        fetchBlogData();
    }, [adminId,updateState]); 

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
