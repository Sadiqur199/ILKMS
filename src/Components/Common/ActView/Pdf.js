// import React, {useState, useEffect, useRef} from 'react'
// import "./Pdf.css"
// import useAuth from '../../../hooks/authHooks'
// import {Helmet} from 'react-helmet'
// import axios from '../../axios/axios'
// import {Link, useParams} from "react-router-dom";
// import {convertToBengaliNumber} from "../../../numberConverter";
// import Modal from 'react-bootstrap/Modal';
// import OpenSectionSingle from "./OpenSectionSingle";


// const Pdf = () => {
//     const {marginDiv} = useAuth()
//     const [post, setPost] = useState({});
//     const [year, setYear] = useState(null);
//     const [actnumber, setNumber] = useState(null);
//     const [oiginalActData, setOriginalActData] = useState({})
//     const [liveActData, setLiveActData] = useState([]);


//     const handleActData = (actData, year, actNumber) => {
//         setYear(year)
//         setPost(actData)
//         setNumber(actNumber)
//     }
//     let params = useParams()

//     useEffect(() => {
//         /*setShow(false)*/
//         liveActDataFunction();
//         actDetailFunction();

//         /*  actFileFunction();*/
//         /* treeFunction();*/
//         /*        document.body.style.visibility = 'hidden';
//                 document.body.style.visibility = 'hidden';*/
//         /*   counter();*/
//     }, [params.id]);

// // if post is not empty then window.print
//     useEffect(() => {
//         if (Object.keys(post).length > 0) {
//             window.print();
//         }
//     }, [post]);


//     /*    function actFileFunction() {
//             axios.post(
//                 `/api/getactspdf/`, {
//                     act_id: params.id
//                 }
//             )
//                 .then(res => {
//                     setActFile(res.data.data.file)
//                 })
//                 .catch(err => {
//                     console.log(err)
//                 })
//         }*/

//     function liveActDataFunction() {
//         axios.post(
//             `/api/getliveact/`, {
//                 act_id: params.id
//             }
//         )
//             .then(res => {
//                 setLiveActData(res.data.live_data)
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     }

//     function actDetailFunction() {
//         axios.post(
//             `/api/actsDetail/`, {
//                 id: params.id
//             }
//         )
//             .then(res => {
//                 setPost(res.data.Act[0])
//                 setOriginalActData(res.data.Act[0])
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     }

//     const generatePDF = () => {
//         window.print();
//     };

//     /*    const treeFunction = () => {
//             axios.post(
//                 `/api/treeview/`, {
//                     act_id: params.id
//                 }
//             )
//                 .then(res => {
//                     setTreeData(res.data.treeView)
//                 })
//                 .catch(err => {
//                     console.log(err)
//                 })
//         }*/


//     return (
//         <div className='ActInner'>
//             <div className='ActInner_top'>
//                 <h6>
//                     <img src="/qrcode.svg" width="62px" alt="Bhumipedia QR Code"/>
//                 </h6>
//                 <h3><b>{post.title_of_act}</b></h3>
//                 <div className='ActInner_top_inside'>
//                     <button id="divToHide" className='btn btn-lg btn-info' onClick={generatePDF}>
//                         Generate PDF
//                     </button>
//                     <h5 style={{
//                         justifyContent: 'end',
//                         float: 'right',
//                     }}>
//                         {convertToBengaliNumber(post.publication_date ? post.publication_date : '')}
//                     </h5>
//                 </div>
// {/*
//                 {liveActData && (
//                     <div className='ActInner_top_inside2'>
//                         <div style={{display: 'flex'}}>
//                             <div className='main-act'
//                                  style={{
//                                      height: '100%',
//                                      background: '#42adff',
//                                      padding: '0px 10px',
//                                      color: 'white',
//                                      fontWeight: 'bold',
//                                      cursor: 'pointer',
//                                      border: year ? 'none' : '2px solid white',
//                                  }}
//                                  onClick={() => handleActData(oiginalActData)}
//                             >
//                                 <b id="divToHide">মূল আইন</b>

//                             </div>
//                             &nbsp;&nbsp;
//                             {liveActData.map((eachLiveActData, index) => (
//                                 <h5
//                                     key={index}
//                                     onClick={() => handleActData(eachLiveActData.json_data__Act[0], eachLiveActData.year, eachLiveActData.mod_by_act_id__number)}
//                                     style={{cursor: 'pointer'}}
//                                 >
//                                     {year === eachLiveActData.year && actnumber === eachLiveActData.mod_by_act_id__number ? (
//                                         <>
//                                             <h5 style={{color: '#0C6395'}}>
//                                                 {eachLiveActData.year} - {eachLiveActData.mod_by_act_id__number} নং

//                                             </h5>
//                                         </>
//                                     ) : (
//                                         <span>
//               {eachLiveActData.year} - {eachLiveActData.mod_by_act_id__number} নং
//                                             {index !== liveActData.length - 1 && <span>-> </span>}
//             </span>
//                                     )}
//                                 </h5>
//                             ))}
//                         </div>
//                     </div>
//                 )}
// */}

//             </div>
//             <div className='ActInner_middle'>
//                 <div dangerouslySetInnerHTML={{__html: post.proposal}} style={{
//                     fontWeight: 'bold',
//                 }}/>
//                 <br/>
//                 <div dangerouslySetInnerHTML={{__html: post.objective}}/>
//             </div>
//             <div className='ActInner_middle_two'>
//                 <h3><b>সূচি</b></h3>
//             </div>
//             <div className='ActInner_middle_three'>
//                 <h3><b>ধারাসমূহ</b></h3>
//             </div>
//             <div className=''>
//                 {post.section && (Object.values(post.section)).map((eachSection, index) => (
//                     <>
//                         <div key={index} className=''>
//                             <OpenSectionSingle key={index}
//                                                heading={eachSection.heading}
//                                                note={eachSection.note}
//                                                content={eachSection.content ? eachSection.content : ''}
//                                                number={eachSection.number}
//                                                live={eachSection.live}
//                                                repealed={eachSection.repealed_by || eachSection.repealed_to}
//                                                repealed_by={eachSection.repealed_by}
//                                                repealed_to={eachSection.repealed_to}
//                                                repealed_by_data={eachSection.repealed_by_data}
//                                                repealed_to_data={eachSection.repealed_to_data}
//                                                amendment_from={eachSection.amendment_from}
//                                                amendment_to={eachSection.amendment_to}

//                                                appendment_from={eachSection.appendment_from}
//                                                appendment_after={eachSection.appendment_after}

//                                                repealed_data={eachSection.repealed_data}
//                                                subSection={eachSection.sub_section ? eachSection.sub_section
//                                                    :
//                                                    ''}
//                                                amendment_from_data={eachSection.amendment_from_data ? eachSection.amendment_from_data : ''}
//                                                amendment_to_data={eachSection.amendment_to_data ? eachSection.amendment_to_data : ''}

//                                                appendment_from_data={eachSection.appendment_from_data ? eachSection.appendment_from_data : ''}
//                                                appendment_after_data={eachSection.appendment_after_data ? eachSection.appendment_after_data : ''}
//                             />

//                         </div>


//                     </>

//                 ))}

//             </div>
//             {post.schedules && (
//                 <>
//                     <div className='ActInner_middle_two'>
//                         <h3><b>তফসিল</b></h3>
//                     </div>
//                     <div dangerouslySetInnerHTML={{__html: post.schedules}}/>
//                 </>
//             )}
//             {/*            {treeData && (
//                 <div ref={targetRef}>
//                     {Object.keys(treeData).length > 0 && (

//                         <>
//                             <div className='ActInner_middle_two'>
//                                 <h3><b>ট্রি ভিউ</b></h3>
//                             </div>
//                             <ul className='text-center'>
//                                 {treeData.map((tree, index) => (
//                                     <div key={index}>
//                                         {index === 0 ? null : (
//                                             <h6>
//                                                 <img src={axios.defaults.baseURL + "/tree.png"} alt="Tree"/>
//                                             </h6>
//                                         )}
//                                         {tree.map((item, itemIndex) => (
//                                             <small key={item.id} title={item.year}><Link
//                                                 to={'/ebook/temp/view/' + item.id}> {item.law_name} {itemIndex === tree.length - 1 ? '' : '+'}
//                                             </Link></small>
//                                         ))}

//                                     </div>
//                                 ))}
//                             </ul>
//                         </>
//                     )}
//                 </div>
//             )}*/}
//         </div>
//     )
// }

// export default Pdf


import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';  // Import FileSaver.js
import "./Pdf.css";
import useAuth from '../../../hooks/authHooks';
import { Helmet } from 'react-helmet';
import axios from '../../axios/axios';
import { Link, useParams } from "react-router-dom";
import { convertToBengaliNumber } from "../../../numberConverter";
import Modal from 'react-bootstrap/Modal';
import OpenSectionSingle from "./OpenSectionSingle";

const Pdf = () => {
    const { marginDiv } = useAuth();
    const [post, setPost] = useState({});
    const [year, setYear] = useState(null);
    const [actnumber, setNumber] = useState(null);
    const [oiginalActData, setOriginalActData] = useState({});
    const [liveActData, setLiveActData] = useState([]);

    const handleActData = (actData, year, actNumber) => {
        setYear(year);
        setPost(actData);
        setNumber(actNumber);
    };

    let params = useParams();

    useEffect(() => {
        liveActDataFunction();
        actDetailFunction();
    }, [params.id]);

    useEffect(() => {
        if (Object.keys(post).length > 0) {
            window.print();
        }
    }, [post]);

    function liveActDataFunction() {
        axios.post('/api/getliveact/', {
            act_id: params.id
        })
        .then(res => {
            setLiveActData(res.data.live_data);
        })
        .catch(err => {
            console.log(err);
        });
    }

    function actDetailFunction() {
        axios.post('/api/actsDetail/', {
            id: params.id
        })
        .then(res => {
            setPost(res.data.Act[0]);
            setOriginalActData(res.data.Act[0]);
        })
        .catch(err => {
            console.log(err);
        });
    }
    const generatePDF = () => {
        window.print();
    };
    
    // Function to generate DOC file
    const generateDOC = () => {
        const content = document.getElementById("content-to-download").innerHTML;
    
        // Create a DOC file with proper formatting
        const docContent = `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                        }
                        h1, h2, h3, h4, h5 {
                            color: #333;
                        }
                        p {
                            font-size: 14px;
                        }
                        .content-section {
                            margin-bottom: 20px;
                        }
                    </style>
                </head>
                <body>
                    <h1>${post.title_of_act}</h1>
                    <div class="content-section">${content}</div>
                </body>
            </html>
        `;
    
        // Create a Blob object from the HTML content
        const blob = new Blob([docContent], { type: 'application/msword' });
    
        // Save the document as .doc
        saveAs(blob, `${post.title_of_act}.doc`);
    };
    
    return (
        <div className='ActInner'>
            <div className='ActInner_top'>
                <h6>
                    <img src="/qrcode.svg" width="62px" alt="Bhumipedia QR Code" />
                </h6>
                <h3><b>{post.title_of_act}</b></h3>
                <div className='ActInner_top_inside'>
                    <button id="divToHide" className='btn btn-lg btn-info button-space' onClick={generatePDF}>
                        Generate PDF
                    </button>
                    {/* New button to generate DOC */}
                    <button id="divToHide" className='btn btn-lg btn-success ' onClick={generateDOC}>
                        Generate DOC
                    </button>
                    <h5 style={{ justifyContent: 'end', float: 'right' }}>
                        {convertToBengaliNumber(post.publication_date ? post.publication_date : '')}
                    </h5>
                </div>
            </div>

            {/* Content wrapper for downloading */}
            <div id="content-to-download">
                <div className='ActInner_middle'>
                    <div dangerouslySetInnerHTML={{ __html: post.proposal }} style={{ fontWeight: 'bold' }} />
                    <br />
                    <div dangerouslySetInnerHTML={{ __html: post.objective }} />
                </div>
                <div className='ActInner_middle_two'>
                    <h3><b>সূচি</b></h3>
                </div>
                <div className='ActInner_middle_three'>
                    <h3><b>ধারাসমূহ</b></h3>
                </div>
                <div className=''>
                    {post.section && (Object.values(post.section)).map((eachSection, index) => (
                        <div key={index} className=''>
                            <OpenSectionSingle
                                key={index}
                                heading={eachSection.heading}
                                note={eachSection.note}
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
                                subSection={eachSection.sub_section ? eachSection.sub_section : ''}
                                amendment_from_data={eachSection.amendment_from_data ? eachSection.amendment_from_data : ''}
                                amendment_to_data={eachSection.amendment_to_data ? eachSection.amendment_to_data : ''}
                                appendment_from_data={eachSection.appendment_from_data ? eachSection.appendment_from_data : ''}
                                appendment_after_data={eachSection.appendment_after_data ? eachSection.appendment_after_data : ''}
                            />
                        </div>
                    ))}
                </div>
                {post.schedules && (
                    <>
                        <div className='ActInner_middle_two'>
                            <h3><b>তফসিল</b></h3>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: post.schedules }} />
                    </>
                )}
            </div>
        </div>
    );
};

export default Pdf;
