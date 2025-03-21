import React from 'react'
import {useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import useAuth from '../../hooks/authHooks';
import axios from '../axios/axios';
import {Button} from 'react-bootstrap';
import DropdownList from "react-widgets/DropdownList"
import TextareaAutosize from '@mui/base/TextareaAutosize';
import {useNavigate, Redirect} from 'react-router-dom';
import "react-widgets/styles.css";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


const AddSubSchedule = ({act_id, section_id, sub_section_id, schedule_id}) => {
    const [sub_schedule_number, setsub_schedule_number] = useState("")
    const [heading, setheading] = useState("")
    const [content, setcontent] = useState("")
    const [newSubScheduleData, setNewSubScheduleData] = useState([])
    const [appendmentNo, setAppendmentNo] = useState("")
    const [appendmentHeading, setAppendmentHeading] = useState("")
    const [appendmentContent, setAppendmentContent] = useState("")
    const [appendment, setAppendment] = useState(false)
    const [type, setType] = useState(1)
    const [tittle, setTittle] = useState(1)

    const [subScheduleSubmit, setSubScheduleSubmit] = useState(false)
    const [actionButton, setActionButton] = useState(false)
    const [isFinishButton, setIsFinishButton] = useState(false)

    const handleSectionNo = (event) => {
        setsub_schedule_number(event.target.value)
    }

/*    const handleSectionHeading = (event) => {
        setheading(event.target.value)
    }*/
    const handleSectionContent = (event, editor) => {
        const data = editor.getData();
        setcontent(data);
    }

    const handleAppendmentNo = (event) => {
        setAppendmentNo(event.target.value)
    }

    const handleAppendmentHeading = (event) => {
        setAppendmentHeading(event.target.value)
    }
    const handleAppendmentContent = (event, editor) => {
        const data = editor.getData();
        setAppendmentContent(data);
    }

    const handleNavigate = () => {
        setIsFinishButton(false)
        window.location.href = `/createsection/${act_id}`;
    }
    const {token} = useAuth();

    const [value, setValue] = useState("");
    const [actID, setActID] = useState("");
    const [category, setCategory] = React.useState("");
    const [getCategoryList, setGetCategoryList] = React.useState([]);
    const [sectionID, setSectionID] = useState("");
    const [subSectionID, setSubSectionID] = useState("");
    const [clauseID, setClauseID] = useState("");
    const [subClauseID, setSubClauseID] = useState("");
    const [isAmmendmentDone, setIsAmmendmentDone] = useState(false)

    const [ammendment, setAmmendment] = useState(false)
    const [repealed, setRepealed] = useState(false)
    const [getActList, setGetActList] = useState([])
    const [getSectionList, setGetSectionList] = useState([])
    const [getSubSectionList, setGetSubSectionList] = useState([])
    const [getClauseList, setGetClauseList] = useState([])
    const [getSubClauseList, setGetSubClauseList] = useState([])

    const [getContent, setGetContent] = useState([])
    const [isOpenContent, setIsOpenContent] = useState(false)
    const [editContent, setEditContent] = useState("")
    const [editHeading, setEditHeading] = useState("")

    useEffect(() => {
        const ActionCategoryList = async () => {
            const response = await axios.get(
                "/api/category/"
            );
            setGetCategoryList(response.data);
        };

        ActionCategoryList();
    }, [])


    const handleEditContent = (event, editor) => {
        /*setEditContent(event.target.value);*/
        const data = editor.getData();
        setEditContent(data);
    }
    const handleEditHeading = (event) => {
        setEditHeading(event.target.value)
    }
    useEffect(() => {
        if (type === 1) {
            setTittle("ধারা নম্বর")
        } else if (type === 2) {
            setTittle("উপধারা নম্বর")
        } else if (type === 3) {
            setTittle("দফা নম্বর")
        } else if (type === 4) {
            setTittle("উপদফা নম্বর")
        } else {
            setTittle(" নম্বর")
        }
    }, [type])
    useEffect(() => {
        if (value === 2) {
            setAmmendment(true)
            setAppendment(false)
            setRepealed(false)
        } else if (value === 3) {
            setRepealed(true)
            setAmmendment(false)
            setAppendment(false)
            setActID("")
            setSectionID("")
            setSubSectionID("")
            setClauseID("")
            setSubClauseID("")
        } else if (value === 4) {
            setAppendment(true)
            setRepealed(false)
            setAmmendment(false)
            setActID("")
            setSectionID("")
            setSubSectionID("")
            setClauseID("")
            setSubClauseID("")
        } else if (value === 1) {
            setActID("")
            setSectionID("")
            setSubSectionID("")
            setClauseID("")
            setSubClauseID("")
            setAmmendment(false)
            setRepealed(false)
            setAppendment(false)
        } else {
            setAmmendment(false)
            setRepealed(false)
            setAppendment(false)
        }
    }, [value])
    useEffect(() => {
        if (category) {
            const loadActList = async () => {
                const response = await axios.post(
                    "/api/getacts/", {
                        ebooks_type: category
                    }
                );
                setGetActList(response.data.Acts);
                setActID("")
                setSectionID("")
                setSubSectionID("")
                setClauseID("")
                setSubClauseID("")

            };

            loadActList();
        }
    }, [category])

    useEffect(() => {
        if (actID){
        const loadSectionList = async () => {

            const response = await axios.post(
                "/api/getsections/",
                {
                    act_id: actID
                }
            );
            setGetSectionList(response.data.sections);
            setSectionID("")
            setSubSectionID("")
            setClauseID("")
            setSubClauseID("")

        };

        loadSectionList();
        }
    }, [actID])

    useEffect(() => {
        if (sectionID) {
        const loadSubSectionList = async () => {
            const response = await axios.post(
                "/api/getsubsections/",
                {
                    section_id: sectionID,

                }
            );
            setGetSubSectionList(response.data.sub_sections);
            setSubSectionID("")
            setClauseID("")
            setSubClauseID("")
        };

        loadSubSectionList();
        }
    }, [sectionID])

    useEffect(() => {
        if (subSectionID) {
        const loadClauseList = async () => {
            const response = await axios.post(
                "/api/getschedules/",
                {
                    sub_section_id: subSectionID,

                }
            );
            setGetClauseList(response.data.schedules);
            setClauseID("")
            setSubClauseID("")

        };

        loadClauseList();
        }
    }, [subSectionID])

    useEffect(() => {
        if (clauseID) {
            const loadSubClauseList = async () => {
                const response = await axios.post(
                    "/api/getsubschedules/",
                    {
                        schedule_id: clauseID
                    }
                );
                setGetSubClauseList(response.data.sub_schedules);
                setSubClauseID("")
            };
            loadSubClauseList();
        }
    }, [clauseID])

    const handleGetContent = async () => {
        const response = await axios.post(
            "/api/getcontent/",
            {
                act_id: actID ? actID : null,
                section_id: sectionID ? sectionID : null,
                sub_section_id: subSectionID ? subSectionID : null,
                schedule_id: clauseID ? clauseID : null,
                sub_schedule_id: subClauseID ? subClauseID : null,
            }
        );
        if (response.data.content[0].content || response.data.content[0].heading) {
            setGetContent(response.data.content);
            /*  setGetHeading(response.data.heading);*/
            setIsOpenContent(true)
            setEditContent(response.data.content[0].content)
            setEditHeading(response.data.content[0].heading)
        }
    }

    const handlePostAmmendment = async () => {
        const response = await axios.post(
            "/api/amendment/",
            {
                jwt: token,
                act_year: newSubScheduleData.act_year ? newSubScheduleData.act_year : 'not found',
                act_id: newSubScheduleData.act_id,
                section_id: newSubScheduleData.section_id,
                sub_section_id: newSubScheduleData.sub_section_id,
                schedule_id: newSubScheduleData.schedule_id,
                sub_schedule_id: newSubScheduleData.sub_schedule_id,
                amendment_to_act_id: actID ? actID : null,
                amendment_to_section_id: sectionID ? sectionID : null,
                amendment_to_sub_section_id: subSectionID ? subSectionID : null,
                amendment_to_schedule_id: clauseID ? clauseID : null,
                amendment_to_sub_schedule_id: subClauseID ? subClauseID : null,
                content: editContent
            }
        );
        setIsAmmendmentDone(true)
        setActionButton(false)
    }
    const handlePostRepealed = async () => {
        const response = await axios.post(
            "/api/repealed/",
            {
                jwt: token,
                act_year: newSubScheduleData.act_year ? newSubScheduleData.act_year : 'not found',
                act_id: newSubScheduleData.act_id,
                section_id: newSubScheduleData.section_id,
                sub_section_id: newSubScheduleData.sub_section_id,
                schedule_id: newSubScheduleData.schedule_id,
                sub_schedule_id: newSubScheduleData.sub_schedule_id,
                repealed_to_act_id: actID ? actID : null,
                repealed_to_section_id: sectionID ? sectionID : null,
                repealed_to_sub_section_id: subSectionID ? subSectionID : null,
                repealed_to_schedule_id: clauseID ? clauseID : null,
                repealed_to_sub_schedule_id: subClauseID ? subClauseID : null,
                content: editContent
            }
        );
        setActionButton(false)
    }
    const handleCreateAppendment = async () => {
        const response = await axios.post(
            "/api/appendment/",
            {
                jwt: token,
                act_year: newSubScheduleData.act_year ? newSubScheduleData.act_year : 'not found',
                act_id: newSubScheduleData.act_id,
                section_id: newSubScheduleData.section_id,
                sub_section_id: newSubScheduleData.sub_section_id,
                schedule_id: newSubScheduleData.schedule_id,
                sub_schedule_id: newSubScheduleData.sub_schedule_id,


                appendment_after_act_id: actID ? actID : null,
                appendment_after_section_id: sectionID ? sectionID : null,
                appendment_after_sub_section_id: subSectionID ? subSectionID : null,
                appendment_after_schedule_id: clauseID ? clauseID : null,
                appendment_after_sub_schedule_id: subClauseID ? subClauseID : null,

                appendment_after_type: type ? type : null,
                appendment_after_number: appendmentNo ? appendmentNo : null,
                appendment_after_heading: appendmentHeading ? appendmentHeading : null,
                appendment_after_content: appendmentNo ? appendmentNo : null
            }
        );
        setActionButton(false)
    }
    const handleCreateSection = () => {
        axios.post("/api/subschedule/create/",
            {
                jwt: token,
                act_id: act_id,
                section_id: section_id,
                sub_section_id: sub_section_id,
                schedule_id: schedule_id,
                sub_schedule_number: sub_schedule_number ? sub_schedule_number : null,
                heading: heading ? heading : null,
                content: content ? content : null,
            },
        )
            .then(response => {
                setNewSubScheduleData(response.data)
                setSubScheduleSubmit(true)
                setIsFinishButton(true)
            })
            .catch(error => {
                if (error.response && error.response.status === 403) {

                    alert(error.response.data.detail);
                } else if (error.request) {

                    alert(error.request);
                } else {

                    alert('Error', error.detail);
                }
            })
    }

    useEffect(() => {
        setGetSectionList("")
        setGetSubSectionList("")
        setGetClauseList("")
        setGetSubClauseList("")
    }, [category])

    const handleActionButton = () => {
        setActionButton(true)
        setActID("")
        setSectionID("")
        setSubSectionID("")
        setClauseID("")
        setSubClauseID("")
        setEditContent("")
        setValue("")
    }
    return (
        <div style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',

        }}>
            {!subScheduleSubmit && (
                <>
                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        width: '100%',

                    }}>
                        <TextField fullWidth label="উপদফা নম্বর" variant="outlined" className='text_field'
                                   value={sub_schedule_number} onChange={handleSectionNo}
                                   inputProps={{style: {height: '15px'}}}/>
                        {/*                        <TextField fullWidth label="উপদফা শিরোনাম" variant="outlined" className='text_field'
                                   value={heading} onChange={handleSectionHeading}
                                   inputProps={{style: {height: '15px'}}}/>*/}
                    </div>
                    {/*                    <TextField fullWidth label="উপদফা বিষয়বস্তু" variant="outlined" className='text_field'
                               value={content} onChange={handleSectionContent} inputProps={{style: {height: '15px'}}}/>*/}

                    <CKEditor className='text_field'
                              editor={ClassicEditor}
                              data={content}
                              onChange={handleSectionContent}
                              config={{
                                  placeholder: 'উপদফা বিষয়বস্তু',
                              }}
                    />


                    <Button variant='contained' className='text_field_sign'
                            onClick={handleCreateSection}
                    >সাবমিট</Button>
                </>
            )}

            {subScheduleSubmit && (
                <>
                    <div style={{width: '100%'}}>
                        <b className='text-info'>উপদফা</b> নম্বর: {sub_schedule_number} বিষয়বস্তু: {content}

                        {/*   {sub_schedule_number} {content}*/}

                        <Button variant='contained' className='text_field_sign'
                                onClick={handleActionButton}
                        >+Action</Button>
                        {actionButton && (
                            <div style={{width: '50%', marginTop: '10px'}}>
                                <DropdownList
                                    dataKey="id"
                                    textField="color"
                                    value={value}
                                    placeholder="Select Action"
                                    onChange={(nextValue) => setValue(nextValue.id)}
                                    data={[
                                        {id: 2, color: "সংশোধন"},
                                        {id: 3, color: "বাতিল"},
                                        {id: 4, color: "সংযোজন"},
                                    ]}
                                />
                                {ammendment && (
                                    <div style={{
                                        display: 'flex',
                                        gap: '10px',
                                        marginTop: '10px',
                                        flexDirection: 'column',
                                    }}>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">ক্যাটাগরি টাইপ</label>
                                            <DropdownList
                                                dataKey="id"
                                                textField="name"
                                                value={category}
                                                placeholder='ক্যাটাগরি টাইপ'
                                                onChange={value => setCategory(value.name)}
                                                data={getCategoryList}
                                            />
                                        </div>

                                        <DropdownList
                                            dropUp
                                            dataKey="id"
                                            textField="title_of_act"
                                            value={actID}
                                            placeholder="Select act"
                                            onChange={(nextValue) => setActID(nextValue.id)}
                                            data={getActList}
                                        />
                                        <div style={{display: 'flex', gap: '10px', width: '200%'}}>
                                            <DropdownList
                                                dropUp
                                                dataKey="id"
                                                textField="number"
                                                value={sectionID}
                                                placeholder="Select section"
                                                onChange={(nextValue) => setSectionID(nextValue.id)}
                                                data={getSectionList}
                                            />
                                            <DropdownList
                                                dropUp
                                                dataKey="id"
                                                textField="number"
                                                value={subSectionID}
                                                placeholder="Select Subsection"
                                                onChange={(nextValue) => setSubSectionID(nextValue.id)}
                                                data={getSubSectionList}
                                            />
                                            <DropdownList
                                                dropUp
                                                dataKey="id"
                                                textField="number"
                                                value={clauseID}
                                                placeholder="Select Clause"
                                                onChange={(nextValue) => setClauseID(nextValue.id)}
                                                data={getClauseList}
                                            />
                                            <DropdownList
                                                dropUp
                                                dataKey="id"
                                                textField="number"
                                                value={subClauseID}
                                                placeholder="Select Subclause"
                                                onChange={(nextValue) => setSubClauseID(nextValue.id)}
                                                data={getSubClauseList}
                                            />
                                        </div>
                                        <Button variant='contained' className='text_field_sign'
                                                onClick={handleGetContent}
                                        >সাবমিট</Button>

                                        {isOpenContent && (
                                            <div>
                                                {!subSectionID && (
                                                    <TextField fullWidth label="শিরোনাম" variant="outlined"
                                                               className='text_field'
                                                               value={editHeading} onChange={handleEditHeading}
                                                               inputProps={{style: {height: '15px'}}}/>
                                                )}
                                                <br/>
                                                <CKEditor className='text_field'
                                                          editor={ClassicEditor}
                                                          data={editContent}
                                                          onChange={handleEditContent}
                                                          config={{
                                                              placeholder: 'বিষয়বস্তু',
                                                          }}
                                                />
                                                <Button variant='contained' className='text_field_sign'
                                                        onClick={handlePostAmmendment}
                                                >সাবমিট</Button>
                                            </div>
                                        )}
                                    </div>
                                )}


                                {repealed && (
                                    <div style={{
                                        display: 'flex',
                                        gap: '10px',
                                        marginTop: '10px',
                                        flexDirection: 'column',
                                    }}>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">ক্যাটাগরি টাইপ</label>
                                            <DropdownList
                                                dataKey="id"
                                                textField="name"
                                                value={category}
                                                placeholder='ক্যাটাগরি টাইপ'
                                                onChange={value => setCategory(value.name)}
                                                data={getCategoryList}
                                            />
                                        </div>
                                        <DropdownList
                                            dropUp
                                            dataKey="id"
                                            textField="title_of_act"
                                            value={actID}
                                            placeholder="Select act"
                                            onChange={(nextValue) => setActID(nextValue.id)}
                                            data={getActList}
                                        />
                                        <div style={{display: 'flex', gap: '10px', width: '200%'}}>
                                            <DropdownList
                                                dropUp
                                                dataKey="id"
                                                textField="number"
                                                value={sectionID}
                                                placeholder="Select section"
                                                onChange={(nextValue) => setSectionID(nextValue.id)}
                                                data={getSectionList}
                                            />
                                            <DropdownList
                                                dropUp
                                                dataKey="id"
                                                textField="number"
                                                value={subSectionID}
                                                placeholder="Select Subsection"
                                                onChange={(nextValue) => setSubSectionID(nextValue.id)}
                                                data={getSubSectionList}
                                            />
                                            <DropdownList
                                                dropUp
                                                dataKey="id"
                                                textField="number"
                                                value={clauseID}
                                                placeholder="Select Clause"
                                                onChange={(nextValue) => setClauseID(nextValue.id)}
                                                data={getClauseList}
                                            />
                                            <DropdownList
                                                dropUp
                                                dataKey="id"
                                                textField="number"
                                                value={subClauseID}
                                                placeholder="Select Subclause"
                                                onChange={(nextValue) => setSubClauseID(nextValue.id)}
                                                data={getSubClauseList}
                                            />
                                        </div>
                                        <Button variant='contained' className='text_field_sign'
                                                onClick={handleGetContent}
                                        >সাবমিট</Button>

                                        {isOpenContent && (
                                            <div>
                                                {!subSectionID && (
                                                    <TextField fullWidth label="শিরোনাম" variant="outlined"
                                                               className='text_field'
                                                               value={editHeading} onChange={handleEditHeading}
                                                               inputProps={{style: {height: '15px'}}}/>
                                                )}
                                                <br/>
                                                <CKEditor className='text_field'
                                                          editor={ClassicEditor}
                                                          data={editContent}
                                                          onChange={handleEditContent}
                                                          config={{
                                                              placeholder: 'বিষয়বস্তু',
                                                          }}
                                                />
                                                <Button variant='contained' className='text_field_sign'
                                                        onClick={handlePostRepealed}
                                                >সাবমিট</Button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {appendment && (
                                    <div style={{
                                        display: 'flex',
                                        gap: '10px',
                                        marginTop: '10px',
                                        flexDirection: 'column',
                                    }}>
                                        <hr/>
                                        <h5>Appendment</h5>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">ক্যাটাগরি টাইপ</label>
                                            <DropdownList
                                                dataKey="id"
                                                textField="name"
                                                value={category}
                                                placeholder='ক্যাটাগরি টাইপ'
                                                onChange={value => setCategory(value.name)}
                                                data={getCategoryList}
                                            />
                                        </div>
                                        {getActList && getActList.length > 0 && (
                                        <DropdownList
                                            dropUp
                                            dataKey="id"
                                            textField="title_of_act"
                                            value={actID}
                                            placeholder="Select act"
                                            onChange={(nextValue) => setActID(nextValue.id)}
                                            data={getActList}
                                        />
                                        )}
                                        <div style={{display: 'flex', gap: '10px', width: '200%'}}>
                                            {getSectionList && getSectionList.length > 0 && (
                                            <DropdownList
                                                dropUp
                                                dataKey="id"
                                                textField="number"
                                                value={sectionID}
                                                placeholder="Select section"
                                                onChange={(nextValue) => setSectionID(nextValue.id)}
                                                data={getSectionList}
                                            />
                                            )}
                                            {getSubSectionList && getSubSectionList.length > 0 && (
                                            <DropdownList
                                                dropUp
                                                dataKey="id"
                                                textField="number"
                                                value={subSectionID}
                                                placeholder="Select Subsection"
                                                onChange={(nextValue) => setSubSectionID(nextValue.id)}
                                                data={getSubSectionList}
                                            />
                                            )}
                                            {getClauseList && getClauseList.length > 0 && (
                                            <DropdownList
                                                dropUp
                                                dataKey="id"
                                                textField="number"
                                                value={clauseID}
                                                placeholder="Select Clause"
                                                onChange={(nextValue) => setClauseID(nextValue.id)}
                                                data={getClauseList}
                                            />
                                            )}
                                            {getSubClauseList && getSubClauseList.length > 0 && (
                                            <DropdownList
                                                dropUp
                                                dataKey="id"
                                                textField="number"
                                                value={subClauseID}
                                                placeholder="Select Subclause"
                                                onChange={(nextValue) => setSubClauseID(nextValue.id)}
                                                data={getSubClauseList}
                                            />
                                            )}
                                        </div>
                                        <DropdownList
                                            dataKey="id"
                                            textField="typ"
                                            value={type}
                                            defaultValue={1}
                                            onChange={(nextValue) => setType(nextValue.id)}
                                            data={[
                                                {id: 1, typ: "ধারা"},
                                                {id: 2, typ: "উপ  ধারা"},
                                                {id: 3, typ: "দফা "},
                                                {id: 4, typ: "উপ দফা"},
                                            ]}
                                        />

                                        <>
                                            <div style={{
                                                display: 'flex',
                                                gap: '10px',
                                                width: '100%',

                                            }}>
                                                <TextField fullWidth label={tittle} variant="outlined"
                                                           className='text_field'
                                                           value={appendmentNo} onChange={handleAppendmentNo}
                                                           inputProps={{style: {height: '15px'}}}/>


                                                {type === 1 && (
                                                    <TextField required={true} fullWidth label="শিরোনাম"
                                                               variant="outlined" className='text_field'
                                                               value={appendmentHeading}
                                                               onChange={handleAppendmentHeading}
                                                               inputProps={{style: {height: '15px'}}}/>

                                                )}

                                            </div>
                                            <CKEditor className='text_field'
                                                      editor={ClassicEditor}
                                                      data={appendmentContent}
                                                      onChange={handleAppendmentContent}
                                                      config={{
                                                          placeholder: 'বিষয়বস্তু',
                                                      }}
                                            />
                                            <Button variant='contained' className='text_field_sign'
                                                    onClick={handleCreateAppendment}
                                            >সাবমিট</Button>
                                        </>

                                    </div>
                                )}


                            </div>
                        )}
                    </div>
                    {isFinishButton && (
                        <Button variant='contained' className='text_field_sign'
                                onClick={handleNavigate}
                        >Finish</Button>
                    )}
                </>
            )}


        </div>
    )
}

export default AddSubSchedule