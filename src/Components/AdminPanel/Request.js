import React from 'react'
import './ActInput.css'
import {useState, useEffect} from 'react'
import useAuth from "../../hooks/authHooks";
import {Helmet} from "react-helmet";
import {Modal, Box, Button, IconButton, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from "../axios/axios";
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import {AiFillDelete} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const Request = () => {
    const accessToken = localStorage.getItem('access');
    if (!accessToken) {
        window.location.href = "/login"
    }
    const navigate = useNavigate();
    const {token, marginDiv} = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState('Blogger')
    const changeFilter = (e) => {
        setFilter(e.target.value)
    }
    useEffect(() => {
        responseRequest();

    }, []);
    const [data, setData] = useState([]);

    const responseRequest = () => {
        axios.post('/api/admin/blog/forum/user/pending/list/',
            {
                "jwt": token ? token : localStorage.getItem('jwt'),
            }
        )
            .then(response => {
                setData(response.data.message);
            })
            .catch(error => {
                setIsModalOpen(false);
                Swal.fire(
                    'অনুরোধ ব্যর্থ হয়েছে',
                    `${error.response.data.detail}`,
                    'failure'
                )
            });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/admin/blog/forum/request/',
            {
                "jwt": token ? token : localStorage.getItem('jwt'),
                "type": filter,
            }
        )
            .then(response => {
                if (response.status === 200) {
                    setIsModalOpen(false);
                    Swal.fire(
                        'অনুরোধ সফল হয়েছে',
                        `${response.data.message}`,
                        'success'
                    )
                    responseRequest()
                }
            })
            .catch(error => {
                setIsModalOpen(false);
                console.log(error.response.status)
                if (error.response.status === 403) {
                    navigate('/profile')
                }
                Swal.fire(
                    'অনুরোধ ব্যর্থ হয়েছে',
                    `${error.response.data.detail}`,
                    'failure'
                )
            });
    }

    const handleWarning = (id, year) => {
        Swal.fire({
            title: 'আপনি কি এ ব্যাপারে নিশ্চিত',
            text: "আপনি এই তথ্যগুলো  পুনরুদ্ধার করতে পারবেন না ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'বাদ দিন',
            confirmButtonText: 'হ্যাঁ, এটি মুছুন!'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(id)
            }
        })
    }
    const handleDelete = async (id) => {
        const response = await axios.post(
            "/api/admin/blog/forum/user/pending/delete/", {
                jwt: token,
                noctification_id: id
            });
        if (response.status === 200) {
            Swal.fire(
                'মুছে ফেলা হয়েছে!',
                'পরিপত্র মুছে ফেলা হয়েছে.',
                'success'
            )
            responseRequest();
        }
    }


    return (
        <div className='category_main_div' style={{marginLeft: marginDiv ? '155px' : '50px'}}>
            <Helmet>
                <title>অনুরোধ সমূহ</title>
            </Helmet>
            <div className='card mt-4'>
                <div className='card-header text-center'>
                    <b style={{
                        color: '#0c6395'
                    }}>অনুরোধ সমূহ</b>
                    <div className='float-end'>
                        <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>অনুরোধ
                            করুন</Button>
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
                            {/* Modal header */}
                            <Typography variant="h5" mb={2}>
                                অনুরোধ
                                <IconButton onClick={() => setIsModalOpen(false)}
                                            sx={{position: 'absolute', top: 0, right: 0}}>
                                    <CloseIcon/>
                                </IconButton>
                            </Typography>
                            {/* Form inside modal body */}
                            <form onSubmit={handleSubmit}>
                                <label>
                                    ব্যবহারকারীর ধরন নির্বাচন করুন
                                </label>
                                <select name='filter' className='form-control' onChange={changeFilter} value={filter}>
                                    {/*                                <option value='Admin'>অ্যাডমিন</option>
                                <option value='General'>ব্যবহারকারী</option>
                                <option value='Special'>বিশেষ</option>
                                <option value='Authorized'>অনুমোদিত</option>*/}
                                    <option value='Blogger'>ব্লগার</option>
                                    <option value='ForumUser'>ফোরাম ব্যবহারকারী</option>
                                    <option value='BloggerAndForumUser'>ফোরাম ব্লগার</option>
                                </select>
                                {/* Add more form fields as needed */}
                                <Button type="submit" variant="contained" color="primary" className='mt-2'>
                                    জমা দিন
                                </Button>
                            </form>
                        </Box>
                    </Modal>
                )}


                <div className="table-responsive ">
                    <table className="table  table-bordered table-hover">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">সূচিপত্র</th>
                            <th scope="col">শিরোনাম</th>
                            <th scope="col">মুছিয়া ফেলা</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.type}</td>
                                <td>
                                    <div
                                        onClick={() => handleWarning(item.id)}>
                                        <AiFillDelete fontSize={20}/>
                                    </div>

                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>

    )
}

export default Request
