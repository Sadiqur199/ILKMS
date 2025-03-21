import React, { useState, useEffect } from 'react'
import './Categories.css'
import useAuth from '../../../hooks/authHooks';
import { Helmet } from 'react-helmet';
import PageLink from '../PageLink';
import { Link } from 'react-router-dom';
import { BiLeftArrowAlt, BiPlus } from 'react-icons/bi'
import axios from "../../axios/axios"


const Others = () => {
  const { marginDiv, token } = useAuth();
  const [others, setOthers] = useState([])

  useEffect(() => {
    const loadOthers = async () => {
      const response = await axios.get(
        "/api/others/"
      );
      setOthers(response.data);
      // setTotal(response.data.length);

    };

    loadOthers();
  }, []);
  return (
    <div className='category_main_div' style={{ marginLeft: marginDiv ? '155px' : '50px' }}>
      <Helmet>
        <title>অন্যান্য</title>
      </Helmet>
      <div style={{
        marginTop: '0px',
      }}>
        <PageLink />
      </div>
      <div className='category_content'>
        <div className='category_content_header'>
          <div style={{ color: '#0C6395' }}>
            <Link to='/'>
              <BiLeftArrowAlt style={{ marginTop: '-3px', fontSize: '25px' }} />
            </Link>
            &nbsp;&nbsp;অন্যান্য&nbsp;&nbsp;
          </div>
        </div>
        <div className='category_inner_content'>
          <div className='category_loop_div'>
            {others.map((other) => (
              <div className='single_category' key={other.id}>
                <div className='category_thumbnail'>
                  <img src={other.cover ? other.cover : '/images/forum_thumbnail.png'}
                    style={{
                      height: '40px',
                      width: '40px',
                    }}></img>
                </div>
                <div className='category_ques_writer'>
                  <Link to={"/details/" + other.id}><p>{other.title_of_act}</p></Link>
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

export default Others
