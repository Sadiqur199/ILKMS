import React from 'react'
import './ActInput.css'
import {useState, useEffect} from 'react'
import axios from '../axios/axios'
import {Link} from 'react-router-dom';
import useAuth from "../../hooks/authHooks";
import {EyeFilled} from "@ant-design/icons";
import Badge from "react-bootstrap/Badge";
import {Helmet} from "react-helmet";
import AddSomething from "./AddSomething";
import {convertToBengaliNumber} from "../../numberConverter";
import {AiFillDelete} from "react-icons/ai";
import {Stack} from "@mui/material";
import Swal from "sweetalert2";

const Users = () => {
    const accessToken = localStorage.getItem('access');
    if (!accessToken) {
        window.location.href = "/login"
    }
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState('ALL')
    const {token,marginDiv} = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [keyword, setKeyword] = useState('');
    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };
    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };
    /*    const generatePageNumbers = () => {
            const pageNumbers = [];
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
            return pageNumbers;
        };*/
    const generatePageNumbers = () => {
        const pageNumbers = [];
        const pagesPerSet = 10; // Number of pages per set

        const totalSets = Math.ceil(totalPages / pagesPerSet); // Calculate total sets

        let currentSet = Math.ceil(currentPage / pagesPerSet); // Determine current set

        // Calculate the starting page number for the current set
        let startPage = (currentSet - 1) * pagesPerSet + 1;

        // Generate page numbers for the current set
        for (let i = startPage; i < startPage + pagesPerSet; i++) {
            if (i <= totalPages) {
                pageNumbers.push(i);
            }
        }
        return pageNumbers;
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        loadUsers();
    }, [filter, currentPage, keyword]);
    const loadUsers = async () => {
        try {
            const response = await axios.post(
                "/api/admin/userlist/", {
                    jwt: token ? token : accessToken,
                    user_role: filter,
                    page_number: currentPage,
                    keyword: keyword
                }
            );
            if (response.status === 200) {
                setUsers(response.data.data);
                setCurrentPage(response.data.pagination.current_page)
                setTotalPages(response.data.pagination.total_pages)
            } else {
                setUsers([])
            }
        } catch (e) {
            setUsers([])
        }
    };
    const changeFilter = (e) => {
        setFilter(e.target.value)
        setCurrentPage(1)
    }
    const handleWarning = (id) => {
        Swal.fire({
            title: 'আপনি কি এ ব্যাপারে নিশ্চিত',
            text: "আপনি এই তথ্যগুলো  পুনরুদ্ধার করতে পারবেন না ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText:'বাদ দিন',
            confirmButtonText: 'হ্যাঁ, এটি মুছুন!'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(id)
            }
        })
    }
    const handleDelete = async (id) => {
        const response = await axios.post(
            "/api/admin/deleteuser/", {
                jwt: token?token:accessToken,
                phone_number: id
            });
        if (response.status === 200) {
            Swal.fire(
                'মুছে ফেলা হয়েছে!',
                'নির্দেশিকা মুছে ফেলা হয়েছে.',
                'success'
            )
            loadUsers();
        }
    }



    return (
        <div className='category_main_div' style={{ marginLeft: marginDiv ? '155px' : '50px' }}>
            <Helmet>
                <title>ব্যবহারকারী সমূহ</title>
            </Helmet>
            <div className='card mt-4'>
                <div className='card-header text-center flex_div'>
                    <div>
                        <select name='filter' className='form-control' onChange={changeFilter}>
                            <option value='ALL'>সকল ব্যবহারকারী</option>
                            <option value='Admin'>অ্যাডমিন</option>
                            <option value='General'>ব্যবহারকারী</option>
                            <option value='Special'>বিশেষ</option>
                            <option value='Authorized'>অনুমোদিত</option>
                            <option value='Blogger'>ব্লগার</option>
                            <option value='ForumUser'>ফোরাম ব্যবহারকারী</option>
                            <option value='Editor'>প্রকাশক</option>
                        </select>
                    </div>
                    <div>
                        <input type={"search"} placeholder='Search Here' value={keyword}
                               onChange={event => setKeyword(event.target.value)}/>
                    </div>
                </div>
                <div className='card-body'>
                    <div className="table-responsive ">
                        <table className="table  table-bordered table-hover">
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col">সূচিপত্র</th>
                                <th scope="col">পুরো নাম</th>
                                <th scope="col">ব্যবহারকারীর ধরন</th>
                                <th scope="col">ইমেইল</th>
                                <th scope="col">মোবাইল</th>
                                <th scope="col">
                                    যোগদানের তারিখ
                                </th>
                                <th scope="col">
                                    বিস্তারিত
                                </th>
                                <th scope='col'>
                                    অপসারণ
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <th scope="row">
                                        {user.index}
                                    </th>
                                    <th>{user.full_name}</th>
                                    <th>
                                        <Badge bg="success">{user.role}</Badge>
                                    </th>
                                    <th>{user.email}</th>
                                    <th>{user.phone_number}</th>
                                    <th>{user.date_joined}</th>
                                    <td>
                                        <Link to={"/profile/role/" + user.phone_number}>
                                            <EyeFilled className='text-primary' fontSize={25}/>
                                        </Link>
                                    </td>
                                    <td>
                                        <div
                                            onClick={() => handleWarning(user.phone_number)}>
                                            <AiFillDelete className='text-danger' fontSize={25}/>
                                        </div>
                                        </td>
                                </tr>

                            ))}

                            </tbody>

                        </table>

                    </div>
                </div>
                <div className='card-footer'>
                    <div className='row text-center'>
                        <div className="text-center">
                            <button className='btn btn-md btn-info' onClick={handlePrevPage}
                                    disabled={currentPage === 1}>
                                Previous
                            </button>

                            {generatePageNumbers().map((pageNumber, index) => (
                                <React.Fragment key={pageNumber}>
                                    {index !== 0 && <span>-></span>}
                                    <button className="btn btn-md btn-info"
                                            onClick={() => handlePageClick(pageNumber)}
                                            disabled={pageNumber === currentPage}
                                    >
                                        {pageNumber}
                                    </button>
                                </React.Fragment>
                            ))}

                            <button className='btn btn-md btn-info' onClick={handleNextPage}
                                    disabled={currentPage === totalPages}>
                                Next
                            </button>
                            <p>Page {currentPage} of {totalPages}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Users
