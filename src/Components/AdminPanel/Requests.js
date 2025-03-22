import React from 'react'
import './ActInput.css'
import {useState, useEffect} from 'react'
import useAuth from "../../hooks/authHooks";
import {Helmet} from "react-helmet";
import axios from "../axios/axios";
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import {AiFillDelete} from "react-icons/ai";
import {Link} from "react-router-dom";
import {EyeFilled} from "@ant-design/icons";
import { FcApprove } from "react-icons/fc";

const Requests = () => {
    const accessToken = localStorage.getItem('access');
    if (!accessToken) {
        window.location.href = "/login"
    }
    const {token, marginDiv} = useAuth();

    useEffect(() => {
        responseRequest();
    }, []);
    const [data, setData] = useState([]);

    const responseRequest = () => {
        axios.post('api/admin/blog/forum/user/list',
            {
                "jwt": token ? token : localStorage.getItem('jwt'),
            }
        )
            .then(response => {
                setData(response.data.message);
            })
            .catch(error => {
                Swal.fire(
                    'অনুরোধ ব্যর্থ হয়েছে',
                    `${error.response.data.detail}`,
                    'failure'
                )
            });
    }
    const handleApprove = (id) => {
        Swal.fire({
            title: 'আপনি কি এ ব্যাপারে নিশ্চিত',
            text: "আপনি এই তথ্যগুলো  পুনরুদ্ধার করতে পারবেন না ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'বাদ ',
            confirmButtonText: 'অনুমোদন'
        }).then((result) => {
            if (result.isConfirmed) {
                approve(id)
            }
        })
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
    const approve = async (id) => {
        const response = await axios.post(
            "/api/admin/blog/forum/approval/", {
                jwt: token,
                noctification_id: id
            });
        if (response.status === 200) {
            Swal.fire(
                'অনুমোদন  হয়েছে!',
                'অনুমোদন করা  হয়েছে',
                'success'
            )
            responseRequest();
        }
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
                </div>
                <div className="table-responsive ">
                    <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">সূচিপত্র</th>
                            <th scope="col">ব্যবহারকারী</th>
                            <th scope="col">ফোন</th>
                            <th scope="col">অনুরোধ</th>
                            <th scope="col">
                                বিস্তারিত
                            </th>
                            <th scope="col">
                                অ্যাকশন
                            </th>
                            <th scope="col">মুছিয়া ফেলা</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.user_id__full_name}</td>
                                <td>{item.user_id__phone_number}</td>
                                <td>{item.type}</td>
                                <td>
                                    <Link to={"/profile/role/" + item.user_id__phone_number}>
                                        <EyeFilled className='text-primary' fontSize={25}/>
                                    </Link>
                                </td>
                                <td>
                                    <button className='btn btn-success'
                                        onClick={() => handleApprove(item.id)}>
                                        <FcApprove fontSize={20}/>
                                    </button>
                                </td>
                                <td>
                                    <button className='btn btn-danger'
                                        onClick={() => handleWarning(item.id)}>
                                        <AiFillDelete fontSize={20}/>
                                    </button>
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

export default Requests
