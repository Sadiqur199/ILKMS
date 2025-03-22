import React, {useEffect, useState} from 'react'
import "./Comments.css"
import axios from '../../axios/axios';
import useAuth from '../../../hooks/authHooks';
import CommentForm from './CommentForm';
import Swal from "sweetalert2";
import {AiFillDelete} from "react-icons/ai";
import Badge from "react-bootstrap/Badge";
import Loading from "../Loading";


const CommentBlog = ({comment, ebookID, handleCommentList}) => {
    const [replies, setReplies] = useState([]);
    const {token, role} = useAuth();
    const [commentReply, setCommentReply] = useState(false);
    const [commentID, setCommentID] = useState("")
    const userRole = role ? role : localStorage.getItem("role")
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        axios.post("/api/blogs/usercommentsreplylist/",
            {
                blog_id: ebookID,
                comment_id: comment.id
            },
        )
            .then(response => {
                setReplies(response.data);
            })
            .catch(err =>
                console.log(err)
            )
    }, []);

    const handleCommentReplyList = () => {
        axios.post("/api/blogs/usercommentsreplylist/",
            {
                blog_id: ebookID,
                comment_id: comment.id
            },
        )
            .then(response => {
                setReplies(response.data);
            })
            .catch(err =>
                console.log(err)
            )
    }
    const handleWarning = (id) => {
        Swal.fire({
            title: 'আপনি কি এ ব্যাপারে নিশ্চিত',
            text: "আপনি এই কমেন্ট  পুনরুদ্ধার করতে পারবেন না ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'বাদ দিন',
            confirmButtonText: 'হ্যাঁ, এটি মুছুন!'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(id)
            }
        })
    }
    const handleWarningReply = (id) => {
        Swal.fire({
            title: 'আপনি কি এ ব্যাপারে নিশ্চিত',
            text: "আপনি এই কমেন্ট  পুনরুদ্ধার করতে পারবেন না ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'বাদ দিন',
            confirmButtonText: 'হ্যাঁ, এটি মুছুন!'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteReply(id)
            }
        })
    }
    const handleDeleteReply = async (id) => {
        setLoading(true)
        await axios.post(
            "/api/blogs/delete/comment/reply/", {
                jwt: token ? token : localStorage.getItem('access'),
                reply_id: id
            })
            .then(response => {
                if (response.status === 200) {
                    setLoading(false)
                    Swal.fire(
                        'মুছে ফেলা হয়েছে!',
                        'কমেন্ট   মুছে ফেলা হয়েছে.',
                        'success'
                    )
                    handleCommentList();
                    handleCommentReplyList();
                }
            })
            .catch(error => {
                setLoading(false)
                Swal.fire(
                    'আপনি এই কমেন্ট মুছে ফেলতে পারবেন না',
                    `${error.response.data.detail}`,
                    'error'
                )
            })
    }
    const handleDelete = async (id) => {
        setLoading(true)
        await axios.post(
            "/api/blogs/delete/comment/", {
                jwt: token ? token : localStorage.getItem('access'),
                comment_id: id
            })
            .then(response => {
                if (response.status === 200) {
                    setLoading(false)
                    Swal.fire(
                        'মুছে ফেলা হয়েছে!',
                        'কমেন্ট   মুছে ফেলা হয়েছে.',
                        'success'
                    )
                    handleCommentList();
                    handleCommentReplyList();
                }
            })
            .catch(error => {
                setLoading(false)
                Swal.fire(
                    'আপনি এই কমেন্ট মুছে ফেলতে পারবেন না',
                    `${error.response.data.detail}`,
                    'error'
                )
            })
    }
    const handleCommentReply = (id) => {
        setCommentReply(true);
        setCommentID(id)
    }

    const addReplyComment = (text, parentID = ebookID, commentReplyID = commentID) => {
        if (token) {
            axios.post("/api/blogs/usercommentsreply/",
                {
                    blog_id: parentID,
                    reply: text,
                    comment_id: commentReplyID,
                    jwt: token,
                }
            )
                .then(response => {
                    setCommentID("");
                    setCommentReply(false);
                    handleCommentReplyList()

                })
                .catch(err => {
                    console.log(err);
                })
        }
    };


    return (
        <div className='comment'>

            <div className='comment-image-container'>
                <img
                    src={comment.user_id__profile_image ? `${axios.defaults.baseURL}/uploads/${comment.user_id__profile_image}` : "/images/profile.png"}
                    style={{
                        width: "40px",
                        height: "40px",
                        overflow: 'hidden',
                    }}/>
            </div>
            <div className='comment-right-part'>
                <div className='comment-content'>
                    <div className='comment-author'>
                        {comment.user_name}
                    </div>
                    <div>
                        {comment.created_date.slice(0, 10)}
                    </div>
                </div>
                <div className='comment-text'>
                    {comment.comment}
                </div>
                <div className='comment-actions'>
                    {token &&
                        <div className='flex_div'>
                            <div className='comment-action'
                                 onClick={() => handleCommentReply(comment.id)}>Reply
                            </div>
                            <div>
                                {loading ?
                                    <Loading/>
                                    :
                                <Badge bg="danger" onClick={() => handleWarning(comment.id)}>
                                    <AiFillDelete fontSize={25}/>
                                </Badge>
                                }
                            </div>
                        </div>
                    }
                </div>
                {commentReply &&
                    <CommentForm submitLabel="জমা দিন" handleSubmit={addReplyComment}/>
                }
                {replies.length > 0 && (
                    <div className='replies'>
                        {replies.map((reply) => (
                            <div className='comment' key={reply.id}>
                                <div className='comment-image-container'>
                                    <img
                                        src={reply.user_id__profile_image ? `${axios.defaults.baseURL}/uploads/${reply.user_id__profile_image}` : "/images/profile.png"}
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            overflow: 'hidden'
                                        }}/>
                                </div>
                                <div className='comment-right-part'>
                                    <div className='comment-content'>
                                        <div className='comment-author'>
                                            {reply.user_name}
                                        </div>
                                    </div>
                                    <div className='comment-text flex_div'>
                                        {reply.reply}
                                        {token &&
                                            <>
                                            {loading ?
                                                <Loading/>
                                                :
                                            <Badge bg="danger" onClick={() => handleWarningReply(reply.id)}>
                                                <AiFillDelete fontSize={25}/>
                                            </Badge>
                                            }
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>


        </div>
    )
}
export default CommentBlog
