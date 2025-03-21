import React, {useState} from 'react'
import {Link} from 'react-router-dom'

const Appendment = ({appendment_from_data, appendment_after_data}) => {
    const [isOpenFrom, setIsOpenFrom] = useState(false);
    const [isOpenTo, setIsOpenTo] = useState(false);
    const openPopUpFrom = () => {
        setIsOpenFrom(true)
    }

    const closePopUpFrom = () => {
        setIsOpenFrom(false)
    }

    const openPopUpTo = () => {
        setIsOpenTo(true)
    }

    const closePopUpTo = () => {
        setIsOpenTo(false)
    }
    return (
        <div style={{
            display: "flex",
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: "flex-start",
            background: "#F2FBFF",
            border: "1px groove #f8a166",
            boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "9px",
            padding: "10px 10px",
            boxSizing: "border-box",
            maxWidth: '700px',
            marginBottom: '10px',
        }}>
            {appendment_from_data ?
                <p style={{
                    marginLeft: '5px',
                    marginBottom: '0px',
                    fontSize: '14px',
                    fontFamily: 'Kalpurush',
                }}>

                    <img src="/images/appendment_from.svg" style={{height: '16px', paddingRight: '10px'}}/>
                    <Link to="" style={{
                        color: '#0849E9',
                    }}
                          onClick={openPopUpFrom}
                    >
                        {appendment_from_data.appendment_from_act__title_of_act ? appendment_from_data.appendment_from_act__title_of_act + " আইনের" : ""} {appendment_from_data.appendment_from_section__number ? appendment_from_data.appendment_from_section__number + " নং ধারার" : ""} {appendment_from_data.appendment_from_sub_section__number ? appendment_from_data.appendment_from_sub_section__number + " নং উপধারার" : ""} {appendment_from_data.appendment_from_schedule__number ? appendment_from_data.appendment_from_schedule__number + " নং দফার" : ""} {appendment_from_data.appendment_from_sub_schedule__number ? appendment_from_data.appendment_from_sub_schedule__number + " নং উপদফার" : ""} দ্বারা
                        সন্নিবেশিত হয়েছে
                    </Link>
                </p>
                :
                ''
            }
            {appendment_after_data ?
                <p style={{
                    marginLeft: '5px',
                    marginBottom: '0px',
                    fontSize: '14px',
                    fontFamily: 'Kalpurush',
                }}>

                    <img src="/images/appendment_after.svg" style={{height: '16px', paddingRight: '10px'}}/>
                    <Link to="" style={{
                        color: '#0849E9',
                    }}
                          onClick={openPopUpTo}
                    >
                        {appendment_after_data.appendment_after_act__title_of_act ? appendment_after_data.appendment_after_act__title_of_act + " আইনের" : ""} {appendment_after_data.appendment_after_act__number ? appendment_after_data.appendment_after_act__number + " নং আইনের" : ""} {appendment_after_data.appendment_after_section__number ? appendment_after_data.appendment_after_section__number + " নং ধারাকে" : ""} {appendment_after_data.appendment_after_sub_section__number ? appendment_after_data.appendment_after_sub_section__number + " নং উপধারাকে" : ""} {appendment_after_data.appendment_after_schedule__number ? appendment_after_data.appendment_after_schedule__number + " নং দফা" : ""} {appendment_after_data.appendment_after_sub_schedule__number ? appendment_after_data.appendment_after_sub_schedule__number + " নং উপদফাকে" : ""}
                        সন্নিবেশিত করেছে
                    </Link>
                </p>
                :
                ''
            }
            {isOpenFrom && (
                <div
                    className='Action_Modal'
                >
                    <span className="close" onClick={closePopUpFrom} style={{
                        position: 'absolute',
                        top: '-5px',
                        right: '10px',
                        cursor: 'pointer',
                        fontSize: '24px',
                    }}>
                        &times;
                    </span>
                    <a href={'/ebook/temp/view/' + appendment_from_data.appendment_from_act} style={{
                        color: 'black',
                    }}>
                        <p className='text-info' style={{
                            marginLeft: '5px',
                            marginBottom: '0px',
                            fontFamily: 'Kalpurush',
                        }}>
                                {appendment_from_data.appendment_from_act__title_of_act ? appendment_from_data.appendment_from_act__title_of_act + " আইনের" : ""} {appendment_from_data.appendment_from_section__number ? appendment_from_data.appendment_from_section__number + " নং ধারা" : ""} {appendment_from_data.appendment_from_sub_section__number ? appendment_from_data.appendment_from_sub_section__number + " নং উপধারার" : ""} {appendment_from_data.appendment_from_schedule__number ? appendment_from_data.appendment_from_schedule__number + " নং দফা" : ""} {appendment_from_data.appendment_from_sub_schedule__number ? appendment_from_data.appendment_from_sub_schedule__number + " নং উপদফা" : ""}
                        </p>
                        <div
                            dangerouslySetInnerHTML={{__html: appendment_from_data.appendment_from_content ? appendment_from_data.appendment_from_content : ''}}/>
                    </a>
                </div>
            )}
            {isOpenTo && (
                <div
                    className='Action_Modal'
                >
                    <span className="close" onClick={closePopUpTo} style={{
                        position: 'absolute',
                        top: '-5px',
                        right: '10px',
                        cursor: 'pointer',
                        fontSize: '24px',
                    }}>
                        &times;
                    </span>
                    <a href={'/ebook/temp/view/' + appendment_after_data.appendment_after_act} style={{
                        color: 'black',
                    }}>

                        <p className='text-info' style={{
                            marginLeft: '5px',
                            marginBottom: '0px',
                            fontFamily: 'Kalpurush',
                        }}>
                                {appendment_after_data.appendment_after_act__title_of_act ? appendment_after_data.appendment_after_act__title_of_act + " আইনের" : ""} {appendment_after_data.appendment_after_act__number ? appendment_after_data.appendment_after_act__number + " নং আইনের" : ""} {appendment_after_data.appendment_after_section__number ? appendment_after_data.appendment_after_section__number + " নং ধারা" : ""} {appendment_after_data.appendment_after_sub_section__number ? appendment_after_data.appendment_after_sub_section__number + " নং উপধারা" : ""} {appendment_after_data.appendment_after_schedule__number ? appendment_after_data.appendment_after_schedule__number + " নং দফা" : ""} {appendment_after_data.appendment_after_sub_schedule__number ? appendment_after_data.appendment_after_sub_schedule__number + " নং উপদফা" : ""}
                        </p>
                        <div
                            dangerouslySetInnerHTML={{__html: appendment_after_data.appendment_after_content ? appendment_after_data.appendment_after_content : ''}}/>
                    </a>
                </div>
            )}
        </div>
    )
}

export default Appendment
