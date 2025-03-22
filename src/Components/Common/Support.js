import React, {useEffect, useState} from 'react'
import './EbookView.css'
import axios from '../axios/axios'
import {useParams} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import useAuth from '../../hooks/authHooks';
import TextField from "@mui/material/TextField";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {Button} from "react-bootstrap";


function Support() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")


    const handleName = (event) => {
        setName(event.target.value);
    };
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handleMessage = (event, editor) => {
        const data = editor.getData();
        setMessage(data)
    };


    const submitSupport = () => {
        try {
          // required name email message
            if (name == "") {
                alert("Please enter your name")
                return
            }
            if (email == "") {
                alert("Please enter your email")
                return
            }
            if (message == "") {
                alert("Please enter your message")
                return
            }
            const response = axios.post('api/support/', {
                    name: name,
                    email: email,
                    text: message
                }
            )
                .then((response) => {
                    alert("Your message has been sent successfully")
                    setName("")
                    setEmail("")
                    setMessage("")

                })

        } catch (e) {
            console.log(e)
        }
    }


    const {marginDiv} = useAuth()
    return (
        <div className='ebook_view_main' style={{marginLeft: marginDiv ? '155px' : '50px', transition: '.5s'}}>
            <Helmet>
                <title>Support</title>
            </Helmet>
            <div style={{marginTop: '10px', fontFamily: 'Kalpurush', padding: '10px 30px'}}>
                <h3><b>Support Ministry of Land</b></h3>
            </div>
            <h6 className='p-5'>
                <form action="#" className="contact-form">
                    <p className="description">
                        Feel free to contact us if you need any assistance, any help or another
                        question.
                    </p>
                    <div>
                        <TextField required={true} fullWidth label="name" variant="outlined"
                                   className='text_field' value={name} onChange={handleName}
                                   inputProps={{style: {height: '15px'}}}/>
                        <TextField required={true} fullWidth label="Email" variant="outlined"
                                   className='text_field'
                                   value={email} onChange={handleEmail}
                                   inputProps={{style: {height: '15px'}}}/>

                    </div>
                    <div className='pt-2'>
                        <CKEditor className='text_field'
                                  editor={ClassicEditor}
                                  data={message}
                                  onChange={handleMessage}
                                  config={{
                                      placeholder: 'Your Message'
                                  }}
                        />
                    </div>
                    <div className="submit-button-wrapper">
                        <Button variant='contained' className='text_field_sign' onClick={submitSupport}
                        >
                            সাবমিট</Button>
                    </div>
                </form>


            </h6>
        </div>
    )
}

export default Support
