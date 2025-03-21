import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import AddSomething from './AddSomething'
import axios from "../axios/axios"
import AddSubSection from './AddSubSection'
import "./CreateSection.css"
import AddSchedule from './AddSchedule'
import CreateSubSchedule from "./CreateSubSchedule";
import {AiFillDelete} from "react-icons/ai";
import Swal from "sweetalert2";
import useAuth from "../../hooks/authHooks";

const CreateSchedule = ({subSectionNumber, subSectionHeading, subSectionContent, sectionId, subSectionId}) => {
    const [openScheduleDiv, setOpenScheduleDiv] = useState(false)

    const handleOpenSchedule = () => {
        setOpenScheduleDiv(!openScheduleDiv)
    }
    const [scheduleList, setScheduleList] = useState([])
    const navigate = useNavigate()
    const params = useParams()
    // console.log(params.id)
    const [addScheduleOpen, setAddScheduleOpen] = useState(false)

    const handleAddScheduleOpen = () => {
        setAddScheduleOpen(!addScheduleOpen)
    }

    useEffect(() => {
        const loadScheduleList = async () => {
            const response = await axios.post(
                "/api/getschedules/",
                {
                    sub_section_id: subSectionId
                }
            )
                .then(response => {
                    setScheduleList(response.data.schedules);
                })

            // setTotal(response.data.length);
        };

        loadScheduleList();
    }, [subSectionId]);

    /*    const handleNavigate = () => {
            navigate(`/createsection/${params.id}`)
        }*/

    const handleWarning = (sectionId, subsectionId, actId) => {
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
                handleDelete(sectionId, subsectionId, actId)
            }
        })
    }
    const {token} = useAuth();
    const handleDelete = async (sectionId, subsectionId, actId) => {
        const response = await axios.post(
            "/api/act/delete/", {
                jwt: token,
                act_id: actId,
                act_year: null,
                section_id: sectionId,
                sub_section_id: subsectionId,
                schedule_id: null,
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


    return (
        <div>
            <div onClick={handleOpenSchedule} style={{
                cursor: 'pointer', fontSize: '20px', display: 'flex',
            }}>


                <small>উপধারা -</small> &nbsp;
                {subSectionNumber != 0 && (
                    <div>
                        <div style={{display: "flex"}}>
                            নম্বর :
                            {subSectionNumber}


                            <div style={{width: '150px', cursor: 'pointer'}}
                                 onClick={() => handleWarning(sectionId, subSectionId, params.id)}>
                                <AiFillDelete style={{marginRight: '8px'}} fontSize={20}/>
                            </div>


                        </div>
                        <div style={{display: "flex"}}>
                            <small>বিষয়বস্তু
                                :</small>
                            <div dangerouslySetInnerHTML={{__html: subSectionContent ? subSectionContent : ''}}/>
                        </div>
                    </div>
                )}


            </div>
            {openScheduleDiv && (
                <div className='CreateSectionInner' style={{marginLeft: '20px', marginTop: '0px', width: '100%'}}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'left',
                        flexDirection: 'column',
                        width: '100%',
                    }}>
                        {scheduleList[0] && (
                            <>
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
                                    {scheduleList.map((eachSchedule, index) => (
                                        <CreateSubSchedule key={index}
                                                           subSectionNumber={eachSchedule?.number}
                                                           subSectionHeading={eachSchedule?.heading}
                                                           subSectionContent={eachSchedule?.content}
                                                           sectionId={sectionId}
                                                           subSectionId={subSectionId}
                                                           schedule_id={eachSchedule.id}
                                            //  sectionId = {eachSubSection.}
                                        />

                                        // <div>
                                        //     {eachSubSection.number} {eachSubSection.content}
                                        // </div>

                                    ))}
                                </div>
                                <div style={{
                                    width: '100%',
                                    alignItems: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}>
                                    <div onClick={handleAddScheduleOpen}
                                         style={{cursor: 'pointer', width: '200px', marginTop: '10px'}}>
                                        <AddSomething addText={"দফা যোগ করুন"}/>
                                    </div>
                                    {addScheduleOpen &&
                                        <div style={{width: '100%'}}>
                                            <AddSchedule
                                                actId={params.id}
                                                sectionId={sectionId}
                                                subSectionId={subSectionId}/>
                                        </div>
                                    }
                                </div>
                            </>
                        )}
                    </div>
                    {!scheduleList[0] && (
                        <div style={{
                            width: '100%',
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <div onClick={handleAddScheduleOpen} style={{cursor: 'pointer', width: '200px'}}>
                                <AddSomething addText={"দফা যোগ করুন"}/>
                            </div>
                            {addScheduleOpen &&
                                <div style={{width: '100%'}}>
                                    <AddSchedule
                                        actId={params.id}
                                        sectionId={sectionId}
                                        subSectionId={subSectionId}
                                    />
                                </div>
                            }
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CreateSchedule
