import React, { useState, useEffect } from 'react';
import './BlogContent.css'
import PageLink from './PageLink'
import axios from '../axios/axios';
import { Pagination } from 'antd';
import { Grid, Paper } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { FaComments } from 'react-icons/fa';
import ShareIcon from '@mui/icons-material/Share';
import { BiLeftArrowAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import useAuth from '../../hooks/authHooks';


const BlogContent = () => {
  const {marginDiv} = useAuth()
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState("");
  const [page, setPage] = useState(0);
  const [postPerPage, setPostPerPage] = useState(10);

  useEffect(() => {
    const loadPosts = async () => {
      const response = await axios.get(
        "/api/blogs/"
      );
      setPosts(response.data);
      setTotal(response.data.length);

    };

    loadPosts();
  }, []);

  const indexofLastPage = page + postPerPage;
  const indexofFirstPage = indexofLastPage - postPerPage;
  const currentPosts = posts.slice(indexofFirstPage, indexofLastPage);

  const onShowSizeChange = (current, pageSize) => {
    setPostPerPage(pageSize);
  };

  const itemRender = (current, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }

    return originalElement;
  }

  return (
    <div className='blog_content_main' style={{ marginLeft: marginDiv? '155px': '50px' }}>
      <Helmet>
        <title>ব্লগ লিস্ট</title>
      </Helmet>
      <div>
        <PageLink />
      </div>
      <div className='blog_content'>
        <div className='blog_content_header'>

          <div style={{ color: '#0C6395' }}>
            <Link to='/'>
              <BiLeftArrowAlt style={{ marginTop: '-3px', fontSize: '25px' }} />
            </Link>
            &nbsp;&nbsp;ব্লগ&nbsp;&nbsp;
          </div>

        </div>
        <div className='blog_inner_content'>
          {currentPosts.map((post) => (
            // <h6 key={post.ebook_id} className='book_content'><img src={post.ebook_cover} className='blog_cover'/></h6>
            // <h6 key={post.ebook_id} className='book_content'><div dangerouslySetInnerHTML={{ __html: post.blog_content}} /></h6>
            <div key={post.id} className='blog_each_div'>
              <Paper elevation={2}>
                <img src={post.cover !== null ? post.cover : '../images/no_image.png'} className="blog_cover" />
              </Paper>
              <Link to={"/blog/" + post.id}><h6>{post.title_name.slice(0, 100)}</h6></Link>
              <p>{post.author}, {post.created_date?.slice(0, 10)}</p>
              <Grid style={{ display: 'flex', marginTop: '-6px' }}>
                <VisibilityIcon sx={{ fontSize: 16, marginTop: '4px', color: "#0C6395" }} />
                <div className='like_comment_padding'>{post.viewer_counter}</div>
                <ThumbUpIcon sx={{ fontSize: 12, marginTop: '6px', color: "#0C6395" }} />
                <div className='like_comment_padding'>{post.like_user_counter}</div>
                {/* <ThumbDownIcon sx={{ fontSize: 15, color: "#0C6395" }} />
                <div className='like_comment_padding'>{post.dislike_user_counter}</div> */}
                <FaComments style={{ fontSize: 12, marginTop: '6px', color: "#0C6395" }} />
                <div className='like_comment_padding'>{post.comment_counter}</div>
                <ShareIcon sx={{ fontSize: 12, marginTop: '6px', color: "#0C6395" }} />
                <div className='like_comment_padding'>{post.share_user_counter}</div>

              </Grid>
            </div>
          ))}
        </div>
        <Pagination
          onChange={(value) => setPage(value)}
          pageSize={postPerPage}
          total={total}
          current={page}
          showSizeChanger
          showQuickJumper
          onShowSizeChange={onShowSizeChange}
          itemRender={itemRender}
        />
      </div>
    </div>
  )
}

export default BlogContent
