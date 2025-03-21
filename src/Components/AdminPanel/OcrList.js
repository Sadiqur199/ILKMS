import React from 'react'
import './ActInput.css'
import AddSomething from './AddSomething'
import {useState, useEffect} from 'react'
import axios from '../axios/axios'
import {Link, useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";
import {AiFillDelete} from "react-icons/ai";
import useAuth from "../../hooks/authHooks";
import {EyeFilled} from "@ant-design/icons";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {convertToBengaliNumber} from "../../numberConverter";
import Badge from "react-bootstrap/Badge";


const OcrList = () => {
    const [ocrItem, setOcr] = useState([])
    const navigate = useNavigate()
    const {token,marginDiv} = useAuth();
    useEffect(() => {
        ocrList();
    }, []);
    const ocrList = async () => {
        const response = await axios.post(
            "/api/ocr/list/",
            {
                jwt: token ? token : localStorage.getItem('access'),
            }
        ).then((response) => {
                setOcr(response.data.data)
            }
        )
            .catch((error) => {
                console.log(error.response.data.detail)
            })


    };
    const handleNavigate = () => {
        navigate('/admin/ocr')
    }
    const handleWarning = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this অপটিক্যাল ক্যারেক্টার রেকগনিশন!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(id)
            }
        })
    }
    const handleDelete = async (id) => {
        const response = await axios.post(
            "/api/ocr/delete/", {
                jwt: token,
                ocr_id: id
            });
        if (response.status === 200) {
            Swal.fire(
                'Deleted!',
                'অপটিক্যাল ক্যারেক্টার রেকগনিশন has been deleted.',
                'success'
            )
            ocrList();
        }
    }
    return (
        <div className='category_main_div' style={{ marginLeft: marginDiv ? '155px' : '50px' }}>
                    <div className='card mt-4'>
                        <div className='card-header'>
                            অপটিক্যাল ক্যারেক্টার রেকগনিশন লিস্ট
                            <div className='float-end' onClick={handleNavigate}>
                                <AddSomething addText={"অপটিক্যাল ক্যারেক্টার রেকগনিশন"}/>
                            </div>
                        </div>
                        <div className="table-responsive ">
                            <table className="table  table-bordered table-hover">
                                <thead className="thead-dark">
                                <tr>
                                    <th scope="col">
                                        গণিতের সূচক
                                    </th>
                                    <th scope="col">শিরোনাম</th>
                                    <th scope='col'>ক্যাটাগরি টাইপ </th>
                                    <th scope="col">পৃষ্ঠা</th>
                                    <th scope="col">বিস্তারিত</th>
                                    <th scope='col'>বাদ দিন</th>
                                </tr>
                                </thead>
                                <tbody>
                                {ocrItem.map((ocr, index) => (
                                    <tr key={index}>
                                        <th scope="row">{convertToBengaliNumber(index + 1)}</th>
                                        <td>{ocr.name}</td>
                                        <td>
                                            <Badge bg="success"> {ocr.category_type}</Badge>
                                        </td>
                                        <td>
                                            {convertToBengaliNumber(ocr.total_page)}
                                        </td>
                                        <td>
                                            <Link to={`/admin/ocr/${ocr.id}`}>
                                                <button className='btn btn-lg btn-info btn-success'><EyeFilled
                                                    fontSize={20}/></button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className='btn btn-danger' onClick={() => handleWarning(ocr.id)}>
                                                <AiFillDelete fontSize={20}/></button>
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

export default OcrList
