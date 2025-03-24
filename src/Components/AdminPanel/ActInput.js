import React from 'react'
import './ActInput.css'
import AddSomething from './AddSomething'
import {useState, useEffect} from 'react'
import axios from '../axios/axios'
import {Link, useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";
import {AiFillDelete, AiFillFilePdf} from "react-icons/ai";
import {FaFilePdf} from "react-icons/fa";
import useAuth from "../../hooks/authHooks";
import {EyeFilled, FilePdfOutlined} from "@ant-design/icons";
import {convertToBengaliNumber} from "../../numberConverter";
import {Helmet} from "react-helmet";
import Badge from "react-bootstrap/Badge";
import {Box, Button, IconButton, Modal, Stack, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Loading from "../Common/Loading";
import {styled} from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import {toast} from "react-toastify";


const ActInput = () => {
    const accessToken = localStorage.getItem('access');
    if (!accessToken) {
        window.location.href = "/login"
    }
    const [actList, setActList] = useState([])
    const navigate = useNavigate()
    const {token, marginDiv} = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);


    const AntSwitch = styled(Switch)(({theme}) => ({
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
        '&:active': {
            '& .MuiSwitch-thumb': {
                width: 15,
            },
            '& .MuiSwitch-switchBase.Mui-checked': {
                transform: 'translateX(9px)',
            },
        },
        '& .MuiSwitch-switchBase': {
            padding: 2,
            '&.Mui-checked': {
                transform: 'translateX(12px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
            width: 12,
            height: 12,
            borderRadius: 6,
            transition: theme.transitions.create(['width'], {
                duration: 200,
            }),
        },
        '& .MuiSwitch-track': {
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor:
                theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
            boxSizing: 'border-box',
        },
    }));

    const action = async (id) => {
        const response = await axios.post(
            "/api/features/items/", {
                jwt: token ? token : localStorage.getItem('jwt'),
                type: "আইন",
                type_id: id
            });
        if (response.status === 200) {
            Swal.fire(
                'অবস্থা!',
                response.data.message,
                'success'
            )
           loadActList()
        }
        else {
            Swal.fire(
                'Status!',
                'Something went wrong',
                'error'
            )
        }
    }





    useEffect(() => {
        loadActList();
    }, []);
    const loadActList = async () => {
        const response = await axios.get(
            "/api/acts/"
        );
        setActList(response.data);
    };
    const handleNavigate = () => {
        navigate('/createact')
    }
    const handleAction = () => {
        navigate('/action')
    }
    const handleWarning = (id, year) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this Act!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(id, year)
            }
        })
    }
    const handleDelete = async (id, year) => {
        const response = await axios.post(
            "/api/act/delete/", {
                jwt: token,
                act_id: id,
                act_year: year,
                section_id: null,
                sub_section_id: null,
                schedule_id: null,
                sub_schedule_id: null
            });
        if (response.status === 200) {
            Swal.fire(
                'Deleted!',
                'Act has been deleted.',
                'success'
            )
            loadActList();
        }
    }
    const [file, setFile] = useState("")
    const handleFile = (event) => {
        setFile(event.target.files[0]);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        if (!file) {
            alert("Please select a file to upload");
            return;
        }
        const formData = new FormData();
        formData.append('jwt', token);
        formData.append('act_id', isModalOpen);
        if (file) {
            formData.append('pdf', file, file.name);
        }
        axios.post("/api/act/system_generated_pdf/", formData,
            {
                headers: {'Content-Type': 'multipart/form-data'}
            }
        )
            .then(result => {
                setIsModalOpen(false)
                setLoading(false)
                toast.success('আইন পিডিএফ যোগ করা হয়েছে')
            })
            .catch(error => {
                if (error.response && error.response.status === 403) {

                    alert(error.response.data.detail);
                } else if (error.request) {

                    alert(error.request);
                } else {

                    alert('Error', error.detail);
                }
            });
    }
    return (
        <div className='category_main_div' style={{marginLeft: marginDiv ? '155px' : '50px'}}>
            <Helmet>
                <title>আইন সমূহ</title>
            </Helmet>
            <div className='card mt-4'>
                <div className='card-header text-center'>

                    <div className='float-start' onClick={handleAction}>
                        <AddSomething addText={" ইমপ্যাক্ট করুন "}/>
                    </div>

                    <b style={{
                        color: '#0c6395',
                    }}>আইন সমূহ</b>
                    <div className='float-end' onClick={handleNavigate}>
                        <AddSomething addText={" আইন লিপিবদ্ধকরুণ"}/>
                    </div>
                </div>
                <div className="table-responsive ">
                    <table className="table  table-bordered table-hover">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">সূচিপত্র</th>
                            <th scope="col">শিরোনাম</th>
                            <th scope="col">প্রকাশনা বছর</th>
                            <th scope="col">আইনের সংখ্যা</th>
                            <th scope="col">প্রকাশের তারিখ</th>
                            {/* <th scope="col">পরিদর্শন মূল আইন </th>
                                <th scope="col"> পরিদর্শন

                                    সর্বশেষ বলবৎ </th>*/}

                            <th scope="col">সর্বমোট ধারা</th>
                            <th scope="col">সর্বমোট উপধারা</th>
                            <th scope="col">সর্বমোট দফা</th>
                            <th scope="col">সর্বমোট উপদফা</th>
                            <th scope="col">ফিচার আইটেম </th>
                            <th scope="col">প্রক্রিয়া</th>
                        </tr>
                        </thead>
                        <tbody>


                        {actList.map((eachAct, index) => (
                            <tr key={index}>
                                <th scope="row"><Link
                                    to={"/ebook/temp/view/" + eachAct.id}>{convertToBengaliNumber(index + 1)}</Link>
                                </th>
                                {/* <td><Link to={"/createsection/" + eachAct.id}>{eachAct.title_of_act}</Link></td> */}
                                <td><Link to={"/ebook/temp/view/" + eachAct.id}>{eachAct.title_of_act}</Link></td>
                                <td>{convertToBengaliNumber(eachAct.act_year)}</td>
                                <td>{convertToBengaliNumber(eachAct.number)}</td>
                                <td>{convertToBengaliNumber(eachAct.publication_date)}</td>
                                {/* <td>
                                        <Link to={"/ebook/temp/view/" + eachAct.id}>
                                            <EyeFilled fontSize={25}/>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={"/last/act/view/" + eachAct.id}>
                                            <EyeFilled fontSize={25}/>
                                        </Link>
                                    </td>*/}

                                <td>{convertToBengaliNumber(eachAct.total_number_of_sections)}</td>
                                <td>{convertToBengaliNumber(eachAct.total_number_of_sub_sections)}</td>
                                <td>{convertToBengaliNumber(eachAct.total_number_of_schedules)}</td>
                                <td>{convertToBengaliNumber(eachAct.total_number_of_sub_schedules)}</td>
                                <td>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <AntSwitch defaultChecked={eachAct.featured}
                                                   inputProps={{'aria-label': 'ant design'}}
                                                   onClick={() => action(eachAct.id)}/>
                                    </Stack>
                                </td>

                                <td>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-around",
                                        gap: "1px"
                                    }}>
                                        <FilePdfOutlined className="btn btn-md btn-info" fontSize={25} style={{
                                            cursor: 'pointer'
                                        }} onClick={() => setIsModalOpen(eachAct.id)}/>
                                        <EyeFilled className="btn btn-md btn-info" fontSize={25} style={{
                                            cursor: 'pointer'
                                        }} onClick={() => navigate('/createsection/' + eachAct.id)}/>

                                        <Badge bg="danger" style={{
                                            cursor: 'pointer'
                                        }}
                                               onClick={() => handleWarning(eachAct.id, eachAct.act_year)}>
                                            <AiFillDelete fontSize={20}/>
                                        </Badge>
                                    </div>

                                </td>
                            </tr>

                        ))}


                        </tbody>
                    </table>

                </div>
            </div>
            {isModalOpen && (
                <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        maxWidth: 400
                    }}>
                        <Typography variant="h5" mb={2}>
                            আইন পিডিএফ যোগ করুন
                            <IconButton onClick={() => setIsModalOpen(false)}
                                        sx={{position: 'absolute', top: 0, right: 0}}>
                                <CloseIcon/>
                            </IconButton>
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <label>
                                আইন পিডিএফ যোগ করুন
                            </label>
                            <input
                                accept="application/pdf"
                                id="pdf-upload"
                                type="file"
                                onChange={handleFile}
                            />
                            {loading ? (
                                    <Loading/>
                                ) :
                                <Button type="submit" variant="contained" color="primary" className='mt-2'>
                                    Submit
                                </Button>
                            }


                        </form>
                    </Box>
                </Modal>
            )}

        </div>

    )
}

export default ActInput
