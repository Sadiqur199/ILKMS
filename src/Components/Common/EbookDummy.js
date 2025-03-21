import React, {useEffect, useState} from 'react'
import {Grid, Paper} from '@mui/material'
import axios from '../axios/axios'
import {Pagination} from 'antd'

import './EbookDummy.css'
import PageLink from './PageLink'
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {FaComments} from 'react-icons/fa';
import {Helmet} from 'react-helmet';
import useAuth from '../../hooks/authHooks';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Routes
} from "react-router-dom";

const EbookDummy = () => {
    const {marginDiv} = useAuth()
    const [posts, setPosts] = useState([]);
    const [total, setTotal] = useState("");
    const [page, setPage] = useState(0);
    const [postPerPage, setPostPerPage] = useState(10);
    const [filter, setFilter] = useState()

    const [searchTerm, setSearchTerm] = useState(''); // State to store the search term

    const handleSearch = (e) => {
        setSearchTerm(e.target.value); // Update search term as user types
    };

    // Filter posts based on the search term


    useEffect(() => {
        loadEbookPosts();
    }, [filter], [searchTerm]);


    const loadEbookPosts = async () => {
        const response = await axios.get(
            "/api/ebook/"
        );
        let filteredPosts = response.data;
        if (filter) {
            filteredPosts = filteredPosts.filter((post) => post.ebooks_type === filter);
        }
        if (searchTerm) {
            filteredPosts = filteredPosts.filter((post) =>
                post.title_of_act.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setPosts(filteredPosts);
        setTotal(filteredPosts.length);
    };
    const changeFilter = (e) => {
        setFilter(e.target.value)
    }
    const indexofLastPage = page + postPerPage;
    const indexofFirstPage = indexofLastPage - postPerPage;
    const currentPosts = posts.slice(indexofFirstPage, indexofLastPage);

    const onShowSizeChange = (current, pageSize) => {
        setPostPerPage(pageSize);
    };
    const resetFilter = () => {
        setFilter(""); // Clear the filter
        loadEbookPosts(); // Reload all posts
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
        <div className='ebook_dummy_main' style={{marginLeft: marginDiv ? '155px' : '50px', transition: '.5s'}}>
            <Helmet>
                <title>ই-বুক লিস্ট</title>
            </Helmet>
            <div>
                <PageLink/>
            </div>
            <div className='ebook_content'>
                <div className='card'>
                    <div className='card-header'>
                        <div className="row">
                            <div className='col-md-3'>
                                <input
                                    type='search'
                                    className='form-control'
                                    placeholder='Search by title...'
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </div>
                            <div className='col-md-3'>
                                <button
                                    className={`btn btn-md btn-danger`}
                                    onClick={loadEbookPosts}
                                >
                                    অনুসন্ধান করুন
                                </button>
                            </div>
                            <div className='col-md-3'>
                                <button
                                    className="btn btn-md btn-danger "
                                    onClick={resetFilter}
                                >
                                    রিসেট
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='card-header'>
                        <div className="row overflow-auto">
                            {['আইন', 'অধ্যাদেশ', 'রাষ্ট্রপতির আদেশ', 'বিধিমালা', 'নীতিমালা', 'নির্দেশিকা', 'পরিপত্র', 'প্রজ্ঞাপন', 'ম্যানুয়াল', 'গেজেট ', 'অন্যান্য'].map((filterOption) => (
                                <div className='col-md-1' key={filterOption + 1}>
                                    <button
                                        className={`btn btn-md btn-info ${filter === filterOption ? 'active' : ''}`}
                                        value={filterOption}
                                        onClick={changeFilter}
                                    >
                                        {filterOption}
                                    </button>
                                </div>
                            ))}
                            <div className='row mt-1'>


                            </div>
                        </div>
                    </div>
                    <div className='book_content_div card-body'>
                        {currentPosts.map((post) => (
                            // <h6 key={post.ebook_id} className='book_content'><img src={post.ebook_cover} className='blog_cover'/></h6>
                            // <h6 key={post.ebook_id} className='book_content'>{post.ebook_description}</h6>
                            <div key={post.id} className='book_content_margin_div'>
                                <Paper elevation={5} className='book_image_div'>
                                    {post.ebooks_type === 'আইন' || post.ebooks_type === "অধ্যাদেশ" || post.ebooks_type === "রাষ্ট্রপতির আদেশ" || post.ebooks_type === "বিধিমালা"
                                        ?
                                        <Link to={"/ebook/comment/" + post.id}> <img src={post.cover}
                                                                                     className='book_image'/></Link>
                                        :

                                        <Link to={"/details/" + post.id}> <img src={post.cover}
                                                                               className='book_image'/></Link>

                                    }

                                </Paper>
                                {/* <ShareIcon sx={{ fontSize: 10, color: "#0C6395" }} /> */}
                                <Grid className='book_title_div'>
                                    <Link to={"/ebook/comment/" + post.id}>
                                        <h6 style={{
                                            fontSize: '12px',
                                        }}>
                                            {post.title_of_act}

                                        </h6>

                                    </Link>

                                </Grid>

                                <Grid style={{display: 'flex', marginTop: '5px'}}>
                                    <VisibilityIcon sx={{fontSize: 16, marginTop: '4px', color: "#0C6395"}}/>
                                    <div className='like_comment_padding'>{post.viewer_counter}</div>
                                    <ThumbUpIcon sx={{fontSize: 12, marginTop: '6px', color: "#0C6395"}}/>
                                    <div className='like_comment_padding'>{post.like_user_counter}</div>
                                    {/* <ThumbDownIcon sx={{ fontSize: 15, color: "#0C6395" }} /> */}
                                    {/* <div className='like_comment_padding'>{post.dislike_user_counter}</div> */}
                                    <FaComments style={{fontSize: 12, marginTop: '6px', color: "#0C6395"}}/>
                                    <div className='like_comment_padding'>{post.comment_counter}</div>

                                </Grid>
                                <small className='float-end text-info'>{post.ebooks_type}</small>

                            </div>
                        ))}
                    </div>
                    <div className='card-footer text-center'>
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

            </div>
        </div>
    )
}

export default EbookDummy
