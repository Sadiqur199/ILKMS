import React, {useEffect, useRef, useState} from 'react';
import './BodyHead.css'
import Button from 'react-bootstrap/Button';
import axios from '../axios/axios';

import {Link} from 'react-router-dom';
import useAuth from '../../hooks/authHooks';
import {BsThreeDotsVertical} from 'react-icons/bs'
import {toast} from "react-toastify";

export default function BodyHead() {
    const {isAuthenticated, removeToken, user, token} = useAuth();
    const [localAccess, setLocalAccess] = useState(false)
    // console.log(user);
    /*  const [userProfile, setUserProfile] = useState('')*/
    const {role} = useAuth();
    const userRole = role ? role : localStorage.getItem("role")

    const menuRef = useRef(null);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);






    const handleApi = () => {
        axios.post("/api/logout/", {jwt: token})
        setShowMenu(!showMenu);
        removeToken();
        //hard reload
        toast.success("লগ আউট সফল হয়েছে")
        window.location.reload();
    }
    useEffect(() => {
        if (localStorage.getItem('access')) {
            setLocalAccess(true)
        }
    }, [])
    const [showMenu, setShowMenu] = useState(false);

    const handleMenuClick = () => {
        setShowMenu(!showMenu);
       // setShowMenu(true);
    };
    return (
        <>
            <div className='header_main'>
                <div className='Header_logo'>
                    <div>
                        <Link to='/'>
                            <img src="/images/vumi_logo.png" className='ilkms_logo'/>
                        </Link>
                    </div>
                </div>
                <div className='header_button'>
                    {isAuthenticated ?
                        <>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <img
                                    src={user?.profile_image ? `${axios.defaults.baseURL}${user.profile_image}` : "/images/profile.png"}
                                    style={{
                                        height: '40px',
                                        width: '40px',
                                    }}/>
                                <p style={{
                                    fontSize: '12px',
                                    margin: '0px 0px 0px',
                                }}>
                                    {user?.full_name}
                                </p>
                            </div>
                            <div ref={menuRef}>
                                <Button  onClick={handleMenuClick} style={{
                                    padding: '0px',
                                    backgroundColor: 'var(--secondary-bg)',
                                }}>
                                    <BsThreeDotsVertical
                                        fontSize={24}
                                      //  className='dotColor'
                                        className='text-black'
                                    />
                                </Button>
                                {showMenu && (
                                    <div   style={{
                                        position: 'fixed',
                                        right: '10px',
                                        marginTop: '10px',
                                        background: 'rgba(255, 255, 255, 0.9)',
                                        alignItems: 'left',
                                        textAlign: 'left',
                                        width: '16%',
                                        border: '1px solid #2193b0',
                                        borderRadius: '6px',
                                    }}>
                                        <ul style={{listStyle: 'none',paddingLeft:'0'}}>
                                            <li className='p-2' >
                                                {localStorage.getItem('role') === 'Admin' && (
                                                    <Link to="/admin/dashboard" onClick={() => {
                                                        setShowMenu(!showMenu)
                                                    }}>
                                                        <img className='img-fluid' src="/dashboard.png"
                                                             alt='pdf download'
                                                             width="24"/>
                                                        <b className='text-center'> ড্যাশবোর্ড</b>
                                                    </Link>
                                                )}
                                            </li>
                                            <li className='p-2'><Link to="/profile" onClick={() => {
                                                setShowMenu(!showMenu)
                                            }}>
                                                <img className='img-fluid' src="/resume.png" alt='pdf download'
                                                     width="24"/>
                                                <b> প্রোফাইল (<small>{userRole}</small>)</b>
                                            </Link>
                                            </li>
                                            <li className='p-2'><Link to="/admin/blogs" onClick={() => {
                                                setShowMenu(!showMenu)
                                            }}>
                                                <img className='img-fluid' src="/blogs.png" alt='ব্লগ'
                                                     width="24"/>
                                                <b> ব্লগ</b>
                                            </Link>
                                            </li>
                                            <li className='p-2'><Link to="/admin/forums" onClick={() => {
                                                setShowMenu(!showMenu)
                                            }}>
                                                <img className='img-fluid' src="/group.png" alt='ফোরাম'
                                                     width="24"/>
                                                <b> ফোরাম</b>
                                            </Link>
                                            </li>
                                            <li className='p-2'>
                                                <Link to="/admin/request" onClick={() => {
                                                    setShowMenu(!showMenu)
                                                }}>
                                                    <img className='img-fluid' src="/apply.png" alt='আবেদন'
                                                         width="24"/>
                                                    <b> আবেদন</b>
                                                </Link>
                                            </li>

                                            <li className='p-2' style={{
                                                cursor: 'pointer'
                                            }}>
                                                <img className='img-fluid' src="/switch.png" alt='লগ আউট'
                                                     width="24"/>
                                                <b
                                                    onClick={handleApi}
                                                > লগ আউট</b>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </>
                        :
                        <>
                            <div>
                                <Link to='/Login'><Button variant="outline-info" className='btn btn-light'>লগইন</Button></Link>
                            </div>
                            <div>
                                <Link to='/SignUp'> <Button variant="outline-info" className='btn btn-light'>সাইন
                                    আপ</Button></Link>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    );
}
