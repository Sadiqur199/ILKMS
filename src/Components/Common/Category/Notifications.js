import React, { useState, useEffect } from 'react'
import './Categories.css'
import useAuth from '../../../hooks/authHooks';
import { Helmet } from 'react-helmet';
import PageLink from '../PageLink';
import { Link } from 'react-router-dom';
import { BiLeftArrowAlt, BiPlus } from 'react-icons/bi'
import axios from "../../axios/axios"

const Notifications = () => {
  const { marginDiv, token } = useAuth();
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const loadNotifications = async () => {
      const response = await axios.get(
        "/api/notifications/"
      );
      setNotifications(response.data);
      // setTotal(response.data.length);

    };

    loadNotifications();
  }, []);
  return (
    <div className='category_main_div' style={{ marginLeft: marginDiv ? '155px' : '50px' }}>
      <Helmet>
        <title>প্রজ্ঞাপন সমূহ</title>
      </Helmet>
      <div>
        <PageLink />
      </div>
      <div className='category_content'>
        <div className='category_content_header'>
          <div style={{ color: '#0C6395' }}>
            <Link to='/'>
              <BiLeftArrowAlt style={{ marginTop: '-3px', fontSize: '25px' }} />
            </Link>
            &nbsp;&nbsp;প্রজ্ঞাপন সমূহ&nbsp;&nbsp;
          </div>
        </div>
        <div className='category_inner_content'>
          <div className='category_loop_div'>
            {notifications.map((notification) => (
              <div className='single_category' key={notification.id}>
                <div className='category_thumbnail'>
                  <img src={notification.cover ? notification.cover : '/images/forum_thumbnail.png'}
                    style={{
                      height: '40px',
                      width: '40px',
                    }}></img>
                </div>
                <div className='category_ques_writer'>
                  <Link to={"/details/" + notification.id}><p>{notification.title_of_act}</p></Link>
                  {/* <p>প্রশ্নকারী: {forum.owner}</p> */}
                </div>
                <div className='category_ans_view'>
                  {/* <p>উত্তর: {forum.comment_counter}</p>
                <p>দেখেছে: {forum.viewer_counter}</p> */}
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Notifications
