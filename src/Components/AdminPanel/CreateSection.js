import React, {useState, useEffect} from 'react'
import "./CreateSection.css"
import {useParams, useNavigate, Link} from 'react-router-dom'
import AddSomething from './AddSomething'
import axios from "../axios/axios"
import AddSection from './AddSection'
import CreateSubSection from './CreateSubSection'
import {RollbackOutlined} from "@ant-design/icons";
import useAuth from "../../hooks/authHooks";

const CreateSection = () => {
    const [sectionList, setSectionList] = useState([])
    const [tittle, setTittle] = useState([])
    const navigate = useNavigate()
    const params = useParams()
    const [addSectionOpen, setAddSectionOpen] = useState(false)
    const {token, role, marginDiv} = useAuth();
    const handleAddSectionOpen = () => {
        setAddSectionOpen(!addSectionOpen)
    }

    useEffect(() => {
        const loadSectionList = async () => {
            const response = await axios.post(
                "/api/getsections/",
                {
                    act_id: params.id
                }
            )
                .then(response => {
                    setTittle(response.data.act_details.title_of_act)
                    setSectionList(response.data.sections);
                })

            // setTotal(response.data.length);
        };

        loadSectionList();
    }, [params.id]);

    /*    const handleNavigate = () => {
            navigate(`/createsection/${params.id}`)
        }*/
    return (
        <div className='category_main_div' style={{marginLeft: marginDiv ? '155px' : '50px'}}>
                <div className='card mt-3'>
                    <div className='card-header'>
                        <b>{tittle}</b>
                        <Link to="/actinput" className='btn btn-info btn-lg  float-end'>
                            <RollbackOutlined fontSize={40}/> আইন লিস্ট ফেরত যান

                        </Link>
                    </div>
                    <div className='card-body'>
                        <div style={{
                            display: 'flex',
                            alignItems: 'left',
                            flexDirection: 'column',
                            width: '100%',
                        }}>
                            {sectionList[0] && (
                                <>

                                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
                                        {sectionList.map((eachSection, index) => (
                                            <CreateSubSection key={index}
                                                              sectionNumber={eachSection?.number}
                                                              sectionHeading={eachSection.heading}
                                                              sectionContent={eachSection.content}
                                                              sectionId={eachSection.id}
                                            />
                                        ))}

                                    </div>
                                    <div style={{
                                        width: '100%',
                                        alignItems: 'center',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}>
                                        <div onClick={handleAddSectionOpen}
                                             style={{cursor: 'pointer', width: '200px', marginTop: '10px'}}>
                                            <AddSomething addText={"ধারা  যোগ করুন "}/>
                                        </div>
                                        {addSectionOpen &&
                                            <div style={{width: '100%'}}>
                                                <AddSection actId={params.id}/>
                                            </div>
                                        }
                                    </div>
                                </>
                            )}
                        </div>
                        {!sectionList[0] && (
                            <div style={{
                                width: '100%',
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                                <div onClick={handleAddSectionOpen} style={{cursor: 'pointer', width: '200px'}}>
                                    <AddSomething addText={"ধারা  যোগ করুন"}/>
                                </div>
                                {addSectionOpen &&
                                    <div style={{width: '100%'}}>
                                        <AddSection actId={params.id}/>
                                    </div>
                                }
                            </div>


                        )}
                    </div>
                </div>
        </div>

    )
}

export default CreateSection
