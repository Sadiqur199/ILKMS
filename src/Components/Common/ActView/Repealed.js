import React from 'react'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from "../../axios/axios";

const Repealed = ({repealed_to_data, repealed_by_data}) => {
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

    const act=(id)=>{
window.location.href = `/ebook/temp/view/${id}`
    }


    return (
        <div style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            background: "#F2FBFF",
            border: "1px solid #fa6d72",
            boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "9px",
            padding: "10px 10px",
            boxSizing: "border-box",
            maxWidth: '700px',
            marginBottom: '10px',
        }}>
            {repealed_by_data && (
                <p style={{
                    marginLeft: '5px',
                    marginBottom: '0px',
                    fontSize: '14px',
                    fontFamily: 'Kalpurush',
                }}>
                    <img src="/images/repealed.svg" style={{height: '20px', paddingRight: '10px'}}/>
                    <Link to="" style={{
                        color: '#0849E9',
                    }}
                          onClick={openPopUpFrom}
                    >
                        {repealed_by_data.repealed_by_act__title_of_act ? repealed_by_data.repealed_by_act__title_of_act + " আইনের" : ""}   {repealed_by_data.repealed_by_act__number ? repealed_by_data.repealed_by_act__number + " নং আইনের" : ""} {repealed_by_data.repealed_by_section__number ? repealed_by_data.repealed_by_section__number + " নং ধারার" : ""} {repealed_by_data.repealed_by_sub_section__number ? repealed_by_data.repealed_by_sub_section__number + " নং উপধারার" : ""} {repealed_by_data.repealed_by_schedule__number ? repealed_by_data.repealed_by_schedule__number + " নং দফার" : ""} {repealed_by_data.repealed_by_sub_schedule__number ? repealed_by_data.repealed_by_sub_schedule__number + " নং উপদফা" : ""} দ্বারা
                        বিলুপ্ত হয়েছে
                    </Link>
                </p>
            )}
            {repealed_to_data && (
                <p style={{
                    marginLeft: '5px',
                    marginBottom: '0px',
                    fontSize: '14px',
                    fontFamily: 'Kalpurush',
                }}>
                    <img src="/images/repealed.svg" style={{height: '20px', paddingRight: '10px'}}/>
                    <Link to="" style={{
                        color: '#0849E9',
                    }}
                          onClick={openPopUpTo}
                    >  {repealed_to_data.repealed_to_act__title_of_act ? repealed_to_data.repealed_to_act__title_of_act + " আইনের" : ""}  {repealed_to_data.repealed_to_act__number ? repealed_to_data.repealed_to_act__number + " নং আইনের" : ""} {repealed_to_data.repealed_to_section__number ? repealed_to_data.repealed_to_section__number + " নং ধারাকে" : ""} {repealed_to_data.repealed_to_sub_section__number ? repealed_to_data.repealed_to_sub_section__number + " নং উপধারাকে" : ""} {repealed_to_data.repealed_to_schedule__number ? repealed_to_data.repealed_to_schedule__number + " নং দফাকে" : ""} {repealed_to_data.repealed_to_sub_schedule__number ? repealed_to_data.repealed_to_sub_schedule__number + " নং উপদফাকে" : ""}
                        বিলুপ্ত করেছে
                    </Link>
                </p>
            )}
            {isOpenFrom && (
                <div
                    className='Action_Modal'
/*                    style={{
                        // height: '200px',
                        width: '700px',
                        maxWidth: '70%',
                        background: 'white',
                        bottom: '50vh',
                        // right: isOpen ? '100px' : '-500px',
                        /!*left: isOpenFrom ? 'calc(50% - 350px)' : '-500px',*!/
                        /!*position: 'fixed',*!/
                        /!*overflow: 'hidden',*!/
                        boxShadow: '0px 0px 16px 6px rgba(0, 0, 0, 0.33)',
                        zIndex: '10000',
                        borderColor: '#0C6395',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderRadius: '10px',
                        opacity: isOpenFrom ? '1' : '0',
                        padding: '20px',

                    }}*/
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
                    <a href={'/ebook/temp/view/' + repealed_by_data.repealed_by_act}  style={{
                        color: 'black',
                    }}>

                        <p className='text-info' style={{
                            marginLeft: '5px',
                            marginBottom: '0px',
                            fontFamily: 'Kalpurush',
                        }}>
                                {repealed_by_data.repealed_by_act__title_of_act ? repealed_by_data.repealed_by_act__title_of_act + " আইনের" : ""}   {repealed_by_data.repealed_by_act__number ? repealed_by_data.repealed_by_act__number + " নং আইনের" : ""} {repealed_by_data.repealed_by_section__number ? repealed_by_data.repealed_by_section__number + " নং ধারা" : ""} {repealed_by_data.repealed_by_sub_section__number ? repealed_by_data.repealed_by_sub_section__number + " নং উপধারা" : ""} {repealed_by_data.repealed_by_schedule__number ? repealed_by_data.repealed_by_schedule__number + " নং দফা" : ""} {repealed_by_data.repealed_by_sub_schedule__number ? repealed_by_data.repealed_by_sub_schedule__number + " নং উপদফা" : ""}

                        </p>



                        <div
                        dangerouslySetInnerHTML={{__html: repealed_by_data.repealed_by_content ? repealed_by_data.repealed_by_content : ''}}/></a>
                </div>
            )}
            {isOpenTo && (
                <div
                    className='Action_Modal'
/*                    style={{
                        width: '700px',
                        maxWidth: '70%',
                        background: 'white',
                        bottom: '50vh',
                        left: isOpenTo ? 'calc(50% - 350px)' : '-500px',
                        position: 'fixed',
                        overflow: 'hidden',
                        boxShadow: '0px 0px 16px 6px rgba(0, 0, 0, 0.33)',
                        zIndex: '10000',
                        borderColor: '#0C6395',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderRadius: '10px',
                        opacity: isOpenTo ? '1' : '0',
                        padding: '20px',

                    }}*/
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
                    <a href={'/ebook/temp/view/' + repealed_to_data.repealed_to_act}  style={{
                        color: 'black',
                    }}>
                        <p className='text-info' style={{
                            marginLeft: '5px',
                            marginBottom: '0px',
                            fontFamily: 'Kalpurush',
                        }}>
  {repealed_to_data.repealed_to_act__title_of_act ? repealed_to_data.repealed_to_act__title_of_act + " আইনের" : ""}  {repealed_to_data.repealed_to_act__number ? repealed_to_data.repealed_to_act__number + " নং আইনের" : ""} {repealed_to_data.repealed_to_section__number ? repealed_to_data.repealed_to_section__number + " নং ধারা" : ""} {repealed_to_data.repealed_to_sub_section__number ? repealed_to_data.repealed_to_sub_section__number + " নং উপধারা" : ""} {repealed_to_data.repealed_to_schedule__number ? repealed_to_data.repealed_to_schedule__number + " নং দফা" : ""} {repealed_to_data.repealed_to_sub_schedule__number ? repealed_to_data.repealed_to_sub_schedule__number + " নং উপদফা" : ""}

                        </p>
                        <div
                        dangerouslySetInnerHTML={{__html: repealed_to_data.repealed_to_content ? repealed_to_data.repealed_to_content : ''}}/></a>
                </div>
            )}

        </div>
    )
}

export default Repealed
