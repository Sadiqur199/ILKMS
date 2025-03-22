import {Avatar, Grid, Paper} from '@mui/material'
import React, {useState, useEffect} from 'react'
import './Login.css'
import {AddCircleOutlineOutlined} from '@mui/icons-material'
import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button';
import {Helmet} from 'react-helmet';
import axios from '../axios/axios';
import {useNavigate} from 'react-router-dom';
import useAuth from '../../hooks/authHooks';
import Loading from "./Loading";

const Forgot = () => {
    const authContext = useAuth();
    const navigate = useNavigate()

    // const cookies = new Cookies();

    const [mobile, setMobile] = useState("")
    const [send, setSend] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [loading, setLoading] = useState(false)


    const handleForgot = () => {
        setLoading(true)
        axios.post("/api/forget_password/otp/get/", {
            phone_number: mobile,
        })
            .then(result => {
                setLoading(false)
                if (result.status === 200) {
                    setSend(result.data)
                } else {
                    alert("ওটিপি পাঠানো হয়নি")
                }
            })
            .catch(error => {
                setLoading(false)
                if (error.response && error.response.status === 403) {
                    alert(error.response.data.detail);
                } else if (error.request) {
                    alert(error.request);
                } else {
                    alert('Error', error.detail);
                }
            })
    }
    const handleForgotSubmit = () => {
        setLoading(true)
        axios.post("/api/forget_password/otp/set/", {
            phone_number: mobile,
            otp: otp,
            new_password: newPassword,
            confirm_new_password: confirm
        })
            .then(result => {
                setLoading(false)
                if (result.status === 200) {
                    navigate('/login')
                } else {
                    alert("ওটিপি পাঠানো হয়নি")
                }
            })
            .catch(error => {
                setLoading(false)
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
        <Grid className='login_up_dummy_div' style={{marginLeft: authContext.marginDiv ? '155px' : '50px'}}>
            <Helmet>
                <title>লগইন</title>
            </Helmet>
            <Paper elevation={20} className='login_up_content'>
                <Grid align='center' style={{display: 'flex', marginTop: '-10px'}}>
                    <Avatar className='avatar_style'>
                        <AddCircleOutlineOutlined/>
                    </Avatar>
                    <h5 style={{padding: '10px'}}>পাসওয়ার্ড ভুলে গেছেন</h5>
                </Grid>
                <form>

                    <TextField required={true} fullWidth label="মোবাইল নম্বর" variant="outlined" className='text_field'
                               value={mobile}
                               onChange={event =>
                                   setMobile(event.target.value)
                               }
                               inputProps={{style: {height: '15px'}}}/>
                    {send !== "" &&
                        <>
                            <TextField required={true} fullWidth label="ওটিপি" variant="outlined" className='text_field'
                                       value={otp}
                                       onChange={event =>
                                           setOtp(event.target.value)
                                       }
                                       inputProps={{style: {height: '15px'}}}/>
                            <TextField type={"password"} required={true} fullWidth label="নতুন পাসওয়ার্ড"
                                       variant="outlined" className='text_field'
                                       value={newPassword}
                                       onChange={event =>
                                           setNewPassword(event.target.value)
                                       }
                                       inputProps={{style: {height: '15px'}}}/>

                            <TextField type={"password"} required={true} fullWidth label="নতুন পাসওয়ার্ড নিশ্চিত করুন"
                                       variant="outlined" className='text_field'
                                       value={confirm}
                                       onChange={event =>
                                           setConfirm(event.target.value)
                                       }
                                       inputProps={{style: {height: '15px'}}}/>


                        </>
                    }
                    {loading ?
                        <Loading/>
                        :
                    <>
                        {send == "" &&
                            <Button variant='contained' className='btn btn-lg btn-block mt-2'
                                    onClick={handleForgot}
                            >ওটিপি পাঠান</Button>
                        }
                        {send !== "" &&
                            <Button variant='contained' className='btn btn-lg btn-block mt-2'
                                    onClick={handleForgotSubmit}
                            >পাসওয়ার্ড রিসেট</Button>
                        }
                    </>
                    }


                </form>

            </Paper>
        </Grid>
    )
}

export default Forgot
