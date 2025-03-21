import React, {useRef, useState} from 'react';
import '../Common/LeftSidebar.css';

import {motion} from "framer-motion";

import {NavLink, useLocation} from 'react-router-dom';
import {GoLaw} from 'react-icons/go';
import {DashboardCustomizeRounded, FileUpload, RuleFolder} from "@mui/icons-material";
import {LaptopWindowsOutlined} from "@mui/icons-material";
import {FileCopyTwoTone, FileDownload} from "@mui/icons-material";
import {RiGuideLine, RiUserSettingsLine} from 'react-icons/ri'
import {RiFilePdfLine} from 'react-icons/ri'
import {RxDoubleArrowRight, RxDoubleArrowLeft} from 'react-icons/rx'
import useAuth from '../../hooks/authHooks';
import {MdBlurCircular, MdForum, MdMenuBook, MdPolicy} from "react-icons/md";
import {AiFillProfile, AiOutlineNotification} from "react-icons/ai";
import {TbDotsCircleHorizontal} from "react-icons/tb";
import {HiNewspaper} from "react-icons/hi";


const AdminSidebar = () => {
    const {setMarginDiv, role} = useAuth();
    const accessToken = localStorage.getItem('access');
    if (!accessToken) {
        window.location.href = "/login"
    }
    const windowWidth = useRef(window.innerWidth);
    /*
         if (windowWidth.current < 768) {
             const [isOpen, setIsOpen] = useState(false);
         }
            else {
                const [isOpen, setIsOpen] = useState(true);
         }
    */

    const [isOpenAdmin, setIsOpen] = useState(windowWidth.current < 768 ? false : true);
    setMarginDiv(isOpenAdmin);
    const toggle = () => {
        setIsOpen(!isOpenAdmin)
        localStorage.setItem("isOpenAdmin", !isOpenAdmin)
        setMarginDiv(!isOpenAdmin)
    };
    const userRole = role ? role : localStorage.getItem("role")
    let routes = [];
    if (userRole === 'Admin') {
        routes = [
            {
                path: "/admin/dashboard",
                name: "ড্যাশবোর্ড",
                icon: <DashboardCustomizeRounded/>,
            },
            {
                path: "/act/list",
                name: "আইন",
                icon: <GoLaw/>,
            },
            {
                path: "/ordinance/list",
                name: "অধ্যাদেশ",
                icon: <RiFilePdfLine/>,
            },
            {
                path: "/president/order/list",
                name: "রাষ্ট্রপতির আদেশ",
                icon: <FileCopyTwoTone/>,
            },
            {
                path: "/admin/rule/list",
                name: "বিধিমালা",
                icon: <RuleFolder/>,
            },
            {
                path: "/admin/policy/list",
                name: "নীতিমালা",
                icon: <MdPolicy/>,
            },
            {
                path: "/admin/guideline/list",
                name: "নির্দেশিকা",
                icon: <RiGuideLine/>,
            },
            {
                path: "/admin/circular/list",
                name: "পরিপত্র",
                icon: <MdBlurCircular/>,
            },
            {
                path: "/admin/notification/list",
                name: "প্রজ্ঞাপন",
                icon: <AiOutlineNotification/>,
            },
            {
                path: "/admin/manual/list",
                name: "ম্যানুয়াল",
                icon: <MdMenuBook/>,
            },
            {
                path: "/admin/other/list",
                name: "অন্যান্য",
                icon: <TbDotsCircleHorizontal/>,
            },
            {
                path: "/admin/ocr/list",
                name: "ওসিআর",
                icon: <LaptopWindowsOutlined/>,
            },
            {
                path: "/admin/users",
                name: "ব্যবহারকারী",
                icon: <RiUserSettingsLine/>,
            },
            {
                path: "/admin/request/lists",
                name: "ব্যবহারকারী আবেদন",
                icon: <RiUserSettingsLine/>,
            },
            {
                path: "/admin/blogs",
                name: "ব্লগ",
                icon: <HiNewspaper/>,
            },
            {
                path: "/admin/forums",
                name: "ফোরাম",
                icon: <MdForum/>,
            },
            {
                path: "/profile",
                name: userRole + " প্রোফাইল",
                icon: <AiFillProfile/>,
            },
            {
                path: "/admin/chat-bot/data/download",
                name: "চ্যাটবট ব্যাকআপ",
                icon: <FileDownload/>,
            },
            {
                path: "/admin/chat-bot/data/upload",
                name: "চ্যাটবট আপলোড",
                icon: <FileUpload/>,
            }
        ]
    }
    if (userRole === 'Editor') {
        routes = [
            {
                path: "/profile",
                name: userRole + " প্রোফাইল",
                icon: <AiFillProfile/>,
            },
            {
                path: "/admin/dashboard",
                name: "ড্যাশবোর্ড",
                icon: <DashboardCustomizeRounded/>,
            },
            {
                path: "/act/list",
                name: "আইন",
                icon: <GoLaw/>,
            },
            {
                path: "/ordinance/list",
                name: "অধ্যাদেশ",
                icon: <RiFilePdfLine/>,
            },
            {
                path: "/president/order/list",
                name: "রাষ্ট্রপতির আদেশ",
                icon: <FileCopyTwoTone/>,
            },
            {
                path: "/admin/rule/list",
                name: "বিধিমালা",
                icon: <RuleFolder/>,
            },
            {
                path: "/admin/policy/list",
                name: "নীতিমালা",
                icon: <MdPolicy/>,
            },
            {
                path: "/admin/guideline/list",
                name: "নির্দেশিকা",
                icon: <RiGuideLine/>,
            },
            {
                path: "/admin/circular/list",
                name: "পরিপত্র",
                icon: <MdBlurCircular/>,
            },
            {
                path: "/admin/notification/list",
                name: "প্রজ্ঞাপন",
                icon: <AiOutlineNotification/>,
            },
            {
                path: "/admin/manual/list",
                name: "ম্যানুয়াল",
                icon: <MdMenuBook/>,
            },
            {
                path: "/admin/other/list",
                name: "অন্যান্য",
                icon: <TbDotsCircleHorizontal/>,
            },
            {
                path: "/admin/ocr/list",
                name: "ওসিআর",
                icon: <LaptopWindowsOutlined/>,
            }

        ]
    }
    if (userRole === 'Blogger') {
        routes = [
            {
                path: "/admin/blogs",
                name: "ব্লগ",
                icon: <HiNewspaper/>,
            },
            {
                path: "/profile",
                name: userRole + " প্রোফাইল",
                icon: <AiFillProfile/>,
            },
            {
                path: "/admin/request",
                name: "আবেদন",
                icon: <AiFillProfile/>,
            }
        ]
    }
    if (userRole === 'ForumUser') {
        routes = [
            {
                path: "/admin/forums",
                name: "ফোরাম",
                icon: <MdForum/>,
            },
            {
                path: "/profile",
                name: userRole + " প্রোফাইল",
                icon: <AiFillProfile/>,
            },
            {
                path: "/admin/request",
                name: "আবেদন",
                icon: <AiFillProfile/>,
            }
        ]
    }
    if (userRole === 'BloggerAndForumUser'){
        routes = [
            {
                path: "/admin/blogs",
                name: "ব্লগ",
                icon: <HiNewspaper/>,
            },
            {
                path: "/admin/forums",
                name: "ফোরাম",
                icon: <MdForum/>,
            },
            {
                path: "/profile",
                name: userRole + " প্রোফাইল",
                icon: <AiFillProfile/>,
            },
            {
                path: "/admin/request",
                name: "আবেদন",
                icon: <AiFillProfile/>,
            }
        ]
    }
    if (userRole === 'Authorized') {
        routes = [
            {
                path: "/admin/blogs",
                name: "ব্লগ",
                icon: <HiNewspaper/>,
            },
            {
                path: "/admin/forums",
                name: "ফোরাম",
                icon: <MdForum/>,
            },
            {
                path: "/admin/request/lists",
                name: "ব্যবহারকারী আবেদন",
                icon: <RiUserSettingsLine/>,
            },
            {
                path: "/profile",
                name: userRole + " প্রোফাইল",
                icon: <AiFillProfile/>,
            }
        ]
    }
    if (userRole === 'General') {
        routes = [
            {
                path: "/profile",
                name: userRole + " প্রোফাইল",
                icon: <AiFillProfile/>,
            },
            {
                path: "/admin/request",
                name: "আবেদন",
                icon: <AiFillProfile/>,
            }
        ]
    }

    const location = useLocation();
    const currentPath = location.pathname;


    return (
        <div className='main_container'>
            <div>
                <motion.div
                    animate={{width: isOpenAdmin ? "150px" : "45px"}}
                    className="Left_Sidebar"
                >
                    <div className='top_section'>
                        {isOpenAdmin ? < div className='bars' style={{marginLeft: '60px'}}>
                                <RxDoubleArrowLeft onClick={toggle}/>
                            </div> :
                            <div className='bars' style={{marginLeft: '-42px'}}>
                                <RxDoubleArrowRight onClick={toggle}/>
                            </div>
                        }
                    </div>
                    <section style={{marginTop: '-20px'}}>
                        {routes.map((route) => (
                            <NavLink to={route.path} key={route.name}
                                     className={`link_div ${route.path === currentPath ? 'active' : ''}`}>
                                <div>
                                    {route.icon}
                                </div>
                                {isOpenAdmin &&
                                    <div>
                                        {route.name}
                                    </div>
                                }
                            </NavLink>
                        ))}
                    </section>
                </motion.div>
            </div>
        </div>
    )
}

export default AdminSidebar
