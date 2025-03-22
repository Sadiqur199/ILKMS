import React, { useEffect, useState } from 'react'
import axios from "./axios/axios";
import {Link} from "react-router-dom";

const MostLikeBlog = () => {
    const [forums, setForums] = useState([])

    useEffect(() => {
        const loadBlogLike = async () => {
            const response = await axios.get(
                "/api/blogs/toplike/"
            );
            setForums(response.data);
            // setTotal(response.data.length);

        };

        loadBlogLike();
    }, []);
    return (
        <div className='most_forum_loop_div'>
            {forums.map((forum) => (
                <div className='most_single_forum' key={forum.id}>
                    <div className='most_forum_thumbnail'>
                        <img src={forum.cover ? forum.cover : '/images/forum_thumbnail.png'}
                             style={{
                                 height: '30px',
                                 width: '30px',
                             }}></img>
                    </div>
                    <div className='most_forum_ques_writer'>
                        <Link to={"/blog/" + forum.id}><p>{forum.title_name}</p></Link>
                        <p style={{fontSize: '12px'}}>লেখক: {forum.author}</p>
                    </div>
{/*                    <div style={{
                        textAlign: 'right',
                        fontSize: '12px'
                    }}>
                        <p>সর্বমোট কমেন্ট: {forum.like_user_counter}</p>
                         <p>দেখেছে: {forum.viewer_counter}</p>
                    </div>*/}
                </div>
            ))}

        </div>
    )
}

export default MostLikeBlog
