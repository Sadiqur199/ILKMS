import React, {useEffect, useState} from 'react'
import './BlogInner.css'
import axios from '../axios/axios'
import {Link, useParams} from 'react-router-dom';
import {Grid} from '@mui/material'
import {Button} from 'react-bootstrap';
import {SlUserFollow} from 'react-icons/sl'
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {FaComments} from 'react-icons/fa';
import ShareIcon from '@mui/icons-material/Share';
import {BiLeftArrowAlt} from 'react-icons/bi'
import {IoIosArrowForward} from 'react-icons/io'
import {Helmet} from 'react-helmet';
import useAuth from '../../hooks/authHooks';
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
} from "react-share";
import AddComment from './AddComment';
import BlogComments from "./Comment/BlogComments";

const BlogInner = () => {

    const params = useParams();
    const [post, setPost] = useState({});
    const {token, mostReadBlog, fetchMostReadBlog, marginDiv} = useAuth();
    const blogURL = `${axios.baseURL}/api/blogs/${params.id}/`

    const [showShare, setShowShare] = useState(false);
    const handleShareClick = () => {
        setShowShare(!showShare);
    };

    const handleLikeBlog = (id) => {
        if (token) {
            axios.post("/api/blogs/userlike/",
                {
                    jwt: token,
                    blog_id: id,
                }
            )
                .then(response => {
                    // fetchUser();
                    fetchMostReadBlog();
                    handleSingleLikeBlog();
                })
                .catch(err =>
                    console.log(err)
                )
        }
    }
    useEffect(() => {
        axios.post(
            `/api/blogs/viewercounter/`, {
                blog_id: params.id
            }
        )
            .then(res => {

            })
            .catch(err => {
                console.log(err)
            })

    }, [params.id]);

    const handleSingleLikeBlog = () => {
        const userToken = token ? token : localStorage.getItem('token')
        if (userToken) {
            axios.get(
                `/api/blogs/${params.id}/`
                , {
                    headers: {
                        Authorization: 'Bearer ' + userToken,
                    }
                }
            )
                .then(res => {
                    setPost(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            axios.get(
                `/api/blogs/${params.id}/`
            )
                .then(res => {
                    setPost(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }


    useEffect(() => {
        fetchMostReadBlog();
    }, [])

    useEffect(() => {
        axios.get(
            `/api/blogs/${params.id}/`
        )
            .then(res => {
                setPost(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [params.id])
    const handleShareCount = () => {
        // Assuming you have an API or logic for updating the share count
        if (token) {
            axios.post('/api/blogs/sharecount/', {
                jwt: token,
                blog_id: params.id,
            })
            .then(response => {
                // Optionally, update the share count on the UI
                fetchMostReadBlog();  // Or any other function to re-fetch updated data
            })
            .catch(err => console.log(err));
        }
    };
    
    const handleEmailShare = () => {
        const subject = encodeURIComponent("Check out this Blog-URL");
        const body = encodeURIComponent(`I found this interesting Blog: ${blogURL}`);
        
        // Share count increment function call
        handleShareCount();
    
        // Open Gmail compose window
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=&su=${subject}&body=${body}`, '_blank');
    };
    
    return (
        <div className='Blog_Inner_main' style={{marginLeft: marginDiv ? '155px' : '50px'}}>
            <Helmet>
                <title>বিস্তারিত ব্লগ</title>
            </Helmet>
            <div className='blog_content_inner_div'>
                <Grid className='blog_content_inner_div_header'>
                    <Link to='/blog'>
                        <div>
                            <BiLeftArrowAlt style={{marginTop: '-3px'}}/>
                            &nbsp;&nbsp;ব্লগ&nbsp;&nbsp;
                        </div>
                    </Link>
                    <div style={{color: '#0C6395'}}>
                        <IoIosArrowForward/>
                        &nbsp;&nbsp;বিস্তারিত
                    </div>
                </Grid>
                <Grid className='blog_content_inner_padding'>
                    <div><h3>{post.title_name}</h3></div>
                    <Grid style={{display: 'flex'}}>
                        <p>{post.author}</p>
                        <div className='Blog_follow_button'>
                            <Button style={{margin: '0px', fontSize: '6px'}}>
                                <SlUserFollow style={{marginTop: '-3px'}}/>
                            </Button>
                        </div>
                    </Grid>
                    <p style={{
                        marginTop: '-10px',
                        fontSize: '10px',
                    }}>{post.created_date?.slice(0, 10)}</p>
                    <div className='content_scroll'>
                        {post.cover !== null ?
                            <>
                                <img src={post.cover} className='blog_inner_cover_image'/>
                                <div dangerouslySetInnerHTML={{__html: post.content}}/>
                            </> :
                            <div dangerouslySetInnerHTML={{__html: post.content}}/>
                        }
                    </div>
                    <Grid style={{display: 'flex', marginTop: '0px', padding: '10px'}}>
                        <VisibilityIcon sx={{fontSize: 16, marginTop: '4px', color: "#0C6395"}}/>
                        <div className='like_comment_padding'>{post.viewer_counter}</div>
                        <ThumbUpIcon sx={{fontSize: 12, marginTop: '6px', color: "#0C6395"}}
                                     onClick={() => {
                                         handleLikeBlog(post.id)
                                     }}/>
                        <div className='like_comment_padding'>{post.like_user_counter}</div>
                        {/* <ThumbDownIcon sx={{ fontSize: 15, color: "#0C6395" }} />
                        <div className='like_comment_padding'>{post.dislike_user_counter}</div> */}
                        <FaComments style={{fontSize: 12, marginTop: '6px', color: "#0C6395"}}/>
                        <div className='like_comment_padding'>{post.comment_counter}</div>
                        <ShareIcon sx={{fontSize: 12, marginTop: '6px', color: "#0C6395"}} onClick={handleShareClick}/>
                        <div className='like_comment_padding'>{post.share_user_counter}
                            {showShare && (
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'absolute',
                                    background: 'white',
                                    padding: '10px',
                                    marginTop: '-220px'

                                }}>
                                    <FacebookShareButton url={blogURL}>
                                        <FacebookIcon size={24} style={{marginBottom: '5px'}}/>
                                    </FacebookShareButton>
                                    <WhatsappShareButton url={blogURL}>
                                        <WhatsappIcon size={24} style={{marginBottom: '5px'}}/>
                                    </WhatsappShareButton>
                                    {/* <EmailShareButton url={blogURL}>
                                        <EmailIcon size={24} style={{marginBottom: '5px'}}/>
                                    </EmailShareButton> */}
                                    <EmailIcon size={24} style={{ marginBottom: '5px', cursor: 'pointer' }} onClick={handleEmailShare} />
                                    <LinkedinShareButton url={blogURL}>
                                        <LinkedinIcon size={24} style={{marginBottom: '5px'}}/>
                                    </LinkedinShareButton>
                                    <TelegramShareButton url={blogURL}>
                                        <TelegramIcon size={24} style={{marginBottom: '5px'}}/>
                                    </TelegramShareButton>
                                    <TwitterShareButton url={blogURL}>
                                        <TwitterIcon size={24} style={{marginBottom: '5px'}}/>
                                    </TwitterShareButton>
                                </div>
                            )}
                        </div>

                    </Grid>
                </Grid>
            </div>
            {/*<AddComment />*/}
            <BlogComments id={params.id}/>
        </div>
    )
}

export default BlogInner
