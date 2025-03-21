import React, { useState, useEffect } from 'react'
import './Categories.css'
import useAuth from '../../../hooks/authHooks';
import { Helmet } from 'react-helmet';
import PageLink from '../PageLink';
import { Link } from 'react-router-dom';
import { BiLeftArrowAlt, BiPlus } from 'react-icons/bi'
import axios from "../../axios/axios"

const OfficeOrders = () => {
  const { marginDiv, token } = useAuth();
  const [officeOrders, setOfficeOrders] = useState([])

  useEffect(() => {
    const loadOfficeOrders = async () => {
      const response = await axios.get(
        "/api/category/officeorders/"
      );
      console.log(response);
      setOfficeOrders(response.data);
      // setTotal(response.data.length);

    };

    loadOfficeOrders();
  }, []);
  return (
    <div className='category_main_div' style={{ marginLeft: marginDiv ? '155px' : '50px' }}>
      <Helmet>
        <title>অফিস আদেশ সমূহ</title>
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
            &nbsp;&nbsp;অফিস আদেশ সমূহ&nbsp;&nbsp;
          </div>
        </div>
        <div className='category_inner_content'>
          <div className='category_loop_div'>
            {officeOrders.map((officeOrder) => (
              <div className='single_category' key={officeOrder.id}>
                <div className='category_thumbnail'>
                  <img src={officeOrder.cover ? officeOrder.cover : '/images/forum_thumbnail.png'}
                    style={{
                      height: '40px',
                      width: '40px',
                    }}></img>
                </div>
                <div className='category_ques_writer'>
                  <Link to={"/ebook/comment/" + officeOrder.id}><p>{officeOrder.heading}</p></Link>
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

export default OfficeOrders
