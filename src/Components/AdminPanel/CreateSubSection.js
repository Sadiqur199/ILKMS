import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import AddSomething from './AddSomething'
import axios from "../axios/axios"
import AddSubSection from './AddSubSection'
import "./CreateSection.css"
import CreateSchedule from './CreateSchedule'
import AddSchedule from "./AddSchedule";
import Swal from "sweetalert2";
import useAuth from "../../hooks/authHooks";
import {AiFillDelete} from "react-icons/ai";

const CreateSubSection = ({sectionNumber, sectionHeading, sectionContent, sectionId}) => {
    const [openSubSectionDiv, setOpenSubSectionDiv] = useState(false)
    const [addScheduleOpen, setAddScheduleOpen] = useState(false)

    const handleAddScheduleOpen = () => {
        setAddScheduleOpen(!addScheduleOpen)
    }


    const handleOpenSubSection = () => {
        setOpenSubSectionDiv(!openSubSectionDiv)
    }
    const [subSectionList, setSubSectionList] = useState([])
    const navigate = useNavigate()
    const params = useParams()
    // console.log(params.id)
    const [addSubSectionOpen, setAddSubSectionOpen] = useState(false)

    const handleAddSubSectionOpen = () => {
        setAddSubSectionOpen(!addSubSectionOpen)
    }

    useEffect(() => {
        const loadSubSectionList = async () => {
            const response = await axios.post(
                "/api/getsubsections/",
                {
                    section_id: sectionId
                }
            )
                .then(response => {
                    setSubSectionList(response.data.sub_sections);
                })

            // setTotal(response.data.length);
        };

        loadSubSectionList();
    }, [sectionId]);
    /*
        const handleNavigate = () => {
            navigate(`/createsection/${params.id}`)
        }*/

    const handleWarning = (sectionId, actId) => {
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
                handleDelete(sectionId, actId)
            }
        })
    }
    const {token} = useAuth();
    const handleDelete = async (sectionId, actId) => {
        const response = await axios.post(
            "/api/act/delete/", {
                jwt: token,
                act_id: actId,
                act_year: null,
                section_id: sectionId,
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
            window.location.reload();
        }
    }


    return (
        <div>
            <div onClick={handleOpenSubSection} style={{
                cursor: 'pointer', fontSize: '20px',
            }}>
                <div style={
                    {
                        display: 'flex',
                    }
                }>
                    <small>ধারা নম্বর :</small> {sectionNumber} <small>শিরোনাম :</small> {sectionHeading}
                    <button className='btn btn-md btn-danger' style={{ cursor: 'pointer'}}
                         onClick={() => handleWarning(sectionId, params.id)}>
                        <AiFillDelete  fontSize={20}/>
                    </button>
                </div>
                <br/>
                <div style={{display: "flex"}}>
                    <small>
                        বিষয়বস্তু
                        :</small>
                    <div dangerouslySetInnerHTML={{__html: sectionContent ? sectionContent : ''}}/>
                </div>
            </div>
            <hr/>
            {openSubSectionDiv && (
                <div className='CreateSectionInner' style={{marginLeft: '20px', marginTop: '0px', width: '100%'}}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'left',
                        flexDirection: 'column',
                        width: '100%',
                    }}>
                        {subSectionList[0] && (
                            <>
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
                                    {subSectionList.map((eachSubSection, index) => (
                                        <CreateSchedule key={index}
                                                        subSectionNumber={eachSubSection?.number}
                                                        subSectionHeading={eachSubSection?.heading}
                                                        subSectionContent={eachSubSection?.content}
                                                        sectionId={sectionId}
                                                        subSectionId={eachSubSection.id}
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
                                    <div onClick={handleAddSubSectionOpen}
                                         style={{cursor: 'pointer', width: '200px', marginTop: '10px'}}>
                                        <AddSomething addText={"উপ  ধারা যোগ করুন"}/>
                                    </div>

                                    <div onClick={handleAddScheduleOpen}
                                         style={{cursor: 'pointer', width: '200px', marginTop: '10px'}}>
                                        <AddSomething addText={"দফা যোগ করুন"}/>
                                    </div>
                                    {addScheduleOpen &&
                                        <div style={{width: '100%'}}>
                                            <AddSchedule
                                                actId={params.id}
                                                sectionId={sectionId}
                                            />
                                        </div>
                                    }

                                    {addSubSectionOpen &&
                                        <div style={{width: '100%'}}>
                                            <AddSubSection actId={params.id} sectionId={sectionId}/>
                                        </div>
                                    }
                                </div>
                            </>
                        )}
                    </div>
                    {!subSectionList[0] && (
                        <div style={{
                            width: '100%',
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <div onClick={handleAddSubSectionOpen} style={{cursor: 'pointer', width: '200px'}}>
                                <AddSomething addText={"উপ  ধারা যোগ করুন"}/>
                            </div>
                            {addSubSectionOpen &&
                                <div style={{width: '100%'}}>
                                    <AddSubSection actId={params.id} sectionId={sectionId}/>
                                </div>
                            }


                            <div onClick={handleAddScheduleOpen}
                                 style={{cursor: 'pointer', width: '200px', marginTop: '10px'}}>
                                <AddSomething addText={"দফা যোগ করুন"}/>
                            </div>
                            {addScheduleOpen &&
                                <div style={{width: '100%'}}>
                                    <AddSchedule
                                        actId={params.id}
                                        sectionId={sectionId}
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

export default CreateSubSection
