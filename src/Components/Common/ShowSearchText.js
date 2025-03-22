import React, {useState} from 'react'
import useAuth from '../../hooks/authHooks'
import "./ShowSearchText.css"
import {Helmet} from 'react-helmet'
import {Link} from 'react-router-dom'
import {BiLeftArrowAlt, BiPlus} from 'react-icons/bi'
import HighlightedText from './HighlightedText'
import SearchText from './SearchText'
import Loading from "./Loading";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import {AiFillDelete} from "react-icons/ai";

const ShowSearchText = () => {
    const {searchData, marginDiv, query} = useAuth();
    return (
        <div className='search_text_main' style={{marginLeft: marginDiv ? '155px' : '50px'}}>
            <Helmet>
                <title>সার্চ</title>
            </Helmet>
            <div className='topSearchDIv'>
                {/* <PageLink /> */}
                <SearchText/>
            </div>
            <div className='search_content'>
                <div className='search_content_header'>
                    <div style={{color: '#0C6395'}}>
                        <Link to='/'>
                            <BiLeftArrowAlt style={{marginTop: '-3px', fontSize: '25px'}}/>
                        </Link>
                        &nbsp;&nbsp;অনুসন্ধান ফলাফল&nbsp;&nbsp;
                    </div>
                </div>
                <div className='search_inner_content'>

                    <div className='search_loop_div'>
                        {localStorage.getItem("query") ?
                            <>
                                <p><b>আপনি "{query}" এর জন্য অনুসন্ধান করেছেন।</b></p>
                                {searchData.map((result) => (
                                    <div key={result.id} className="single_search">
                                        <div className='overflowDiv'>
                                            {result.type === "ACTS" || result.type === "Blog" || result.type === "Forum" || result.type === "SECTIONS" || result.type === "SUBSECTIONS" ?
                                                <div>
                                                    {(result.type === "ACTS" || result.type === "SUBSECTIONS" || result.type === "SECTIONS") && (
                                                        <>
                                                            {result.ebooks_type === "আইন" || result.ebooks_type === "অধ্যাদেশ" || result.ebooks_type === "রাষ্ট্রপতির আদেশ" || result.ebooks_type === "বিধিমালা" ?
                                                                <Link to={"/ebook/temp/view/" + result.id}>
                                                                    <b><HighlightedText
                                                                        text={result.heading ? result.heading : ''}/></b>
                                                                </Link>
                                                                :
                                                                <Link to={"/ebook/view/" + result.id}>
                                                                    <b><HighlightedText
                                                                        text={result.heading ? result.heading : ''}/></b>
                                                                </Link>
                                                            }
                                                            <Badge bg="info">
                                                                {result.ebooks_type}
                                                            </Badge>
                                                        </>
                                                    )}
                                                    {result.type === "Blog" && (
                                                        <Link to={"/blog/" + result.id}>
                                                            <b><HighlightedText
                                                                text={result.heading ? result.heading : ''}/></b>
                                                            <Badge bg="info">
                                                                {result.type}
                                                            </Badge>
                                                        </Link>
                                                    )}

                                                    {result.type === "Forum" && (
                                                        <Link to={"/forum/view/" + result.id}>
                                                            <b><HighlightedText
                                                                text={result.heading ? result.heading : ''}/></b>
                                                            <Badge bg="info">
                                                                {result.type}
                                                            </Badge>
                                                        </Link>
                                                    )}
                                                </div>
                                                :
                                                <>
                                                    <Link to={"/search/content/" + result.id}>
                                                        <b><HighlightedText
                                                            text={result.heading ? result.heading : ''}/></b>
                                                    </Link>
                                                </>
                                            }

                                            {result.type === "ACTS" || result.type === "SECTIONS" || result.type === "SUBSECTIONS" || result.type === "Blog" || result.type === "Forum" ?
                                                <Link to={"/ebook/temp/view/" + result.id}>
                                                    <div>
                                                        {(!result.heading) && (
                                                            <Badge bg="info">
                                                                {result.type}
                                                            </Badge>
                                                        )}

                                                        <div dangerouslySetInnerHTML={{__html: result.content}}
                                                             className='most_read_blog_content'/>
                                                        <p className="read-more"></p>
                                                    </div>

                                                </Link>
                                                :
                                                <>
                                                    <div dangerouslySetInnerHTML={{__html: result.content}}
                                                         className='most_read_blog_content'/>
                                                    <p className="read-more"></p>
                                                </>
                                            }


                                        </div>

                                    </div>
                                ))}
                                {searchData.length === 0 && (
                                    <p style={{color: 'red'}}>দুঃখিত! আপনার অনুসন্ধান এর জন্য কোন ফলাফল পাওয়া যায়
                                        নাই</p>
                                )}
                            </>
                            :
                            <>
                                <p style={{color: 'red'}}>আপনি অনুসন্ধান এর জন্য তথ্য দিতে ভুলে গিয়েছেন।</p>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowSearchText
