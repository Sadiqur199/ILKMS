import React from 'react';
import './Footer.css';
import useAuth from '../../hooks/authHooks';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { marginDiv } = useAuth();
  return (
    /* responsive for mobile devices by siam start*/
    <div
      className={`footer_div ${
        marginDiv ? 'Footer_margin_left_margin_div_true' : 'Footer_margin_left'
      }`}
       /* responsive for mobile devices by siam end*/
    >
      <div className='footer_content'>
        <div style={{ marginTop: '12px',marginBottom:'7px' }}>
         {/* <p>Planning & Implementation</p>*/}
          <div className='footer_left'>
            <p>Copyright © 2024,All Right Reserved.</p>
            <img
              src='/images/Bangladesh_Logo.png'
              className='footer_bangladesh'
            />
            <p>Ministry of Land</p>

          </div>
        {/*  <p>Copyright © 2023, MoL, All Right Reserved.</p>*/}
        </div>
        <div className='border_div'></div>

        <div>
         {/* <p>Download App</p>*/}
          <div className='footer_right'>
            <a
              href='https://play.google.com/store/apps/details?id=bd.gov.land.bhumipedia&pli=1'
              target='_blank'
              rel='noreferrer noopener'
            >
              <img src='/images/googleplay.png' className='footer_google' />
            </a>
            <a
                href='https://apps.apple.com/us/app/smart-vumipedia/id6473817515'
                target='_blank'
                rel='noreferrer noopener'
            >
            <img src='/images/applestore.png' className='footer_apple' />
            </a>
          </div>
        </div>
        <div className='border_div'></div>
        <div>
          <p style={{
            float: 'left',
            /*marginBottom: 'inherit',*/
          }}>System Development  </p>&nbsp;
          <img style={{float:'right'}} src='/images/Dream71.png' className='footer_dream' />

        </div>

      </div>
{/*
      <div className='footer_copyright'>
        <p>Copyright © 2023, MoL, All Right Reserved.</p>
      </div>*/}
    </div>
  );
};

export default Footer;
