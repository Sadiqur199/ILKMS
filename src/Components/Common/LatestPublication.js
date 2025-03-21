import React, { useState, useEffect } from 'react'
import './LatestPublication.css'
import axios from '../axios/axios';
import { Link } from 'react-router-dom';

import { GoLaw } from 'react-icons/go';
import { GiClawHammer } from 'react-icons/gi';
import { MdPolicy, MdBlurCircular, MdMenuBook } from 'react-icons/md';
import { RiGuideLine } from 'react-icons/ri';
import { AiOutlineNotification } from 'react-icons/ai';
import { SiLibreoffice } from 'react-icons/si';
import { FaRegHandshake } from 'react-icons/fa';
import { TfiBookmarkAlt } from 'react-icons/tfi';
import { TbDotsCircleHorizontal } from 'react-icons/tb';
import RuleRoundedIcon from '@mui/icons-material/RuleRounded';

const routes = [
    {
        path: "/",
        name: "আইন",
        icon: <GoLaw />,
    },
    {
        path: "/ain",
        name: "অধ্যাদেশ",
        icon: <GiClawHammer />,
    },
    {
        path: "/ain",
        name: "রাষ্ট্রপতির আদেশ",
        icon: <RuleRoundedIcon fontSize='6px' />,
    },
    {
        path: "/ain",
        name: "বিধিমালা",
        icon: <RuleRoundedIcon fontSize='6px' />,
    },
    {
        path: "/ain",
        name: "প্রবিধান",
        icon: <RuleRoundedIcon fontSize='6px' />,
    },
    {
        path: "/ain",
        name: "নীতিমালা",
        icon: <MdPolicy />,
    },
    {
        path: "/ain",
        name: "নির্দেশিকা",
        icon: <RiGuideLine />,
    },
    {
        path: "/ain",
        name: "পরিপত্র",
        icon: <MdBlurCircular />,
    },
    {
        path: "/ain",
        name: "প্রজ্ঞাপন",
        icon: <AiOutlineNotification />,
    },
    {
        path: "/ain",
        name: "অফিস আদেশ",
        icon: <SiLibreoffice />,
    },
    {
        path: "/ain",
        name: "সমঝোতা স্মারক",
        icon: <FaRegHandshake />,
    },
    {
        path: "/ain",
        name: "ম্যানুয়াল",
        icon: <MdMenuBook />,
    },
    {
        path: "/ain",
        name: "গেজেট",
        icon: <TfiBookmarkAlt />,
    },
    {
        path: "/ain",
        name: "অন্যান্য",
        icon: <TbDotsCircleHorizontal />,
    },

]

const LatestPublication = () => {

    const [lastPublication, setLastPublication] = useState({});

    useEffect(() => {
        axios.get(
            `/api/ebooks/topviewer/`
        )
            .then(res => {
                // console.log(res)
                setLastPublication(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, []);

    return (
        <div className='latest_publication_main'>
            {Object.values(lastPublication).map((publication) =>
                <div className='publication_list' key={publication.id}>
                    <div>
                        {routes.map((route)=>
                            
                            {if (route.name === publication.ebooks_type)
                                {
                                    return (<div className='publication_icon' key={publication.id}>{route.icon}</div>)
                                }
                            }
                        
                        )}
                    </div>
                    <Link to={"/ebook/comment/"+publication.id}><h6>{publication.title_of_act}</h6></Link>
                </div>
            )}
        </div>
    )
}

export default LatestPublication
