import React from 'react'
import './ActInput.css'
import AddSomething from '../AddSomething'
import {useState, useEffect} from 'react'
import axios from "../../axios/axios";
import {Link, useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";
import {AiFillDelete} from "react-icons/ai";
import useAuth from "../../../hooks/authHooks";
import {convertToBengaliNumber} from "../../../numberConverter";
import {Stack} from "@mui/material";
import {styled} from "@mui/material/styles";
import Switch from "@mui/material/Switch";


const Manuals = () => {
    const accessToken = localStorage.getItem('access');
    if (!accessToken) {
        window.location.href = "/login"
    }
    const [actList, setActList] = useState([])
    const navigate = useNavigate()
    const {token,marginDiv} = useAuth();
    useEffect(() => {
        loadActList();
    }, []);
    const loadActList = async () => {
        const response = await axios.get(
            "/api/manuals/"
        );
        setActList(response.data);
    };
    const handleNavigate = () => {
        navigate('/admin/manual/add')
    }
    const handleAction = () => {
        navigate('/action')
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
                'মুছে ফেলা হয়েছে!',
                'ম্যানুয়াল মুছে ফেলা হয়েছে.',
                'success'
            )
            loadActList();
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
    const action = async (id) => {
        const response = await axios.post(
            "/api/features/items/", {
                jwt: token ? token : localStorage.getItem('jwt'),
                type: "ম্যানুয়াল",
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
    return (
        <div className='category_main_div' style={{ marginLeft: marginDiv ? '155px' : '50px' }}>
                    <div className='card mt-4'>
                        <div className='card-header text-center'>
                            <div className='float-start' onClick={handleAction}>
                                <AddSomething addText={"ইমপ্যাক্ট করুন "}/>
                            </div>
                            <b style={{
                                color: '#0c6395',
                            }}> ম্যানুয়াল সমূহ</b>
                            <div className='float-end' onClick={handleNavigate}>
                                <AddSomething addText={"ম্যানুয়াল লিপিবদ্ধকরুণ"}/>
                            </div>
                        </div>
                        <div className="table-responsive ">
                            <table className="table  table-bordered table-hover">
                                <thead className="thead-dark">
                                <tr>
                                    <th scope="col">সূচিপত্র</th>
                                    <th scope="col">শিরোনাম</th>
                                    <th scope="col">প্রকাশের তারিখ</th>
                                    <th scope="col">ফিচার আইটেম </th>
                                    <th scope="col">মুছিয়া ফেলা</th>
                                </tr>
                                </thead>
                                <tbody>
                                {actList.map((eachAct, index) => (
                                    <tr key={index}>
                                        <th scope="row"><Link
                                            to={"/ebook/view/" + eachAct.id}>{convertToBengaliNumber(index + 1)}</Link>
                                        </th>
                                        <td><Link to={"/createsection/" + eachAct.id}>{eachAct.title_of_act}</Link></td>
                                        <td>{convertToBengaliNumber(eachAct.publication_date)}</td>
                                        <td>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <AntSwitch defaultChecked={eachAct.featured}
                                                           inputProps={{'aria-label': 'ant design'}}
                                                           onClick={() => action(eachAct.id)}/>
                                            </Stack>
                                        </td>
                                        <td>
                                            <div
                                                onClick={() => handleWarning(eachAct.id, eachAct.act_year)}>
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

export default Manuals
