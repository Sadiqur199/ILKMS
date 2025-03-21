import React, {useLayoutEffect} from 'react'
import AddSomething from '../AddSomething'
import {useState, useEffect} from 'react'
import axios from "../../axios/axios";
import {Link, useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";
import {AiFillDelete} from "react-icons/ai";
import useAuth from "../../../hooks/authHooks";
import {convertToBengaliNumber} from "../../../numberConverter";
import {Helmet} from "react-helmet";
import Badge from "react-bootstrap/Badge";
import {Stack} from "@mui/material";
import {styled} from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Loading from "../../Common/Loading";
import {toast} from "react-toastify";


const Forums = () => {
    const accessToken = localStorage.getItem('access');
    if (!accessToken) {
        window.location.href = "/login"
    }
    const [forums, setForums] = useState([])
    const navigate = useNavigate()
    const {token, marginDiv, role} = useAuth();


    const userRole = role ? role : localStorage.getItem('role');
    useLayoutEffect(() => {
        if (!(userRole === "Admin" || userRole === "Authorized" || userRole === "ForumUser" || userRole === "BloggerAndForumUser")) {
            toast.error("আপনি এটার  জন্য অনুমোদিত নন")
            window.location.href = "/admin/request"
        }
    }, [])
    useEffect(() => {
        forumList();
    }, []);
    const forumList = async () => {
        const response = await axios.post(
            "/api/forums/userbasedlist/", {
                jwt: token ? token : accessToken
            }
        );
        setForums(response.data);
    };
    const handleNavigate = () => {
        navigate('/admin/forum')
    }
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
    const handleDelete = async (id, year) => {
        const response = await axios.post(
            "/api/forums/delete/", {
                jwt: token ? token : accessToken,
                forum_id: id
            });
        if (response.status === 200) {
            Swal.fire(
                'মুছে ফেলা হয়েছে!',
                'অন্যান্য  মুছে ফেলা হয়েছে.',
                'success'
            )
            forumList();
        }
    }
    const action = async (id) => {
        const response = await axios.post(
            "/api/admin/data/approval/", {
                jwt: token ? token : accessToken,
                type: "Forum",
                id: id
            });
        if (response.status === 200) {
            Swal.fire(
                'Status!',
                response.data.message,
                'success'
            )
            forumList();
        }
    }
    const featured = async (id) => {
        const response = await axios.post(
            "/api/features/items/", {
                jwt: token ? token : localStorage.getItem('jwt'),
                type: "forum",
                type_id: id
            });
        if (response.status === 200) {
            Swal.fire(
                'অবস্থা!',
                response.data.message,
                'success'
            )
            forumList()
        }
        else {
            Swal.fire(
                'Status!',
                'Something went wrong',
                'error'
            )
        }
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
    return (
        <div className='category_main_div' style={{marginLeft: marginDiv ? '155px' : '50px'}}>
            <Helmet>
                <title>ফোরাম সমূহ</title>
            </Helmet>
            {role ? (
                    <div className='card mt-4'>
                        <div className='card-header text-center'>
                            <b style={{
                                color: '#0c6395',
                            }}>ফোরাম</b>
                            <div className='float-end' onClick={handleNavigate}>
                                <AddSomething addText={"ফোরাম  লিপিবদ্ধকরুণ"}/>
                            </div>
                        </div>
                        <div className="table-responsive ">
                            <table className="table  table-bordered table-hover">
                                <thead className="thead-dark">
                                <tr>
                                    <th scope="col">সূচিপত্র</th>
                                    <th scope="col">নাম</th>
                                    <th scope="col">লেখক</th>
                                    <th scope="col">অবস্থা</th>
                                    {(userRole === "Admin" || role === "Authorized") && (
                                        <th scope="col">অ্যাকশন</th>
                                    )}
                                    {(userRole === "Admin" || role === "Authorized") && (
                                        <th scope="col">ফিচার আইটেম </th>
                                    )}
                                    {(userRole === "Admin" || role === "Authorized") && (
                                        <th scope="col">মুছিয়া ফেলা</th>
                                    )}
                                </tr>
                                </thead>
                                <tbody>
                                {forums.map((forum, index) => (
                                    <tr key={index}>
                                        <th scope="row"><Link
                                            to={"/forum/view/" + forum.id}>{convertToBengaliNumber(index + 1)}</Link>
                                        </th>
                                        <td><Link
                                            to={"/forum/view/" + forum.id}>{forum.name}</Link></td>
                                        <td><Link
                                            to={"/forum/view/" + forum.id}>{forum.owner__full_name}</Link></td>
                                        <td>
                                            {forum.approved ? <Badge bg="success">অনুমোদিত</Badge> :
                                                <Badge bg="warning">অপেক্ষমান</Badge>}
                                        </td>
                                        {(userRole === "Admin" || role === "Authorized") && (
                                            <td>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <AntSwitch defaultChecked={forum.approved}
                                                               inputProps={{'aria-label': 'ant design'}}
                                                               onClick={() => action(forum.id)}/>

                                                </Stack>
                                            </td>
                                        )}
                                        {(userRole === "Admin" || role === "Authorized") && (
                                            <td>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <AntSwitch defaultChecked={forum.featured}
                                                               inputProps={{'aria-label': 'ant design'}}
                                                               onClick={() => featured(forum.id)}/>

                                                </Stack>
                                            </td>
                                        )}
                                        {(userRole === "Admin" || role === "Authorized") && (
                                            <td>
                                                <Badge bg="danger" style={{
                                                    cursor: 'pointer'
                                                }}
                                                       onClick={() => handleWarning(forum.id)}>
                                                    <AiFillDelete fontSize={20}/>
                                                </Badge>
                                            </td>
                                        )}
                                    </tr>

                                ))}

                                </tbody>
                            </table>

                        </div>
                    </div>
                ) :
                <Loading/>
            }

        </div>
    )
}

export default Forums
