import axios from '../../axios/axios';
import React, {useEffect, useState} from 'react'
import "./Comments.css"
import Comment from "./Comment"
import CommentForm from './CommentForm';
import useAuth from '../../../hooks/authHooks';
import CommentForum from "./CommentForum";
import Swal from "sweetalert2";

const ForumComments = (id) => {
    const [data, setData] = useState([]);
    const {token} = useAuth();

    useEffect(() => {
        axios.post("/api/forums/usercommentlist/",
            {forum_id: id.id},
        )
            .then(response => {
                setData(response.data);
            })
            .catch(err =>
                console.log(err)
            )
    }, [id]);

    const handleCommentList = () => {
        axios.post("/api/forums/usercommentlist/",
            {forum_id: id.id},
        )
            .then(response => {
                setData(response.data);
            })
            .catch(err =>
                console.log(err)
            )
    }

    const addComment = (text, parentID = id.id) => {
        if (token) {
            axios.post("/api/forums/usercomment/",
                {
                    forum_id: parentID,
                    user_comment: text,
                    jwt: token,
                }
            )
                .then(response => {
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
                    <CommentForum key={eachData.id}
                                  comment={eachData}
                                  ebookID={id.id}
                                  handleCommentList={handleCommentList}
                    />
                ))}

            </div>
        </div>
    )
}

export default ForumComments
