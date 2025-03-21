import React, {useEffect, useState} from 'react';
import axios from "../axios/axios";
import useAuth from "../../hooks/authHooks";
import {Download, Downloading} from "@mui/icons-material";
import {BackwardFilled, EyeFilled, RollbackOutlined} from "@ant-design/icons";
import {useNavigate, useParams} from "react-router-dom";
import {Link} from "react-router-dom"
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const OcrDetails = () => {

    const [ocrResult, setOcrResult] = useState(null);
    const [cover, setCover] = useState(null);
    const [page, setPage] = useState('');
    const [ocrResultLoading, setOcrResultLoading] = useState(false);
    const [ocr, setOcr] = useState([]);
    const {token, marginDiv} = useAuth();
    const navigate = useNavigate()
    let params = useParams()
    useEffect(() => {
        setOcrResultLoading(true);
        axios.post(
            `/api/ocr/list/details/`, {
                jwt: token ? token : localStorage.getItem('access'),
                ocr_id: params.id
            }
        )
            .then(response => {
                if (response.status === 200) {
                    setOcrResultLoading(false);
                    setOcrResult(response.data.data[0].text_content)
                    setPage(response.data.data[0].total_page)
                    setCover(response.data.data[0].cover)
                    setOcr(response.data.data[0])
                }
            })
            .catch(error => {
                setOcrResultLoading(false);
                console.log(error)
            })

    }, []);


    const handleContent = (event, editor) => {
        const data = editor.getData();
        setOcrResult(data);

    }
    const update = () => {
        setOcrResultLoading(true);
        axios.post(
            `/api/ocr/list/details/`, {
                jwt: token ? token : localStorage.getItem('access'),
                ocr_id: params.id,
                text_content: ocrResult
            }
        )
            .then(response => {
                if (response.status === 200) {
                    setOcrResultLoading(false);
                    setOcrResult(response.data.data[0].text_content)
                    setPage(response.data.data[0].total_page)
                    setCover(response.data.data[0].cover)
                    setOcr(response.data.data[0])
                }
            })
            .catch(error => {
                setOcrResultLoading(false);
                console.log(error)
            })
    }


    return (
        <>
            <div className='category_main_div' style={{marginLeft: marginDiv ? '155px' : '50px'}}>
                <div className='card mt-4'>
                    <div className='card-header'>
                        বিস্তারিত দেখুন
                        <div className='float-end'>
                            <Link to="/admin/ocr/list">
                                <button className='btn btn-md '><RollbackOutlined
                                    fontSize={40}/> অপটিক্যাল ক্যারেক্টার রেকগনিশন লিস্ট ফেরত যান
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className='card-body'>
                        {ocrResultLoading && (
                            <div className='row'>
                                <div className='col-md-12 text-center text-danger'>
                                    <h5>Please Wait !!! </h5>
                                    <div className="spinner-border text-success" role="status">
                                        <span className="sr-only"></span>
                                    </div>
                                    <div className="spinner-grow text-primary" role="status">
                                        <span className="sr-only"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {ocrResult && (
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='card'>
                                        <div className='card-header'>
                                            <h6 className='text-info text-center'>
                                                পৃষ্ঠা :{page} , তৈরীর তারিখ: {ocr.created_date_time} ,ক্যাটাগরি টাইপ
                                                : {ocr.category_type}
                                            </h6>
                                        </div>
                                        <div className='card-body'>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <div className='text-center'>
                                                        <img src={cover ?
                                                            axios.defaults.baseURL + "/uploads/" + cover
                                                            :
                                                            "https://bhumipedia.land.gov.bd/images/vumi_logo.png"}
                                                             style={{
                                                                 width: '45%',
                                                                 height: '10%',
                                                             }}/>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <a className='btn btn-lg btn-info'
                                                       href={cover ? axios.defaults.baseURL + "/uploads/" + cover : "https://bhumipedia.land.gov.bd/images/vumi_logo.png"}
                                                       download> <Downloading/>Click here to Open and Download Cover
                                                    </a>
                                                </div>
                                            </div>
{/*                                            <div
                                                dangerouslySetInnerHTML={{__html: ocrResult ? ocrResult : ''}}/>

                                            <hr/>
                                            <h3>Edit</h3>*/}
                                            <div>
                                                <CKEditor className='text_field'
                                                          editor={ClassicEditor}
                                                          data={ocrResult ? ocrResult : ''}
                                                          onChange={handleContent}
                                                          config={{
                                                              placeholder: 'বিষয়বস্তু',
                                                              height: '2000'
                                                          }}
                                                />
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}


                    </div>
                    <div className='card-footer'>
<button className='btn btn-md btn-info' onClick={update}>Update</button>
                    </div>

                </div>
            </div>

        </>
    );
};

export default OcrDetails;