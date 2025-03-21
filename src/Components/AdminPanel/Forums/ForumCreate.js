import React from 'react'
import useAuth from "../../../hooks/authHooks";
import axios from "../../axios/axios";
import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import {Button} from 'react-bootstrap';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {BackwardFilled} from "@ant-design/icons";
import {BiLeftArrowAlt} from "react-icons/bi";
import {toast} from "react-toastify";


const ForumCreate = () => {
    const {token} = useAuth();
    const accessToken = localStorage.getItem('access');
    if (!accessToken) {
        window.location.href = "/login"
    }
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [coverPhoto, setCoverPhoto] = useState("")
    const [loading, setLoading] = useState(false)
    const handleTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleContent = (event, editor) => {
        const data = editor.getData();
        setContent(data);
    }

    const handleCoverPhoto = (event) => {
        setCoverPhoto(event.target.files[0]);
    };

    const handleCreateAct = () => {
        setLoading(true)
        const formData = new FormData();
        formData.append('jwt', token);
        formData.append('name', title);
        formData.append('description', content);
        if (coverPhoto) {
            formData.append('thumbnail', coverPhoto, coverPhoto.name);
        } else {
            formData.append('thumbnail', coverPhoto);
        }
        axios.post("/api/forums/create/", formData,
            {
                headers: {'Content-Type': 'multipart/form-data'}
            }
        )
            .then(result => {
                setLoading(false)
                toast.success('ফোরাম সফলভাবে তৈরি হয়েছে')
                navigate("/admin/forums")
            })
            .catch(error => {
                if (error.response && error.response.status === 403) {

                    alert(error.response.data.detail);
                } else if (error.request) {

                    alert(error.request);
                } else {

                    alert('Error', error.detail);
                }
            })
    }
    return (
        <div className='Main'>
            <div className='Inner'>
                <div className='container-fluid'>
                    <div className="row">
                        <div className='col-md-12'>
                            <div className='card'>
                                <div className='card-header'>
                                    <b>ফোরাম যোগ করুন</b>
                                    <b className='float-end'>
                                        <Link to='/admin/forums'>
                                            <button className='btn btn-lg btn-info'>
                                                <BiLeftArrowAlt style={{marginTop: '-3px', fontSize: '25px'}}/>
                                                ফোরাম  সমূহ দেখুন
                                                <BackwardFilled style={{marginTop: '-3px', fontSize: '25px'}}/>
                                            </button>
                                        </Link>

                                    </b>
                                </div>
                                <div className='card-body'>
                                    <TextField required={true} fullWidth label="শিরোনাম" variant="outlined"
                                               className='text_field'
                                               value={title} onChange={handleTitle}
                                               inputProps={{style: {height: '15px'}}}/>
                                    <div style={{
                                        gap: '10px',
                                    }}>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        gap: '15px',
                                        flexDirection: 'column',
                                    }}>
                                        <div>
                                            <CKEditor className='text_field'
                                                      editor={ClassicEditor}
                                                      data={content}
                                                      onChange={handleContent}
                                                      config={{
                                                          placeholder: 'বিষয়বস্তু',
                                                          height: '2000'
                                                      }}
                                            />
                                        </div>

                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}>
                                        <div>
                                            <p>কভার ফটো যোগ করুন</p>
                                            <input
                                                accept="image/*"
                                                id="image-upload"
                                                type="file"
                                                onChange={handleCoverPhoto}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {loading ? (
                                    <div className='card-footer'>
                                        <Button variant='contained' className='float-end text-danger font-weight-bold'
                                                disabled={true}> <b>সাবমিট হচ্ছে...</b> </Button>
                                        <div className="spinner-border text-primary float-end" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <div className="spinner-border text-secondary float-end" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <div className="spinner-border text-success float-end" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <div className="spinner-border text-danger float-end" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <div className="spinner-border text-warning float-end" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <div className="spinner-border text-info float-end" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <div className="spinner-border text-light float-end" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='card-footer'>
                                        <Button variant='contained' className='text_field_sign'
                                                onClick={handleCreateAct}
                                        >
                                            সাবমিট</Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default ForumCreate
