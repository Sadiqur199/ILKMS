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
const Upload = () => {
    const accessToken = localStorage.getItem('access');
    if (!accessToken) {
        window.location.href = "/login"
    }
    const {token,marginDiv} = useAuth();
    const navigate = useNavigate()
    const [file, setFile] = useState("");


    const customAxios = axios.create({
        baseURL: "http://bhumipedia.land.gov.bd",
    });

    const handleFile = (event) => {
        setFile(event.target.files[0]);
    };
    const upload = () => {
        const formData = new FormData();
        if (file) {
            formData.append('file', file, file.name);
        } else {
            formData.append('file', file);
        }
        customAxios.post("/api/v1/upload-file/", formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `${token ? token : accessToken}`
                }
            }
        )
            .then(result => {
              setFile("")
              Swal.fire(
                  'সফলভাবে আপলোড হয়েছে',
                  `${result.data.message}`,
                  'success'
              )
            })
            .catch(error => {
                if (error.response && error.response.status === 403) {
                    Swal.fire(
                        'অনুরোধ ব্যর্থ হয়েছে',
                        `${error.response.data.error}`,
                        'failure'
                    )
                } else if (error.request) {
                    Swal.fire(
                        'অনুরোধ ব্যর্থ হয়েছে',
                        `${error.response.data.error}`,
                        'failure'
                    )
                } else {
                    Swal.fire(
                        'অনুরোধ ব্যর্থ হয়েছে',
                        `${error.response.data.error}`,
                        'failure'
                    )
                }
            })
    }

    return (


    <div className='category_main_div' style={{ marginLeft: marginDiv ? '155px' : '50px' }}>
        <Helmet>
            <title>ব্যাকআপ সমূহ</title>
        </Helmet>
        <div className='card mt-4'>
            <div className='card-header text-center'>
                <b style={{
                    color: '#0c6395',
                }}>
                    আপলোড তথ্য
                </b>
            </div>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div>
                            <p>যোগ করুন</p>
                            <input
                              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                id="image-upload"
                                type="file"
                                onChange={handleFile}
                            />
                        </div>
                    </div>
                    </div>
            </div>
            <div className='card-footer'>
                <div className='row'>
                    <div className='col-md-12'>
                        <button className='btn btn-success' onClick={upload}>আপলোড</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Upload
