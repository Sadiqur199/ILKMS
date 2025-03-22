import React, {useEffect, useState} from 'react'
import './ForumContent.css'
import PageLink from './PageLink'
import {BiLeftArrowAlt, BiPlus} from 'react-icons/bi'
import {Link} from 'react-router-dom';
import useAuth from '../../hooks/authHooks';
import {Helmet} from 'react-helmet';
import {Button} from 'react-bootstrap';
import axios from '../axios/axios';
import CreateForum from './CreateForum';
import {ImCross} from 'react-icons/im'

const ForumContent = () => {
    const {marginDiv, token, showCreateForum, role, handleShowCreateForum} = useAuth();
    const [forums, setForums] = useState([])
    const userRole = role ? role : localStorage.getItem("role");


    useEffect(() => {
        const loadForums = async () => {
            const response = await axios.get(
                "/api/forums/"
            );
            setForums(response.data);
            // setTotal(response.data.length);

        };

        loadForums();
    }, []);
    return (
        <div className='forum_content_main' style={{marginLeft: marginDiv ? '155px' : '50px'}}>
            <Helmet>
                <title>ফোরাম লিস্ট</title>
            </Helmet>
            <div>
                <PageLink/>
            </div>
            <div className='forum_content'>
                <div className='forum_content_header'>
                    <div style={{color: '#0C6395'}}>
                        <Link to='/'>
                            <BiLeftArrowAlt style={{marginTop: '-3px', fontSize: '25px'}}/>
                        </Link>
                        &nbsp;&nbsp;ফোরাম&nbsp;&nbsp;
                    </div>
                </div>
                <div className='forum_inner_content'>
                    {token &&
                        <>
                            {(userRole === "Admin" || role === "Authorized" || role === "ForumUser" || role === "BloggerAndForumUser") && (
                                <div className="create_new">
                                    <Button onClick={handleShowCreateForum}>
                                        <BiPlus fontSize={20}/> নতুন আলোচনা
                                    </Button>
                                </div>
                            )}
                        </>
                    }
                    {showCreateForum && (
                        <div style={{position: 'fixed', marginLeft: '30%', background: 'white', marginTop: '-80px'}}>
                            <div style={{background: '#0C6395', width: '100%', height: '40px'}}>
                                <ImCross style={{marginLeft: '93%', color: 'white', marginTop: '10px'}}
                                         onClick={handleShowCreateForum}/>
                            </div>
                            <CreateForum/>
                        </div>
                    )}
                    <div className='forum_loop_div'>
                        {forums.map((forum) => (
                            <div className='single_forum' key={forum.id}>
                                <div className='forum_thumbnail'>
                                    <img src={forum.thumbnail ? forum.thumbnail : '/images/forum_thumbnail.png'}
                                         style={{
                                             height: '40px',
                                             width: '40px',
                                         }}></img>
                                </div>
                                <div className='forum_ques_writer'>
                                    <Link to={"/forum/view/" + forum.id}><p>{forum.name}</p></Link>
                                    <p>প্রশ্নকারী: {forum.owner__full_name}</p>
                                </div>
                                <div className='forum_ans_view'>
                                    <p>উত্তর: {forum.comment_counter}</p>
                                    <p>দেখেছে: {forum.viewer_counter}</p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForumContent
