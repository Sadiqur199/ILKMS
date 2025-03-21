import React from 'react'
import AddSomething from '../AddSomething'
import {useState, useEffect} from 'react'
import axios from "../../axios/axios";
import {Link, Route, useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";
import {AiFillCarryOut, AiFillCloseCircle, AiFillDelete} from "react-icons/ai";
import useAuth from "../../../hooks/authHooks";
import {convertToBengaliNumber} from "../../../numberConverter";
import Typography from "@mui/material/Typography";
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import {Stack} from "@mui/material";
import Badge from 'react-bootstrap/Badge';
import {Button} from "react-bootstrap";
import {Helmet} from "react-helmet";
import PageLink from "../../Common/PageLink";
import {EyeFilled} from "@ant-design/icons";
const Backup = () => {
    const accessToken = localStorage.getItem('access');
    if (!accessToken) {
        window.location.href = "/login"
    }
    const {token,marginDiv} = useAuth();


/*    useEffect(() => {
        backup();
    }, []);*/
    const customAxios = axios.create({
        baseURL: "http://bhumipedia.land.gov.bd",
    });

    const backup = async () => {
        try {
            const response = await customAxios.get(
                "/api/v1/download-data/",
                {
                    headers: {
                        Authorization: `${token ? token : accessToken}`
                    }
                }
            );
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'data.xlsx';
            link.click();



            } catch (error) {
            // Handle the error here
            console.error("An error occurred while making the request:", error);
        }
    };

    return (


    <div className='category_main_div' style={{ marginLeft: marginDiv ? '155px' : '50px' }}>
        <Helmet>
            <title>ব্যাকআপ সমূহ</title>
        </Helmet>
        <div className='card mt-4'>
            <div className='card-header text-center'>
                <b style={{
                    color: '#0c6395',
                }}>ব্যাকআপ তথ্য</b>
            </div>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-md-12'>
                        <btn onClick={backup}>Click here to Download </btn>
                    </div>
                    </div>

            </div>
        </div>
    </div>
    )
}

export default Backup
