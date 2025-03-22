import React, {useState, useEffect, useMemo} from 'react';
import './MostReadBlog.css';
import axios from '../axios/axios';

import {Grid} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ShareIcon from '@mui/icons-material/Share';

import {Button} from 'react-bootstrap';
import {SlUserFollow} from 'react-icons/sl'

import {Link} from 'react-router-dom';
import useAuth from '../../hooks/authHooks';


const MostReadBlog = (props) => {
    const {token, mostReadBlog, fetchMostReadBlog} = useAuth();

    /* const handleLikeBlog = (id) => {
         if (token) {
             axios.post("/api/blogs/userlike/",
                 {
                     jwt: token,
                     blog_id: id,
                 },
             )
                 .then(response => {
                     // fetchUser();
                     fetchMostReadBlog();
                 })
                 .catch(err =>
                     console.log(err)
                 )
         }
     }*/


    useEffect(() => {
        // axios.get(
        //     `/api/blogs/topviewer/`
        // )
        //     .then(res => {
        //         // console.log(res)
        //         setMostReadBlog(res.data)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })

        fetchMostReadBlog();

    }, []);


    const FilterMostReadBlogFirst = useMemo(
        () => Object.values(mostReadBlog).filter((mostReadBlog, index) => index === 0), [mostReadBlog]);

    const FilterMostReadBlogSecond = useMemo(
        () => Object.values(mostReadBlog).filter((mostReadBlog, index) => index !== 0), [mostReadBlog]);

    // console.log(FilterMostReadBlogFirst);
    return (
        <div className='row p-3 bg-white'>

            <div className='col-md-8'>
                {FilterMostReadBlogFirst.map((readBlog) => (
                    < div key={readBlog.id}>
                        <div className='overflowDiv' key={readBlog.id}>
                            <img src={readBlog.cover !== null ? readBlog.cover : '../images/no_image.png'}
                                 className="most_read_blog_cover"/>
                            {readBlog.type === 'blog' &&
                                <Link to={"/blog/" + readBlog.id}>
                                    <div className='most_read_blog_title'
                                         style={{
                                             fontSize: '18px',
                                         }}
                                    >{readBlog.title_name?.slice(0, 100)}</div>
                                </Link>
                            }
                            {readBlog.type === 'forum' &&
                                <Link to={"/forum/view/" + readBlog.id}>
                                    <div className='most_read_blog_title'
                                         style={{
                                             fontSize: '18px',
                                         }}
                                    >{readBlog.title_name?.slice(0, 100)}</div>
                                </Link>
                            }
                            {readBlog.type === 'ebook' &&
                                <Link to={"/ebook/temp/view/" + readBlog.id}>
                                    <div className='most_read_blog_title'
                                         style={{
                                             fontSize: '18px',
                                         }}
                                    >{readBlog.title_name?.slice(0, 100)}</div>
                                </Link>
                            }
                            <Grid style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div className='most_read_blog_author'>
                                    <SlUserFollow style={{
                                        marginTop: '0px',
                                        color: '#0C6395',
                                        fontSize: '13px',
                                      /*  marginLeft: '10px'*/
                                    }}/>
                                    &nbsp; {readBlog.author}
                                    {readBlog.created_date?.slice(0, 10)} &nbsp;
                                  {/*  <b>| {readBlog.type}</b>*/}

                                    {readBlog.type == 'blog' &&
                                        <b>| ব্লগ </b>
                                    }
                                    {readBlog.type == 'forum' &&
                                        <b>| ফোরাম </b>
                                    }
                                    {readBlog.type == 'ebook' &&
                                        <b>| ই-বুক </b>
                                    }



                                </div>
                                {/*                                <div className='mostread_Blog_follow_button'>
                                </div>*/}
                                {/*                                <Grid style={{
                                    fontSize: '10px'
                                }}>
                                    {readBlog.created_date?.slice(0, 10)}
                                </Grid>*/}
                            </Grid>

                            <div>
                                <div dangerouslySetInnerHTML={{__html: readBlog.content?.slice(0, 500)}}
                                     className='most_read_blog_content'/>
                                {/*<p className="read-more"></p>*/}
                            </div>
                        </div>
                        <Grid style={{display: 'flex', marginTop: '10px'}}>
                            {/*                            <VisibilityIcon sx={{ fontSize: 16, marginTop: '-2px', color: "#0C6395" }} />
                            <div className='most_read_blog_like'>{readBlog.viewer_counter}</div>
                            <ThumbUpIcon sx={{ fontSize: 12, color: "#0C6395" }} onClick={() => { handleLikeBlog(readBlog.id) }} />
                            <div className='most_read_blog_like'>{readBlog.like_user_counter}</div>
                            <ShareIcon sx={{ fontSize: 12, color: "#0C6395" }} />
                            <div className='most_read_blog_like'>{readBlog.share_user_counter}</div>*/}
                            {readBlog.type === 'blog' &&
                                <Link to={"/blog/" + readBlog.id}>
                                    <Button variant="outline-info text-center" style={{
                                        fontSize: '14px',
                                        padding: '8px 23px',
                                    }}>
                                        বিস্তারিত
                                    </Button>
                                </Link>
                            }
                            {readBlog.type === 'forum' &&
                                <Link to={"/forum/view/" + readBlog.id}>
                                    <Button variant="outline-info text-center" style={{
                                        fontSize: '14px',
                                        padding: '8px 23px',
                                    }}>
                                        বিস্তারিত
                                    </Button>
                                </Link>
                            }
                            {readBlog.type === 'ebook' &&
                                <Link to={"/ebook/temp/view/" + readBlog.id}>
                                    <Button variant="outline-info text-center" style={{
                                        fontSize: '14px',
                                        padding: '8px 23px',
                                    }}>
                                        বিস্তারিত
                                    </Button>
                                </Link>
                            }
                        </Grid>
                    </div>
                ))}
            </div>
            <div className='col-md-4'
                 style={{
                     height: '220px',
                     overflowY: 'scroll'
                 }}
            >
                {FilterMostReadBlogSecond.map((readBlog) => (
                    <>
                        <div key={readBlog.id}>
                            <div className='overflowDiv pb-3' key={readBlog.id}>
                                <div style={{
                                }}>
                                    <img
                                        style={{
                                            height: '40px',
                                            width: '40px',
                                            borderRadius: '50%',
                                            float: 'left',
                                            marginRight: '10px',
                                        }}
                                        src={readBlog.cover !== null ? readBlog.cover : '../images/no_image.png'}
                                        className=""/>


                                </div>


                                <div>
                                {readBlog.type === 'ebook'
                                    &&
                                    <Link to={"/ebook/temp/view/" + readBlog.id}>
                                        <div className='most_read_blog_title'>{readBlog.title_name?.slice(0, 50)}</div>
                                    </Link>
                                }
                                {readBlog.type === 'blog' &&
                                    <Link to={"/blog/" + readBlog.id}>
                                        <div className='most_read_blog_title'>{readBlog.title_name?.slice(0, 50)}</div>
                                    </Link>
                                }
                                {readBlog.type === 'forum' &&
                                    <Link to={"/forum/view/" + readBlog.id}>
                                        <div className='most_read_blog_title'>{readBlog.title_name?.slice(0, 50)}</div>
                                    </Link>
                                }
                                <Grid style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <div className='most_read_blog_author ' style={{
                                        marginLeft: '-10px',
                                    }}>
                                        <SlUserFollow style={{
                                            marginTop: '0px',
                                            color: '#0C6395',
                                            fontSize: '13px',
                                            marginLeft: '10px'
                                        }}/>
                                        {readBlog.author}
                                        &nbsp; |&nbsp;


                                        {/*<b> {readBlog.type} |</b>*/}
                                        {readBlog.type == 'blog' &&
                                            <b> ব্লগ |</b>
                                        }
                                        {readBlog.type == 'forum' &&
                                            <b> ফোরাম |</b>
                                        }
                                        {readBlog.type == 'ebook' &&
                                            <b> ই-বুক |</b>
                                        }

                                        &nbsp; {readBlog.created_date?.slice(0, 10)}
                                    </div>
                                    {/*                                <Grid style={{ display: 'flex', marginTop: '10px' }}>
                                    <VisibilityIcon sx={{ fontSize: 16, marginTop: '-2px', color: "#0C6395" }} />
                                    <div className='most_read_blog_like'>{readBlog.viewer_counter}</div>
                                    <ThumbUpIcon sx={{ fontSize: 12, color: "#0C6395" }} onClick={() => { handleLikeBlog(readBlog.id) }} />
                                    <div className='most_read_blog_like'>{readBlog.like_user_counter}</div>
                                    <ShareIcon sx={{ fontSize: 12, color: "#0C6395" }} />
                                    <div className='most_read_blog_like'>{readBlog.share_user_counter}</div>
                                </Grid>*/}

                                </Grid>
                                </div>
                            </div>

                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}

export default MostReadBlog
