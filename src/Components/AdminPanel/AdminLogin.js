import { Avatar, Grid, Paper } from '@mui/material'
import React, { useState, useEffect } from 'react'
import '../Common/Login.css'
import { AddCircleOutlineOutlined } from '@mui/icons-material'
import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet';
import axios from '../axios/axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/authHooks';

const AdminLogin = () => {
    const authContext = useAuth();
    const navigate = useNavigate()

    // const cookies = new Cookies();

    const [mobile, setMobile] = useState("")
    const [password, setPassword] = useState("")

    const handleMobile = (e) => {
        setMobile(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
useEffect(
    ()=>{
        if(localStorage.getItem('jwt')){
            navigate('/admin/dashboard')
        }
        else {
            navigate('/login')
        }
    },[]
)
    const handleApi = () => {
        console.log(mobile, password)
        axios.post("/api/login/", {
            phone_number: "+88" + mobile,
            password: password,
        })
            .then(result => {
                localStorage.setItem('jwt', result.data.jwt);
                // cookies.set("jwt", result.data.jwt);

                console.log(result.data.detail)
                authContext.setToken(result.data.jwt);
                if (localStorage.getItem('jwt')) {
                    navigate('/actinput')
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 403) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    alert(error.response.data.detail);
                } else if (error.request) {
                    // The request was made but no response was received
                    alert(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    alert('Error', error.detail);
                }
            })
    }
    return (
        <Grid className='login_up_dummy_div' style={{ marginLeft: authContext.marginDiv ? '155px' : '50px' }}>
            <Helmet>
                <title>অ্যাডমিন লগইন</title>
            </Helmet>
            <Paper elevation={20} className='login_up_content'>
                <Grid align='center' style={{ display: 'flex', marginTop: '-10px' }}>
                    <Avatar className='avatar_style' >
                        <AddCircleOutlineOutlined />
                    </Avatar>
                    <h5 style={{ padding: '10px' }}>লগইন</h5>
                </Grid>
                <form>
                    <TextField required={true} fullWidth label="মোবাইল নম্বর" variant="outlined" className='text_field'
                        value={mobile}
                        onChange={handleMobile}
                        inputProps={{ style: { height: '15px' } }} />
                    <TextField required={true} fullWidth type='password' label="পাসওয়ার্ড" variant="outlined" className='text_field'
                        value={password}
                        onChange={handlePassword}
                        inputProps={{ style: { height: '15px' } }} />
                    <Button variant='contained' className='text_field_login'
                        onClick={handleApi}
                    >লগইন</Button>
                </form>

            </Paper>
        </Grid>
    )
}

export default AdminLogin
