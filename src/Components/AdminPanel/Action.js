import React, {useEffect, useState} from 'react';
import './Action.css';
import DropdownList from "react-widgets/DropdownList";
import axios from "../axios/axios";
import {Button} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import useAuth from "../../hooks/authHooks";


const Action = () => {
    const accessToken = localStorage.getItem('access');
    if (!accessToken) {
        window.location.href = "/login"
    }
    const {token} = useAuth();
    const [getCategoryList, setGetCategoryList] = React.useState([]);
    const [actiongetCategoryList, setActionGetCategoryList] = React.useState([]);
    const [category, setCategory] = React.useState("");
    const [actioncategory, setActionCategory] = React.useState("");
    const [getActList, setGetActList] = React.useState([]);
    const [act_year, setActYear] = React.useState([]);
    const [actiongetActList, setActionGetActList] = React.useState([]);

    const [ammendment, setAmmendment] = useState(false)
    const [repealed, setRepealed] = useState(false)
    const [getSectionList, setGetSectionList] = useState([])
    const [actiongetSectionList, setActionGetSectionList] = useState([])
    const [getSubSectionList, setGetSubSectionList] = useState([])
    const [actiongetSubSectionList, setActionGetSubSectionList] = useState([])
    const [getClauseList, setGetClauseList] = useState([])
    const [actiongetClauseList, setActionGetClauseList] = useState([])
    const [getSubClauseList, setGetSubClauseList] = useState([])
    const [actiongetSubClauseList, setActionGetSubClauseList] = useState([])

    const [action, setAction] = useState(false)
    const [appendment, setAppendment] = useState(false)
    const [type, setType] = useState(1)
    const [tittle, setTittle] = useState(1)

    const [appendmentNo, setAppendmentNo] = useState("")
    const [appendmentHeading, setAppendmentHeading] = useState("")
    const [appendmentContent, setAppendmentContent] = useState("")


    /*    const [getContent, setGetContent] = useState([])
        const [getheading, setGetHeading] = useState([])*/
    const [isOpenContent, setIsOpenContent] = useState(false)
    const [editContent, setEditContent] = useState("")
    const [editHeading, setEditHeading] = useState("")

    const [value, setValue] = useState("");
    const [actID, setActID] = useState("");
    const [actionactID, setActionActID] = useState("");
    const [sectionID, setSectionID] = useState("");
    const [actionsectionID, setActionSectionID] = useState("");
    const [subSectionID, setSubSectionID] = useState("");
    const [actionsubSectionID, setActionSubSectionID] = useState("");
    const [clauseID, setClauseID] = useState("");
    const [actionclauseID, setActionClauseID] = useState("");
    const [subClauseID, setSubClauseID] = useState("");
    const [actionsubClauseID, setActionSubClauseID] = useState("");
    useEffect(() => {
        const ActionCategoryList = async () => {
            const response = await axios.get(
                "/api/category/"
            );
            setActionGetCategoryList(response.data);
            setGetCategoryList(response.data);
        };

        ActionCategoryList();
    }, [])
    useEffect(() => {
        if (actioncategory) {
            const actionActList = async () => {
                const response = await axios.post(
                    "/api/getacts/", {
                        ebooks_type: actioncategory
                    }
                );
                setActionGetActList(response.data.Acts);
            };
            actionActList();
        }
    }, [actioncategory])

    useEffect(() => {
        if (actionactID) {
            const actionSectionList = async () => {
                const response = await axios.post(
                    "/api/getsections/",
                    {
                        act_id: actionactID
                    }
                );
                setActionGetSectionList(response.data.sections);
                setActionSectionID("")
                setActionSubSectionID("")
                setActionClauseID("")
                setActionSubClauseID("")
            };
            actionSectionList();
        }
    }, [actionactID])
    useEffect(() => {
        if (actionactID) {
            const actionSectionList = async () => {
                const response = await axios.post(
                    "/api/actyear/",
                    {
                        act_id: actionactID
                    }
                );
                setActYear(response.data.data.act_year);
            };
            actionSectionList();
        }
    }, [actionactID])
    useEffect(() => {
        if (actionsectionID) {
            const actionSubSectionList = async () => {
                const response = await axios.post(
                    "/api/getsubsections/",
                    {
                        section_id: actionsectionID
                    }
                );
                setActionGetSubSectionList(response.data.sub_sections);
                setActionSubSectionID("")
                setActionClauseID("")
                setActionSubClauseID("")
            };

            actionSubSectionList();
        }
    }, [actionsectionID])

    useEffect(() => {
        if (actionsubSectionID) {
            const actionClauseList = async () => {
                const response = await axios.post(
                    "/api/getschedules/",
                    {
                        sub_section_id: actionsubSectionID,

                    }
                );
                setActionGetClauseList(response.data.schedules);
                setActionClauseID("")
                setActionSubClauseID("")

            };

            actionClauseList();
        }
    }, [actionsubSectionID])

    useEffect(() => {
        if (actionclauseID) {
            const actionSubClauseList = async () => {
                const response = await axios.post(
                    "/api/getsubschedules/",
                    {
                        schedule_id: actionclauseID,

                    }
                );
                setActionGetSubClauseList(response.data.sub_schedules);
                setActionSubClauseID("")

            };

            actionSubClauseList();
        }
    }, [actionclauseID])

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
    /*    useEffect(() => {
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
        }, [value])*/

    const handleAction = async () => {
        if (actionsectionID) {
            setAction(true);
        }

    }


    const handleEditContent = (event, editor) => {
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
        if (actID) {
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
                        schedule_id: clauseID,

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
            /*  setGetContent(response.data.content);*/
            /* setGetHeading(response.data.heading);*/
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
                act_year: act_year,
                act_id: actionactID ? actionactID : null,
                section_id: actionsectionID ? actionsectionID : null,
                sub_section_id: actionsubSectionID ? actionsubSectionID : null,
                schedule_id: actionclauseID ? actionclauseID : null,
                sub_schedule_id: actionsubClauseID ? actionsubClauseID : null,

                amendment_to_act_id: actID ? actID : null,
                amendment_to_section_id: sectionID ? sectionID : null,
                amendment_to_sub_section_id: subSectionID ? subSectionID : null,
                amendment_to_schedule_id: clauseID ? clauseID : null,
                amendment_to_sub_schedule_id: subClauseID ? subClauseID : null,

                content: editContent,
                heading: editHeading
            }
        );
        if (response) {
            if (response.status == 200) {
                window.location.reload();
            }

        }
        /*setIsAmmendmentDone(true)*/
    }


    const handlePostRepealed = async () => {
        const response = await axios.post(
            "/api/repealed/",
            {
                jwt: token,
                act_year: act_year,
                act_id: actionactID ? actionactID : null,
                section_id: actionsectionID ? actionsectionID : null,
                sub_section_id: actionsubSectionID ? actionsubSectionID : null,
                schedule_id: actionclauseID ? actionclauseID : null,
                sub_schedule_id: actionsubClauseID ? actionsubClauseID : null,
                repealed_to_act_id: actID ? actID : null,
                repealed_to_section_id: sectionID ? sectionID : null,
                repealed_to_sub_section_id: subSectionID ? subSectionID : null,
                repealed_to_schedule_id: clauseID ? clauseID : null,
                repealed_to_sub_schedule_id: subClauseID ? subClauseID : null,
                content: editContent,
                heading: editHeading
            }
        );
        if (response) {
            if (response.status == 200) {
                window.location.reload();
            }

        }
    }

    const handleAppendmentNo = (event) => {
        setAppendmentNo(event.target.value)
    }

    const handleAppendmentHeading = (event) => {
        setAppendmentHeading(event.target.value)
    }
    const handleAppendmentContent = (event, editor) => {
        const data = editor.getData();
        setAppendmentContent(data)
    }


    const handleCreateAppendment = async () => {
        const response = await axios.post(
            "/api/appendment/",
            {
                jwt: token,
                act_year: act_year,
                act_id: actionactID ? actionactID : null,
                section_id: actionsectionID ? actionsectionID : null,
                sub_section_id: actionsubSectionID ? actionsubSectionID : null,
                schedule_id: actionclauseID ? actionclauseID : null,
                sub_schedule_id: actionsubClauseID ? actionsubClauseID : null,

                appendment_after_act_id: actID ? actID : null,
                appendment_after_section_id: sectionID ? sectionID : null,
                appendment_after_sub_section_id: subSectionID ? subSectionID : null,
                appendment_after_schedule_id: clauseID ? clauseID : null,
                appendment_after_sub_schedule_id: subClauseID ? subClauseID : null,

                appendment_after_type: type ? type : null,
                appendment_after_number: appendmentNo ? appendmentNo : null,
                appendment_after_heading: appendmentHeading ? appendmentHeading : null,
                appendment_after_content: appendmentContent ? appendmentContent : null
            }
        );
        if (response) {
            if (response.status == 200) {
                window.location.reload();
            }

        }
    }
    useEffect(() => {
        setGetSectionList("")
        setGetSubSectionList("")
        setGetClauseList("")
        setGetSubClauseList("")
    }, [category])

    return (
        <>
            <div className='Main'>
                <div className='Inner'>
                    <div className='card'>
                        <div className='card-header text-center text-info'>
                            <h5>ইমপ্যাক্ট </h5>
                        </div>

                        <div className='card-body'>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">ক্যাটাগরি টাইপ</label>
                                <DropdownList
                                    dataKey="id"
                                    textField="name"
                                    value={actioncategory}
                                    placeholder='ক্যাটাগরি টাইপ'
                                    onChange={value => setActionCategory(value.name)}
                                    data={actiongetCategoryList}
                                />
                            </div>
                            {actiongetActList && actiongetActList.length > 0 && (
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">{actioncategory} </label>
                                    <DropdownList
                                        dropUp
                                        dataKey="id"
                                        textField="title_of_act"
                                        value={actionactID}
                                        placeholder={actioncategory + " নির্বাচন করুন "}
                                        onChange={(nextValue) => setActionActID(nextValue.id)}
                                        data={actiongetActList}
                                    />
                                </div>
                            )}

                            {actiongetSectionList && actiongetSectionList.length > 0 && (
                                <div className="form-goup">
                                    <label>ধারা</label>
                                    <DropdownList
                                        dropUp
                                        dataKey="id"
                                        textField="number"
                                        value={actionsectionID}
                                        placeholder="ধারা নির্বাচন করুন "
                                        onChange={(nextValue) => setActionSectionID(nextValue.id)}
                                        data={actiongetSectionList}
                                    />
                                </div>
                            )}
                            {actiongetSubSectionList && actiongetSubSectionList.length > 0 && (
                                <div className="form-goup">
                                    <label>উপধারা</label>
                                    <DropdownList
                                        dropUp
                                        dataKey="id"
                                        textField="number"
                                        value={actionsubSectionID}
                                        placeholder="উপধারা নির্বাচন করুন "
                                        onChange={(nextValue) => setActionSubSectionID(nextValue.id)}
                                        data={actiongetSubSectionList}
                                    />
                                </div>
                            )}
                            {actiongetClauseList && actiongetClauseList.length > 0 && (
                                <div className="form-goup">
                                    <label>দফা</label>
                                    <DropdownList
                                        dropUp
                                        dataKey="id"
                                        textField="number"
                                        value={actionclauseID}
                                        placeholder="দফা নির্বাচন করুন "
                                        onChange={(nextValue) => setActionClauseID(nextValue.id)}
                                        data={actiongetClauseList}
                                    />
                                </div>
                            )}
                            {actiongetSubClauseList && actiongetSubClauseList.length > 0 && (
                                <div className="form-goup">
                                    <DropdownList
                                        dropUp
                                        dataKey="id"
                                        textField="number"
                                        value={actionsubClauseID}
                                        placeholder="উপদফা নির্বাচন করুন "
                                        onChange={(nextValue) => setActionSubClauseID(nextValue.id)}
                                        data={actiongetSubClauseList}
                                    />
                                </div>
                            )}
                            {actiongetSectionList && actiongetSectionList.length > 0 && (
                                <Button variant='contained' className='text_field_sign'
                                        onClick={handleAction}
                                >সাবমিট</Button>
                            )}

                            {action && (
                                <hr/>
                            )}

                            {action && (
                                <>
                                    <div>
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
                                                    <hr/>
                                                    <h5 className='text-info'>সংশোধন করুন</h5>
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
                                                            placeholder={category}
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
                                                                placeholder="ধারা "
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
                                                                placeholder="উপধারা"
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
                                                                placeholder="দফা "
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
                                                                placeholder="উপদফা "
                                                                onChange={(nextValue) => setSubClauseID(nextValue.id)}
                                                                data={getSubClauseList}
                                                            />
                                                        )}
                                                    </div>
                                                    {getSectionList && getSectionList.length > 0 && (
                                                        <Button variant='contained' className='text_field_sign'
                                                                onClick={handleGetContent}
                                                        >সাবমিট</Button>
                                                    )}

                                                    {isOpenContent && (
                                                        <div>
                                                            {!subSectionID && (
                                                                <TextField fullWidth label="শিরোনাম" variant="outlined"
                                                                           className='text_field'
                                                                           value={editHeading}
                                                                           onChange={handleEditHeading}
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
                                                    <hr/>
                                                    <h5 className='text-info'>বাতিল করুন</h5>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">ক্যাটাগরি টাইপ </label>
                                                        <DropdownList
                                                            dataKey="id"
                                                            textField="name"
                                                            value={category}
                                                            placeholder='ক্যাটাগরি টাইপ '
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
                                                            placeholder={category}
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
                                                    {getSectionList && getSectionList.length > 0 && (
                                                        <Button variant='contained' className='text_field_sign'
                                                                onClick={handleGetContent}
                                                        >সাবমিট</Button>
                                                    )}

                                                    {isOpenContent && (
                                                        <div>
                                                            <div style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                            }}>
                                                                <div>
                                                                    {!subSectionID && (
                                                                        <TextField fullWidth label="শিরোনাম"
                                                                                   variant="outlined"
                                                                                   className='text_field'
                                                                                   value={editHeading}
                                                                                   onChange={handleEditHeading}
                                                                                   inputProps={{style: {height: '15px'}}}/>
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <CKEditor className='text_field'
                                                                              editor={ClassicEditor}
                                                                              data={editContent}
                                                                              onChange={handleEditContent}
                                                                              config={{
                                                                                  placeholder: 'বিষয়বস্তু',
                                                                              }}
                                                                    />
                                                                </div>

                                                            </div>
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
                                                    <h5 className='text-info'>সংযোজন করুন</h5>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Category Type</label>
                                                        <DropdownList
                                                            dataKey="id"
                                                            textField="name"
                                                            value={category}
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
                                                            placeholder={category}
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
                                                    {getSectionList && getSectionList.length > 0 && (
                                                        <>
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
                                                                    <TextField fullWidth label={tittle}
                                                                               variant="outlined"
                                                                               className='text_field'
                                                                               value={appendmentNo}
                                                                               onChange={handleAppendmentNo}
                                                                               inputProps={{style: {height: '15px'}}}/>


                                                                    {type === 1 && (
                                                                        <TextField required={true} fullWidth
                                                                                   label="শিরোনাম"
                                                                                   variant="outlined"
                                                                                   className='text_field'
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
                                                        </>
                                                    )}
                                                </div>
                                            )}


                                        </div>

                                    </div>
                                </>
                            )}

                        </div>
                    </div>


                </div>
            </div>

        </>
    );
};

export default Action;