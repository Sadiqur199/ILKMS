import React, {useState, useEffect} from 'react'
import './Profile.css'
import {FaEdit} from 'react-icons/fa'
import axios from '../axios/axios'
import useAuth from '../../hooks/authHooks';
import {Button} from 'react-bootstrap';
import PhoneInput from 'react-phone-number-input/input'
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";

const Profile = () => {
    const {user, fetchUser, marginDiv, token} = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [nationalID, setNationalID] = useState('');
    const [address, setAddress] = useState('');
    const [edit, setEdit] = useState(false);
    const [image, setImage] = useState("");
    const [file, setFile] = useState("");
    const params = useParams();
    const [filter, setFilter] = useState('ALL')
    const navigate = useNavigate()

    const baseUrl = axios.defaults.baseURL;

    const handleEdit = () => {
        setEdit(true)
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleBirthDateChange = (e) => {
        setBirthDate(e.target.value)
    }

    const handleNationalIDChange = (e) => {
        setNationalID(e.target.value)
    }

    const handleAddressChange = (e) => {
        setAddress(e.target.value)
    }

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
        setFile(event.target.files[0]);
    };

    useEffect(() => {
        if (params.id) {
            userRole();
        } else {
            if (user) {
                setName(user.full_name);
                setEmail(user.email);
                setImage(user.profile_image);
                setMobile(user.phone_number);
                setBirthDate(user.date_of_birth);
                setNationalID(user.national_id);
                setAddress(user.address);
            }
        }
    }, [user, params.id]);

    const userRole = () => {
        if (params.id) {
            axios.post('/api/profile/',
                {"jwt": token ? token : localStorage.getItem('jwt'), "phone_number": params.id}
            )
                .then(response => {
                    setName(response.data.full_name);
                    if (response.data.email) {
                        setEmail(response.data.email);
                    }
                    setImage(response.data.profile_image);
                    setMobile(response.data.phone_number);
                    if (response.data.date_of_birth){
                        setBirthDate(response.data.date_of_birth);
                    }
                    if (response.data.national_id){
                        setNationalID(response.data.national_id);
                    }
                    if (response.data.address) {
                        setAddress(response.data.address);
                    }
                    if (response.data.address) {
                        setFilter(response.data.role)
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }

    }
    const changeFilter = (e) => {
        setFilter(e.target.value)
    }
    const roleUpdate = () => {
        axios.post('/api/admin/changerole/',
            {
                "jwt": token ? token : localStorage.getItem('jwt'),
                "phone_number": params.id,
                "user_role": filter,
                //multiple role array
              /*  "roles": [filter]*/

            }
        )
            .then(response => {
                if (response.status === 200) {
                    navigate('/admin/users')
                    toast.success('ব্যবহারকারী পরিবর্তন করা হয়েছে')
                }
            })
            .catch(error => {
                console.error(error);
            });
    }


    const handleEditData = () => {
        const formData = new FormData();
        formData.append('full_name', name);
        formData.append('jwt', token);
        if (email){
            formData.append('email', email);
        }
        if (birthDate) {
            formData.append('date_of_birth', birthDate);
        }
        if (nationalID) {
            formData.append('national_id', nationalID);
        }
        if (address) {
            formData.append('address', address);
        }
        if (file) {
            formData.append('profile_image', image, image.name);
        } /*else {
            formData.append('profile_image', image);
        }*/
        axios.put("/api/profile_editing/", formData,
            {
                headers: {'Content-Type': 'multipart/form-data'}
            }
        )
            .then(response => {
                setEdit(false);
                fetchUser();
            })
    }
    return (
        <div className='category_main_div pt-4' style={{ marginLeft: marginDiv ? '155px' : '50px' }}>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <div className='profile_header'>
                                <div style={{color: '#0C6395', marginLeft: '10px'}}>প্রোফাইল</div>
                                <Button onClick={handleEdit} style={{background: 'none'}}>
                                    <FaEdit fontSize={24} style={{
                                        color: 'var(--primary-color)'
                                    }}
                                    />
                                </Button>
                            </div>
                        </div>
                        <div className='card-body'>
                            <div className='profile_body'>
                                <div className="row">
                                    <div className='col-md-4'>
                                        {edit ?
                                            <div style={{
                                                overflow: 'hidden',
                                            }}>
                                                <input
                                                    accept="image/*"
                                                    id="image-upload"
                                                    type="file"
                                                    onChange={handleImageChange}
                                                />
                                            </div>
                                            :
                                            <img src={image ? `${baseUrl}${image}` : "/images/profile.png"} style={{
                                                width: '100%',
                                                overflow: 'hidden',
                                                maxHeight: '350px'
                                            }} />
                                        }
                                    </div>
                                    <div className='col-md-8'>
                                        <div className='row'>
                                            <div className='col-md-12'>
                                                <label className='label-control'>নাম:</label>
                                                {edit ?
                                                    <input type="text" value={name} onChange={handleNameChange}
                                                           className='form-control'
                                                           style={{border: '1px solid #0C6395', background: '#F5F5F5'}}
                                                    />
                                                    :
                                                    <div className='profile_font_two'>{name}</div>
                                                }
                                            </div>
                                            <div className='col-md-12'>
                                                <label className='label-control'>মোবাইল:</label>
                                                <div className='profile_font_two'>{mobile}</div>
                                            </div>
                                            <div className='col-md-12'>
                                                <label className='label-control'>ইমেইল:</label>
                                                {edit ?
                                                    <input
                                                        type="email" value={email ? email : ''} onChange={handleEmailChange}
                                                        className='form-control'
                                                        style={{border: '1px solid #0C6395', background: '#F5F5F5'}}
                                                    />
                                                    :
                                                    <div className='profile_font_two'>{email}</div>
                                                }
                                            </div>
                                        </div>



                                    </div>
                                </div>
                                  {/*  <div className='profile_img_name'>
                                        {edit ?
                                            <>
                                                <input
                                                    accept="image/*"
                                                    id="image-upload"
                                                    type="file"
                                                    onChange={handleImageChange}
                                                />
                                            </>
                                            :
                                            <img src={image ? `${baseUrl}${image}` : "/images/profile.png"}/>
                                        }
                                        <div className='name_email_phone'>
                                            <div className='profile_name_color' style={{
                                                height: '33%'
                                            }}>
                                                <div className='profile_font'>নামঃ</div>
                                                {edit ?
                                                    <input type="text" value={name} onChange={handleNameChange}
                                                           className='profile_font_two'
                                                           style={{border: '1px solid #0C6395', background: '#F5F5F5'}}
                                                    />
                                                    :
                                                    <div className='profile_font_two'>{name}</div>
                                                }
                                            </div>
                                            <div style={{
                                                height: '33%',
                                                background: 'white',
                                                display: 'flex',
                                            }}>
                                                <div className='profile_font'>মোবাইলঃ</div>
                                                <div className='profile_font_two'>{mobile}</div>
                                            </div>
                                            <div className='profile_name_color' style={{
                                                height: '33%'
                                            }}>
                                                <div className='profile_font'>ইমেইলঃ</div>
                                                {edit ?
                                                    <input
                                                        type="email" value={email ? email : ''} onChange={handleEmailChange}
                                                        className='profile_font_two'
                                                        style={{border: '1px solid #0C6395', background: '#F5F5F5'}}
                                                    />
                                                    :
                                                    <div className='profile_font_two'>{email}</div>
                                                }
                                            </div>
                                        </div>
                                    </div>*/}
                                <div className='row'>
                                    <div className='profile_other'>
                                        <div className='row'>
                                            <div className='col-md-12 '>
                                                <label>জন্ম তারিখ:</label>
                                                {edit ?
                                                    <input
                                                        type="date" value={birthDate ? birthDate : ''} onChange={handleBirthDateChange}
                                                        className='form-control'
                                                        style={{border: '1px solid #0C6395'}}
                                                    />
                                                    :
                                                    <div className='profile_font_two'>{birthDate}</div>
                                                }
                                            </div>

                                        </div>
                                        <div className='row '>
                                            <div className='col-md-12 '>
                                                <label htmlFor="">জাতীয় পরিচয় নম্বর:</label>
                                                {edit ?
                                                    <input
                                                        type="text" value={nationalID ? nationalID : ''} onChange={handleNationalIDChange}
                                                        className='form-control'
                                                        style={{border: '1px solid #0C6395', background: '#F5F5F5'}}
                                                    />
                                                    :
                                                    <div className='profile_font_two'>{nationalID}</div>
                                                }
                                            </div>
                                        </div>
                                        <div className='row' style={{
                                            background: 'white'
                                        }}>
                                            <div className='col-md-12 '>
                                                <label className='form-label'>ঠিকানা:</label>
                                                {edit ?
                                                    <input
                                                        type="text" value={address ? address : ''} onChange={handleAddressChange}
                                                        className='form-control'
                                                        style={{border: '1px solid #0C6395'}}
                                                    />
                                                    :
                                                    <div className='profile_font_two'>{address}</div>
                                                }
                                            </div>
                                        </div>
                                        {params.id &&
                                            <div style={{
                                                background: 'white',
                                                display: 'flex',
                                            }}>
                                                <div className='profile_font'>ব্যবহারকারীর ধরন:</div>
                                                <div className='profile_font_two'>{filter}</div>
                                            </div>
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='card-footer'>
                            {params.id &&
                                <>
                                    <label>
                                        ব্যবহারকারীর ধরন
                                    </label>
                                    <select name='filter' className='form-control' onChange={changeFilter} value={filter}>
                                        <option value='Admin'>অ্যাডমিন</option>
                                        <option value='General'>সাধারণ</option>
                                        <option value='Editor'>ইডিটর</option>
                                        <option value='Authorized'>অনুমোদিত</option>
                                        <option value='Blogger'>ব্লগার</option>
                                        <option value='ForumUser'>ফোরাম ব্যবহারকারী</option>
                                        <option value='BloggerAndForumUser'>ফোরাম ব্লগার </option>
                                    </select>
                                    <Button onClick={roleUpdate} style={{
                                        marginBottom: '15px', marginLeft: '50%',
                                    }}>সংরক্ষণ করুন</Button>
                                </>
                            }
                            {!params.id &&
                                <Button onClick={handleEditData} style={{
                                    marginBottom: '15px', marginLeft: '50%',
                                }}>সংরক্ষণ করুন</Button>
                            }
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Profile
