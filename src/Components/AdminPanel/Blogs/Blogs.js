import React, {useLayoutEffect} from 'react'
import AddSomething from '../AddSomething'
import {useState, useEffect} from 'react'
import axios from "../../axios/axios";
import {Link, Route, useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";
import {AiFillDelete} from "react-icons/ai";
import useAuth from "../../../hooks/authHooks";
import {convertToBengaliNumber} from "../../../numberConverter";

import Switch from '@mui/material/Switch';
import {styled} from '@mui/material/styles';
import {Stack} from "@mui/material";
import Badge from 'react-bootstrap/Badge';
import {Helmet} from "react-helmet";
import Loading from "../../Common/Loading";
import {toast} from "react-toastify";

const Blogs = () => {
    const accessToken = localStorage.getItem('access');
    if (!accessToken) {
        window.location.href = "/login"
    }
    const [blogs, setBlogs] = useState([])
    const navigate = useNavigate()
    const {token, role, marginDiv} = useAuth();
    const userRole = role ? role : localStorage.getItem("role");


    useLayoutEffect(() => {
        if (!(userRole === "Admin" || userRole === "Authorized" || userRole === "Blogger" || userRole === "BloggerAndForumUser")) {
           toast.error("আপনি এটার  জন্য অনুমোদিত নন")
           window.location.href = "/admin/request"
        }
    }, [])

    useEffect(() => {
        blogList();
    }, []);
    const blogList = async () => {
        const response = await axios.post(
            "/api/blogs/userbasedlist/", {
                jwt: token ? token : accessToken
            }
        );
        setBlogs(response.data);
    };
    const handleNavigate = () => {
        navigate('/admin/blog')
    }
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


    const handleWarning = (id) => {
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
            "/api/blogs/delete/", {
                jwt: token ? token : accessToken,
                blog_id: id
            });
        if (response.status === 200) {
            Swal.fire(
                'মুছে ফেলা হয়েছে!',
                'ব্লগ   মুছে ফেলা হয়েছে.',
                'success'
            )
            blogList();
        }
    }
    const action = async (id) => {
        const response = await axios.post(
            "/api/admin/data/approval/", {
                jwt: token ? token : localStorage.getItem('jwt'),
                type: "Blog",
                id: id
            });
        if (response.status === 200) {
            Swal.fire(
                'Status!',
                response.data.message,
                'success'
            )
            blogList();
        }
    }

    const featured = async (id) => {
        const response = await axios.post(
            "/api/features/items/", {
                jwt: token ? token : localStorage.getItem('jwt'),
                type: "blog",
                type_id: id
            });
        if (response.status === 200) {
            Swal.fire(
                'অবস্থা!',
                response.data.message,
                'success'
            )
           blogList()
        }
        else {
            Swal.fire(
                'Status!',
                'Something went wrong',
                'error'
            )
        }
    }
    return (
        <div className='category_main_div' style={{marginLeft: marginDiv ? '155px' : '50px'}}>
            <Helmet>
                <title>ব্লগ সমূহ</title>
            </Helmet>
            {role ? (
                    <div className='card mt-4'>
                        <div className='card-header text-center'>
                            <b style={{
                                color: '#0c6395',
                            }}>ব্লগ সমূহ</b>
                            <div className='float-end' onClick={handleNavigate}>
                                <AddSomething addText={"ব্লগ  লিপিবদ্ধকরুণ"}/>
                            </div>
                        </div>
                        <div className='card-body'>
                            <div className="table-responsive ">
                                <table className="table  table-bordered table-hover">
                                    <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">সূচিপত্র</th>
                                        <th scope="col">শিরোনাম</th>
                                        <th scope="col">লেখক</th>
                                        <th scope="col">অবস্থা</th>
                                        {(userRole === "Admin" || role === "Authorized") && (
                                            <th scope="col">মুছিয়া ফেলা</th>
                                        )}
                                        {(userRole === "Admin" || role === "Authorized") && (
                                            <th scope="col">অ্যাকশন</th>
                                        )}
                                        {(userRole === "Admin" || role === "Authorized") && (
                                            <th scope="col">ফিচার আইটেম </th>
                                        )}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {blogs.map((blog, index) => (
                                        <tr key={index}>
                                            <th scope="row"><Link
                                                to={"/blog/" + blog.id}>{convertToBengaliNumber(index + 1)}</Link>
                                            </th>
                                            <td><Link
                                                to={"/blog/" + blog.id}>{blog.title_name}</Link></td>
                                            <td><Link
                                                to={"/blog/" + blog.id}>{blog.author}</Link></td>
                                            <td>
                                                {blog.approved ? <Badge bg="success">অনুমোদিত</Badge> :
                                                    <Badge bg="warning">অপেক্ষমান</Badge>}
                                            </td>
                                            {(userRole === "Admin" || userRole === "Authorized") && (
                                                <td>
                                                    <Badge bg="danger" style={{
                                                        cursor: 'pointer'
                                                    }}
                                                           onClick={() => handleWarning(blog.id)}>
                                                        <AiFillDelete fontSize={20}/>
                                                    </Badge>
                                                </td>
                                            )}
                                            {(userRole === "Admin" || userRole === "Authorized") && (

                                                <td>
                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                        <AntSwitch defaultChecked={blog.approved}
                                                                   inputProps={{'aria-label': 'ant design'}}
                                                                   onClick={() => action(blog.id)}/>
                                                    </Stack>
                                                </td>

                                            )}
                                            {(userRole === "Admin" || userRole === "Authorized") && (
                                                <td>
                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                        <AntSwitch defaultChecked={blog.featured}
                                                                   inputProps={{'aria-label': 'ant design'}}
                                                                   onClick={() => featured(blog.id)}/>
                                                    </Stack>
                                                </td>


                                            )}
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>

                            </div>

                        </div>
                    </div>
                ) :
                <Loading/>
            }
        </div>
    )
}

export default Blogs
