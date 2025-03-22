import React, {useState, useEffect} from 'react'
import "./ActInnerView.css"
import useAuth from '../../../hooks/authHooks'
import {Helmet} from 'react-helmet'
import axios from '../../axios/axios'
import EachSectionSingle from './EachSectionSingle'
import {Link, useParams} from "react-router-dom";
import {GoLaw} from "react-icons/go";
import {convertToBengaliNumber} from "../../../numberConverter";
import Modal from "react-bootstrap/Modal";


const LastView = () => {
    const {marginDiv} = useAuth()
    const [post, setPost] = useState({});
    const [year, setYear] = useState(null);
    const [actnumber, setNumber] = useState(null);
    const [oiginalActData, setOriginalActData] = useState({})
    const [liveActData, setLiveActData] = useState([]);
    const [actFile, setActFile] = useState(null);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleClose = () => setShow(false);
    const handleClose2 = () => setShow2(false);
    const handleShow = () => setShow(true);
    const handleShow2 = () => setShow2(true);
    const handleActData = (actData, year, actNumber) => {
        setYear(year)
        setPost(actData)
        setNumber(actNumber)
    }
    let params = useParams()

    useEffect(() => {
        liveActDataFunction();
        actDetailFunction();
        actFileFunction();

    }, []);
    useEffect(() => {
        axios.post(
            `/api/ebooks/viewercounter/`, {
                ebook_id: params.id
            }
        )
            .then(res => {

            })
            .catch(err => {
                console.log(err)
            })

    }, [params.id]);
    function actFileFunction() {
        axios.post(
            `/api/getactspdf/`, {
                act_id: params.id
            }
        )
            .then(res => {
                setActFile(res.data.data.file)
            })
            .catch(err => {
                console.log(err)
            })
    }

    function liveActDataFunction() {
        axios.post(
            `/api/getliveact/`, {
                act_id: params.id
            }
        )
            .then(res => {
                setLiveActData(res.data.live_data)
                if (res.data.live_data.length > 0) {
                    setYear(res.data.live_data[res.data.live_data.length - 1].year)
                    setNumber(res.data.live_data[res.data.live_data.length - 1].mod_by_act_id__number)
                    setPost(res.data.live_data[res.data.live_data.length - 1].json_data__Act[0])
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    function actDetailFunction() {
        axios.post(
            `/api/actsDetail/`, {
                id: params.id
            }
        )
            .then(res => {
                setPost(res.data.Act[0])
                setOriginalActData(res.data.Act[0])
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className='ActInner_main' style={{marginLeft: marginDiv ? '155px' : '50px', transition: '.5s'}}>
            <Helmet>
                <title>বিস্তারিত ই-বুক</title>
            </Helmet>
            <div className='ActInner_top'>
                <h3><b>{post.title_of_act}</b></h3>
                <h4>( {post.act_year} সনের {post.number} নং আইন )</h4>
                <div className='ActInner_top_inside'>
                    <Link to={"/ebook/pdf/view/" + params.id} target="_blank" style={{
                        marginRight: '10px',
                    }}
                    >
                        <img src="/pdf.png" alt='pdf download' width="32px"/>
                    </Link>

                    {actFile && (
                        <a
                            href={actFile ? axios.defaults.baseURL + "/uploads/" + actFile : axios.defaults.baseURL + "/images/vumi_logo.png"}
                            download
                        >

                            <img src="/download.png" alt='pdf download' width="32px"/>
                        </a>
                    )}
                    {post.multiple_reference_link && (
                        <>
                            <span className='pointer-event' style={{
                                cursor: 'pointer',
                            }} onClick={handleShow2}>
                                <img src="/reference.png" alt='pdf download' width="32"/>
                            </span>

                            <Modal size="xl" scrollable={true} animation={true} show={show2} onHide={handleClose2}>
                                <Modal.Header closeButton>
                                    <Modal.Title>রেফারেন্স</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <ul>
                                        {post.multiple_reference_link.map((eachLink, index) => (
                                            <li key={index}>
                                                <a href={eachLink} target="_blank">{eachLink}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button className='btn btn-lg btn-info' onClick={handleClose2}>
                                        বন্ধ করুন
                                    </button>
                                </Modal.Footer>
                            </Modal>


                        </>
                    )}


                    <h5 style={{
                        justifyContent: 'end',
                        float: 'right',
                    }}>
                        {convertToBengaliNumber(post.publication_date ? post.publication_date : '')}
                    </h5>
                </div>
                {liveActData && (
                    <div className='ActInner_top_inside2'>
                        <div style={{display: 'flex'}}>
                            <div
                                style={{
                                    height: '100%',
                                    background: '#42adff',
                                    padding: '0px 10px',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    border: year ? 'none' : '2px solid white',
                                }}
                                onClick={() => handleActData(oiginalActData)}
                            >
                                <b>মূল আইন</b>
                            </div>
                            {/*  <b style={{color: 'white'}}>-></b>*/}
                            &nbsp;&nbsp;
                            {liveActData.map((eachLiveActData, index) => (
                                <h5
                                    key={index}
                                    onClick={() => handleActData(eachLiveActData.json_data__Act[0], eachLiveActData.year, eachLiveActData.mod_by_act_id__number)}
                                    style={{cursor: 'pointer'}}
                                >
                                    {year === eachLiveActData.year && actnumber === eachLiveActData.mod_by_act_id__number ? (
                                        <>
                                            <div style={{
                                                display: 'flex',
                                            }}>
                                                <h5 style={{color: '#0C6395', fontWeight: 'bolder'}}>
                                                    {eachLiveActData.year} - {eachLiveActData.mod_by_act_id__number} নং

                                                </h5>
                                                {index !== liveActData.length - 1 && <span>-></span>}
                                                &nbsp;&nbsp;
                                            </div>
                                        </>
                                    ) : (
                                        <span>
              {eachLiveActData.year} - {eachLiveActData.mod_by_act_id__number} নং
                                            {index !== liveActData.length - 1 && <span>-> </span>}
            </span>
                                    )}
                                </h5>
                            ))}
                        </div>
{/*                        {actFile && (
                            <div
                                style={{
                                    fontWeight: 'bold',
                                    marginLeft: 'auto',
                                    cursor: 'pointer',
                                }}
                            >
                                <a
                                    className='btn btn-lg btn-info'
                                    href={actFile ? axios.defaults.baseURL + "/uploads/" + actFile : axios.defaults.baseURL + "/images/vumi_logo.png"}
                                    download
                                >

                                    Download Act <img src={axios.defaults.baseURL + "/pdf.png"}/>
                                </a>
                            </div>
                        )}*/}
                    </div>
                )}


            </div>
            <div className='ActInner_middle'>
                <div dangerouslySetInnerHTML={{__html: post.proposal}} style={{
                    fontWeight: 'bold',
                }}/>
                <br/>
                <div dangerouslySetInnerHTML={{__html: post.objective}}/>
            </div>
            <div className='ActInner_middle_two'>
                <h3><b>সূচি</b></h3>
            </div>
            <div className='ActInner_middle_three'>
                <h3><b>ধারাসমূহ</b></h3>
            </div>
            <div className='ActInner_last'>
                {post.section && (Object.values(post.section)).map((eachSection, index) => (
                    <>
                        <div key={index} className='ActInner_last_each'
                             style={index % 2 === 0 ? {
                                     background: 'none',
                                     cursor: 'pointer',
                                 } :
                                 {
                                     background: '#f9f9f9',
                                     cursor: 'pointer',
                                 }}>
                            <EachSectionSingle key={index}
                                               heading={eachSection.heading}
                                               content={eachSection.content ? eachSection.content : ''}
                                               number={eachSection.number}
                                               live={eachSection.live}
                                               repealed={eachSection.repealed_by || eachSection.repealed_to}
                                               repealed_by={eachSection.repealed_by}
                                               repealed_to={eachSection.repealed_to}
                                               repealed_by_data={eachSection.repealed_by_data}
                                               repealed_to_data={eachSection.repealed_to_data}
                                               amendment_from={eachSection.amendment_from}
                                               amendment_to={eachSection.amendment_to}

                                               appendment_from={eachSection.appendment_from}
                                               appendment_after={eachSection.appendment_after}

                                               repealed_data={eachSection.repealed_data}
                                               subSection={eachSection.sub_section ? eachSection.sub_section
                                                   :
                                                   ''}
                                               amendment_from_data={eachSection.amendment_from_data ? eachSection.amendment_from_data : ''}
                                               amendment_to_data={eachSection.amendment_to_data ? eachSection.amendment_to_data : ''}

                                               appendment_from_data={eachSection.appendment_from_data ? eachSection.appendment_from_data : ''}
                                               appendment_after_data={eachSection.appendment_after_data ? eachSection.appendment_after_data : ''}
                            />

                        </div>


                    </>

                ))}

            </div>
        </div>
    )
}

export default LastView
