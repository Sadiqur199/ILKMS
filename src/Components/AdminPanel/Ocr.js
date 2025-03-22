import React, {useEffect, useState} from 'react';
import axios from "../axios/axios";
import useAuth from "../../hooks/authHooks";
import {Download, Downloading} from "@mui/icons-material";
import {BackwardFilled, RollbackOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import DropdownList from "react-widgets/DropdownList";
import Loading from "../Common/Loading";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {toast} from "react-toastify";

const Ocr = () => {
    const [file, setFile] = useState(null);
    const [ocrResult, setOcrResult] = useState(null);
    const [page, setPage] = useState('');
    const [cover, setCover] = useState(null);
    const [ocrResultLoading, setOcrResultLoading] = useState(false);
    const {token, marginDiv} = useAuth();
    const navigate = useNavigate()
    const [category, setCategory] = React.useState("");
    const [getCategoryList, setGetCategoryList] = React.useState([]);
    const [ocrId, setOcrId] = React.useState([]);
    useEffect(() => {
        ActionCategoryList();
    }, [])

    const ActionCategoryList = async () => {
        const response = await axios.get(
            "/api/category/"
        );
        setGetCategoryList(response.data);
    };


    const handleFile = (event) => {
        setFile(event.target.files[0]);
        setOcrResult(null);
        setCover(null)
    };
    const handleNavigate = () => {
        navigate('/admin/ocr/list')
    }

    const fileSubmit = () => {
        if (file && category) {
            setOcrResultLoading(true);
            const formData = new FormData();
            formData.append('jwt', token);
            formData.append('category_type', category);
            if (file) {
                formData.append('pdf', file, file.name);
            } else {
                formData.append('pdf', file);
            }
            axios.post("/api/ocr/create/", formData,
                {
                    headers: {'Content-Type': 'multipart/form-data'}
                }
            )
                .then(response => {
                    if (response.status === 200) {
                        setOcrResultLoading(false);
                        setOcrResult(response.data.data.Text)
                        setCover(response.data.data.cover)
                        setPage(response.data.data.total_page)
                        setOcrId(response.data.data.id)
                        toast.success("সফলভাবে সাবমিট হয়েছে")

                    }
                })
                .catch(error => {
                    setOcrResultLoading(false);
                    if (error.response && error.response.status === 403) {

                        alert(error.response.data.detail);
                    } else if (error.request) {

                        alert(error.request);
                    } else {
                        setOcrResultLoading(false);
                        alert('Error', error.detail);
                    }
                })
        } else {
            alert("ফাইল এবং ক্যাটাগরি টাইপ নির্বাচন করুন")
        }
    }

    const handleContent = (event, editor) => {
        const data = editor.getData();
        setOcrResult(data);

    }
    const update = () => {
        setOcrResultLoading(true);
        axios.post(
            `/api/ocr/list/details/`, {
                jwt: token ? token : localStorage.getItem('access'),
                ocr_id: ocrId,
                text_content: ocrResult
            }
        )
            .then(response => {
                if (response.status === 200) {
                    setOcrResultLoading(false);
                    setOcrResult(response.data.data[0].text_content)
                    setPage(response.data.data[0].total_page)
                    setCover(response.data.data[0].cover)
                    navigate('/admin/ocr/list')
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
                        তৈরি করুন
                        <div className='float-end'>
                            <button onClick={handleNavigate} className='btn btn-md '><RollbackOutlined
                                fontSize={40}/> অপটিক্যাল ক্যারেক্টার রেকগনিশন লিস্ট ফেরত যান
                            </button>
                        </div>
                    </div>

                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">ক্যাটাগরি টাইপ</label>
                                    <DropdownList
                                        required={true}
                                        dataKey="id"
                                        textField="name"
                                        value={category}
                                        placeholder='ক্যাটাগরি টাইপ'
                                        onChange={value => setCategory(value.name)}
                                        data={getCategoryList}
                                    />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="form-group">
                                    <label form="ocr">Select File For OCR </label>
                                    <input type="file" className="form-control-file" id="ocr"
                                           accept={".pdf,.jpg,.jpeg,.png"}
                                           required={true}
                                           onChange={handleFile}/>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className='card-footer'>
                        <div className="form-group float-start">
                            <button className="btn btn-primary" onClick={fileSubmit}>Submit</button>
                        </div>
                    </div>

                </div>
                {ocrResultLoading && (
                    <Loading/>
                )}
                {ocrResult && (
                    <div className='card mt-4'>
                        <div className='card-header'>
                            <h6 className='text-info text-center'>
                                Result
                            </h6>
                            <h6>Total Page Count:{page}</h6>
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
                           {/* <div dangerouslySetInnerHTML={{__html: ocrResult ? ocrResult : ''}}/>*/}


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
                        <div className='card-footer'>
                            {ocrResult && (
                                <div className="form-group">
                                    <button className="btn btn-primary" onClick={update}>Update</button>
                                </div>
                            )}

                        </div>
                    </div>
                )}
            </div>

        </>
    );
};

export default Ocr;