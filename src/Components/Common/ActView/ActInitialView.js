import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "./ActInitialView.css"
import useAuth from '../../../hooks/authHooks'
import { Helmet } from 'react-helmet';
import PageLink from '../PageLink';
import { BiLeftArrowAlt } from 'react-icons/bi'
import { IoIosArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { Grid, Paper } from '@mui/material'
import axios from '../../axios/axios';
import Comments from '../Comment/Comments';

const ActInitialView = () => {
    const { marginDiv, token } = useAuth()
    // const params = useParams();
    // console.log(params);
    const [post, setPost] = useState({});
    const id = 4

    useEffect(() => {
        axios.get(
            `/api/acts/${id}/`
        )
            .then(res => {
                // console.log(res)
                setPost(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [id]);


    return (
        <div className='ActInitial_main' style={{ marginLeft: marginDiv ? '155px' : '50px', transition: '.5s' }}>
            <Helmet>
                <title>ই-বুক</title>
            </Helmet>
            <div>
                <PageLink />
            </div>
            <div className='ActInitial_content'>
                <div className='ActInitial_content_header'>
                    <Link to='/ebook'>
                        <div >
                            <BiLeftArrowAlt style={{ marginTop: '-3px' }} />
                            &nbsp;&nbsp;ই-বুক&nbsp;&nbsp;
                        </div>
                    </Link>
                    <div style={{ color: '#0C6395' }}>
                        <IoIosArrowForward />
                        &nbsp;&nbsp;বিস্তারিত
                    </div>
                </div>
                <div className='ActInitial_content_body'>
                    <div className='ActInitial_cover'>
                        <Paper elevation={4}>
                            <img src={post.cover} className='ActInitial_cover_size' />
                        </Paper>
                    </div>
                    <div className='ActInitial_overflow_ebook'>
                        <h6 style={{ fontWeight: 'bold' }}>{post.title_of_act}</h6>
                        {/* <p>লেখকঃ {post.author}</p> */}
                        <p>প্রকাশের তারিখঃ {post.publication_date}</p>
                        <div>
                            <div dangerouslySetInnerHTML={{ __html: post.proposal }} />
                            <br/>
                            <div dangerouslySetInnerHTML={{ __html: post.objective }} />
                            <p className='read_more'></p>
                        </div>
                    </div>
                    {/* <Grid style={{ display: 'flex', marginTop: '10px' }}>
                            <Link to={"/ebook/view/" + post.id}>
                                <Button style={{ marginTop: '-5px', marginRight: '50px' }}>সম্পূর্ণ পড়ুন</Button>
                            </Link>
                            <Link to={"/ebook/pdf/" + post.id}>
                                <Button style={{ marginTop: '-5px', marginRight: '50px' }}>বই আকারে পড়ুন</Button>
                            </Link>
                            <VisibilityIcon sx={{ fontSize: 16, marginTop: '4px', color: "#0C6395" }} />
                            <div className='like_comment_padding'>{post.viewer_counter}</div>
                            {liked ?
                                <ThumbUpIcon sx={{ fontSize: 14, marginTop: '6px', color: "#0C6395" }}
                                    onClick={() => { handleLikeEbook(post.id) }} />
                                :
                                <ThumbUpOutlinedIcon sx={{ fontSize: 14, marginTop: '6px', color: "#0C6395" }}
                                    onClick={() => { handleLikeEbook(post.id) }} />
                            }
                            <div className='like_comment_padding'>{post.like_user_counter}</div>
                            <FaComments style={{ fontSize: 12, marginTop: '6px', color: "#0C6395" }} />
                            <div className='like_comment_padding'>{post.comment_counter}</div>
                            <ShareIcon sx={{ fontSize: 12, marginTop: '6px', color: "#0C6395" }} onClick={handleShareClick} />
                            <div className='like_comment_padding'>{post.share_user_counter}
                                {showShare && (
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        position: 'absolute',
                                        background: 'white',
                                        padding: '10px',
                                        marginTop: '-220px',
                                        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',

                                    }}>
                                        <FacebookShareButton url={ebookURL} onClick={handleShareCount}>
                                            <FacebookIcon size={24} style={{ marginBottom: '5px' }} />
                                        </FacebookShareButton>
                                        <WhatsappShareButton url={ebookURL} onClick={handleShareCount}>
                                            <WhatsappIcon size={24} style={{ marginBottom: '5px' }} />
                                        </WhatsappShareButton>
                                        <EmailShareButton url={ebookURL} onClick={handleShareCount}>
                                            <EmailIcon size={24} style={{ marginBottom: '5px' }} />
                                        </EmailShareButton>
                                        <LinkedinShareButton url={ebookURL} onClick={handleShareCount}>
                                            <LinkedinIcon size={24} style={{ marginBottom: '5px' }} />
                                        </LinkedinShareButton>
                                        <TelegramShareButton url={ebookURL} onClick={handleShareCount}>
                                            <TelegramIcon size={24} style={{ marginBottom: '5px' }} />
                                        </TelegramShareButton>
                                        <TwitterShareButton url={ebookURL} onClick={handleShareCount}>
                                            <TwitterIcon size={24} style={{ marginBottom: '5px' }} />
                                        </TwitterShareButton>
                                    </div>
                                )}
                            </div> */}




                        {/* </Grid> */}
                    </div>
                </div>
                <Comments id={4} />
            </div>
    )
}

export default ActInitialView
