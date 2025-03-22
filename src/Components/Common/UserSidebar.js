import React from 'react';
import './UserSidebar.css';

const UserSidebar = () => {
    return (
        <div className='user_sidebar'>
            <div className='Bangladesh_logo_div'>
                <img src='/images/Bangladesh_Logo.png' className='Bangladesh_logo' />
            </div>
            <div className='ilkms_title_div'>
                <p className='ilkms_title_p'><b>কৃত্রিম বুদ্ধিমত্তায় ভূমি সংক্রান্ত যাবতীয় তথ্য এখন আপনার সন্নিকটে</b></p>
            </div>
        </div>
    )
}

export default UserSidebar
