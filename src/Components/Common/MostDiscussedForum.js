import React, { useEffect, useState } from 'react'
import './ForumContent.css'
import PageLink from './PageLink'
import { BiLeftArrowAlt, BiPlus } from 'react-icons/bi'
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/authHooks';
import { Helmet } from 'react-helmet';
import { Button } from 'react-bootstrap';
import axios from '../axios/axios';
import "./MostDiscussedForum.css"

const MostDiscussedForum = () => {
    const [forums, setForums] = useState([])

    useEffect(() => {
        const loadForums = async () => {
            const response = await axios.get(
                "/api/forums/topcomment/"
            );
            setForums(response.data);
            // setTotal(response.data.length);

        };

        loadForums();
    }, []);
    return (
        <div className='most_forum_loop_div'>
            {forums.map((forum) => (
                <div className='most_single_forum' key={forum.id}>
                    <div className='most_forum_thumbnail'>
                        <img src={forum.thumbnail ? forum.thumbnail : '/images/forum_thumbnail.png'}
                            style={{
                                height: '30px',
                                width: '30px',
                            }}></img>
                    </div>
                    <div className='most_forum_ques_writer'>
                        <Link to={"/forum/view/" + forum.id}><p>{forum.name}</p></Link>
                        <p style={{fontSize: '12px'}}>প্রশ্নকারী: {forum.owner__full_name}</p>
                    </div>
{/*                    <div className='most_forum_ans_view'>
                        <p>সর্বমোট কমেন্ট: {forum.comment_counter}</p>
                         <p>দেখেছে: {forum.viewer_counter}</p>
                    </div>*/}
                </div>
            ))}

        </div>
    )
}

export default MostDiscussedForum
