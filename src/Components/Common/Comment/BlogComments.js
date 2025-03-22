import axios from '../../axios/axios';
import React, {useEffect, useState} from 'react'
import "./Comments.css"
import Comment from "./Comment"
import CommentForm from './CommentForm';
import useAuth from '../../../hooks/authHooks';
import CommentBlog from "./CommentBlog";
import Swal from "sweetalert2";

const BlogComments = (id) => {
    const [data, setData] = useState([]);
    const {token} = useAuth();

    useEffect(() => {
        handleCommentList();
        /*        axios.post("/api/blogs/usercommentlist/",
                    {
                        blog_id: id.id
                    }

                )
                    .then(response => {
                        // console.log(response.data)
                        setData(response.data);
                    })
                    .catch(err =>
                        console.log(err)
                    )*/
    }, [id]);

    const handleCommentList = () => {
        axios.post("/api/blogs/usercommentlist/",
            {blog_id: id.id},
        )
            .then(response => {
                // console.log(response.data)
                setData(response.data);
            })
            .catch(err =>
                console.log(err)
            )
    }

    const addComment = (text, parentID = id.id) => {
        if (token) {
            axios.post("/api/blogs/usercomment/",
                {
                    blog_id: parentID,
                    user_comment: text,
                    jwt: token?token:localStorage.getItem("jwt")
                }
            )
                .then(response => {
                    // setData()
                    handleCommentList()
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            Swal.fire(
                'লগইন করুন',
                'আপনার মতামত জানানোর জন্য লগইন করুন',
                'question'
            )
        }
    };


    return (
        <div className='comments'>
            <div className='comments-title'>কমেন্টস</div>
            <div className='comment-form-title'>মতামত দিন</div>
            <CommentForm submitLabel="জমা দিন" handleSubmit={addComment}/>
            <div className='comments-container'>
                {data.map((eachData) => (
                    // <div key={eachData.id}>{eachData.comment}</div>
                    <CommentBlog key={eachData.id}
                                 comment={eachData}
                                 ebookID={id.id}
                                 handleCommentList={handleCommentList}
                    />
                ))}

            </div>
        </div>
    )
}

export default BlogComments
