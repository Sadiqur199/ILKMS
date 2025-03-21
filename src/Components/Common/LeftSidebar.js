import React, { useState } from 'react';
import './LeftSidebar.css';

import { motion } from "framer-motion";
import { FaBars, FaHome } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { GoLaw } from 'react-icons/go';
import { GiClawHammer } from 'react-icons/gi';
import { MdPolicy, MdBlurCircular, MdMenuBook, MdOutlineRuleFolder } from 'react-icons/md';
import { RiGuideLine } from 'react-icons/ri';
import { AiOutlineNotification } from 'react-icons/ai';
import { SiLibreoffice } from 'react-icons/si';
import { FaRegHandshake } from 'react-icons/fa';
import { TfiBookmarkAlt } from 'react-icons/tfi';
import { TbDotsCircleHorizontal } from 'react-icons/tb';
import {BsFillJournalBookmarkFill} from 'react-icons/bs'
import RuleRoundedIcon from '@mui/icons-material/RuleRounded';
import { RxDoubleArrowRight, RxDoubleArrowLeft } from 'react-icons/rx'
import HomePage from './HomePage';
import useAuth from '../../hooks/authHooks';


const routes = [
    {
        path: "/acts",
        name: "আইন",
        icon: <GoLaw />,
    },
    {
        path: "/ordinances",
        name: "অধ্যাদেশ",
        icon: <GiClawHammer />,
    },
    {
        path: "/presidentorders",
        name: "রাষ্ট্রপতির আদেশ",
        icon: <BsFillJournalBookmarkFill fontSize='15px' />,
    },
    {
        path: "/rules",
        name: "বিধিমালা",
        icon: <RuleRoundedIcon fontSize='6px' />,
    },
 
    {
        path: "/policies",
        name: "নীতিমালা",
        icon: <MdPolicy />,
    },
    {
        path: "/guidelines",
        name: "নির্দেশিকা",
        icon: <RiGuideLine />,
    },
    {
        path: "/circulars",
        name: "পরিপত্র",
        icon: <MdBlurCircular />,
    },
    {
        path: "/notifications",
        name: "প্রজ্ঞাপন",
        icon: <AiOutlineNotification />,
    },

    {
        path: "/manuals",
        name: "ম্যানুয়াল",
        icon: <MdMenuBook />,
    },
    {
        path: "/gazettes",
        name: "গেজেট",
        icon: <TfiBookmarkAlt />,
    },
    {
        path: "/others",
        name: "অন্যান্য",
        icon: <TbDotsCircleHorizontal />,
    },

]


const LeftSidebar = () => {
    const {setMarginDiv} = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    localStorage.setItem("isOpen", isOpen);
    setMarginDiv(isOpen);
    const toggle = () => {
        setIsOpen(!isOpen)
        localStorage.setItem("isOpen", !isOpen)
        setMarginDiv(!isOpen)
    };
    return (
        <div className='main_container'>
            <div>
                <motion.div 
                animate={{ width: isOpen ? "140px" : "45px" }}
                // transition={{ duration: .5}} 
                className="Left_Sidebar"
                >
                    <div className='top_section'>
                        {isOpen ? < div className='bars' style={{ marginLeft: '60px' }}>
                            <RxDoubleArrowLeft onClick={toggle} />
                        </div> :
                            <div className='bars' style={{ marginLeft: '-42px' }}>
                                <RxDoubleArrowRight onClick={toggle} />
                            </div>
                        }
                    </div>
                    <section style={{ marginTop: '-20px' }}>
                        {routes.map((route) => (
                            <NavLink to={route.path} key={route.name} className='link_div'>
                                <div>
                                    {route.icon}
                                </div>
                                {isOpen &&
                                    <div>
                                        {route.name}
                                    </div>
                                }
                            </NavLink>
                        ))}
                    </section>
                </motion.div>
            </div >
        </div >
    )
}

export default LeftSidebar
