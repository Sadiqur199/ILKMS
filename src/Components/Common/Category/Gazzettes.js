import React, { useState, useEffect } from 'react'
import './Categories.css'
import useAuth from '../../../hooks/authHooks';
import { Helmet } from 'react-helmet';
import PageLink from '../PageLink';
import { Link } from 'react-router-dom';
import { BiLeftArrowAlt, BiPlus } from 'react-icons/bi'
import axios from "../../axios/axios"
const Gazzettes = () => {
  const { marginDiv, token } = useAuth();
  const [gazzettes, setGazzettes] = useState([])

  useEffect(() => {
    const loadGazzettes = async () => {
      const response = await axios.get(
          "/api/ebook/gazettes/"
      );
      console.log(response);
      setGazzettes(response.data);
      // setTotal(response.data.length);

    };

    loadGazzettes();
  }, []);
  return (
    <div className='category_main_div' style={{ marginLeft: marginDiv ? '155px' : '50px' }}>
      <Helmet>
        <title>গেজেট সমূহ</title>
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
            &nbsp;&nbsp;গেজেট সমূহ&nbsp;&nbsp;
          </div>
        </div>
        <div className='category_inner_content'>
          <div className='category_loop_div'>
            {gazzettes.map((gazettes) => (
              <div className='single_category' key={gazettes.id}>
                <div className='category_thumbnail'>
                  <img src={gazettes.cover ? gazettes.cover : '/images/forum_thumbnail.png'}
                    style={{
                      height: '40px',
                      width: '40px',
                    }}></img>
                </div>
                <div className='category_ques_writer'>
                  <Link to={"/ebook/comment/" + gazettes.id}><p>{gazettes.title_of_act}</p></Link>
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

export default Gazzettes
