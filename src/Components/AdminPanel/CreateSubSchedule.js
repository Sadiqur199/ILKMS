import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import AddSomething from './AddSomething'
import axios from "../axios/axios"
import "./CreateSection.css"
import AddSubSchedule from "./AddSubSchedule";
import {AiFillDelete} from "react-icons/ai";
import Swal from "sweetalert2";
import useAuth from "../../hooks/authHooks";


const CreateSubSchedule = ({
                               subSectionNumber,
                               subSectionHeading,
                               subSectionContent,
                               sectionId,
                               subSectionId,
                               schedule_id
                           }) => {

    const [openSubScheduleDiv, setopenSubScheduleDiv] = useState(false)
    const handleOpenSubSchedule = () => {
        setopenSubScheduleDiv(!openSubScheduleDiv)
    }

    const [addSubScheduleOpen, setAddSubScheduleOpen] = useState(false)
    const handleAddSubScheduleOpen = () => {
        setAddSubScheduleOpen(!addSubScheduleOpen)
    }

    const [subScheduleList, setSubScheduleList] = useState([])
    useEffect(() => {
        if (schedule_id) {
            const loadSubScheduleList = async () => {
                const response = await axios.post(
                    "/api/getsubschedules/",
                    {
                        schedule_id: schedule_id
                    }
                )
                    .then(response => {
                        setSubScheduleList(response.data.sub_schedules);
                    })
            };
            loadSubScheduleList();
        }
    }, [sectionId]);


    let params = useParams()
    const handleWarning = (sectionId, subsectionId, schedule_id, actId) => {
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
                handleDelete(sectionId, subsectionId,schedule_id, actId)
            }
        })
    }
    const handleWarningSubschedule = (sectionId, subsectionId, schedule_id, actId,ssid) => {
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
                handleDeletess(sectionId, subsectionId,schedule_id, actId,ssid)
            }
        })
    }
    const {token} = useAuth();
    const handleDelete = async (sectionId, subsectionId,schedule_id, actId) => {
        const response = await axios.post(
            "/api/act/delete/", {
                jwt: token,
                act_id: actId,
                act_year: null,
                section_id: sectionId,
                sub_section_id: subsectionId,
                schedule_id: schedule_id,
                sub_schedule_id: null
            });
        if (response.status === 200) {
            Swal.fire(
                'Deleted!',
                'Act has been deleted.',
                'success'
            )
            window.location.reload();
        }
    }
    const handleDeletess = async (sectionId, subsectionId,schedule_id, actId,ssid) => {
        const response = await axios.post(
            "/api/act/delete/", {
                jwt: token,
                act_id: actId,
                act_year: null,
                section_id: sectionId,
                sub_section_id: subsectionId,
                schedule_id: schedule_id,
                sub_schedule_id: ssid
            });
        if (response.status === 200) {
            Swal.fire(
                'Deleted!',
                'Act has been deleted.',
                'success'
            )
            window.location.reload();
        }
    }

    return (
        <>
            <div onClick={handleOpenSubSchedule} style={{
                cursor: 'pointer', fontSize: '20px'
            }}>
                <div style={{display: "flex"}}>
                    <small>দফা   নম্বর :</small> {subSectionNumber}
                    <div style={{width: '150px', cursor: 'pointer'}}
                         onClick={() => handleWarning(sectionId, subSectionId, schedule_id, params.id)}>
                        <AiFillDelete style={{marginRight: '8px'}} fontSize={20}/>
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                }}
                >
                    <small>বিষয়বস্তু :</small>
                    <div dangerouslySetInnerHTML={{__html: subSectionContent ? subSectionContent : ''}}/>
                </div>
            </div>
            {openSubScheduleDiv && (
                <div className='CreateSectionInner' style={{marginLeft: '20px', marginTop: '0px', width: '100%'}}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'left',
                        flexDirection: 'column',
                        width: '100%',
                    }}>
                        {subScheduleList[0] && (
                            <>
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
                                    {subScheduleList.map((subSchedule, index) => (
                                        <div>
                                        <div style={{display: "flex"}}>
                                            <b className='text-info'> উপদফা </b> নম্বর: {subSchedule.number}

                                            <div style={{width: '150px', cursor: 'pointer'}}
                                                 onClick={() => handleWarningSubschedule(sectionId, subSectionId, schedule_id, params.id,subSchedule.id)}>
                                                <AiFillDelete style={{marginRight: '8px'}} fontSize={20}/>
                                            </div>

                                        </div>
                                            <div>
                                                বিষয়বস্তু:
                                                <div
                                                    dangerouslySetInnerHTML={{__html: subSchedule.content ? subSchedule.content : ''}}/>
                                            </div>

                                        </div>
                                    ))}
                                </div>

                                <div style={{
                                    width: '100%',
                                    alignItems: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}>
                                    <div onClick={handleAddSubScheduleOpen}
                                         style={{cursor: 'pointer', width: '200px', marginTop: '10px'}}>
                                        <AddSomething addText={" উপদফা যোগ করুন"}/>
                                    </div>
                                    {addSubScheduleOpen &&
                                        <div style={{width: '100%'}}>
                                            <AddSubSchedule
                                                act_id={params.id}
                                                section_id={sectionId}
                                                sub_section_id={subSectionId}
                                                schedule_id={schedule_id}
                                            />
                                        </div>
                                    }
                                </div>
                            </>
                        )}
                        {!subScheduleList[0] && (
                            <div style={{
                                width: '100%',
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                                <div onClick={handleAddSubScheduleOpen} style={{cursor: 'pointer', width: '200px'}}>
                                    <AddSomething addText={"উপ  দফা  যোগ করুন"}/>
                                </div>
                                {addSubScheduleOpen &&
                                    <div style={{width: '100%'}}>
                                        <AddSubSchedule
                                            act_id={params.id}
                                            section_id={sectionId}
                                            sub_section_id={subSectionId}
                                            schedule_id={schedule_id}
                                        />
                                    </div>
                                }
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )

}

export default CreateSubSchedule