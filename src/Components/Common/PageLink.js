import React from 'react'
import './PageLink.css'
import { Link, useMatch } from 'react-router-dom';

import {AiFillHome} from 'react-icons/ai';
import {FaBookOpen} from 'react-icons/fa';
import {MdForum} from 'react-icons/md';
import {HiNewspaper} from 'react-icons/hi'

const LINKS = [
    { route: '/', icon: AiFillHome, name: 'নাগরিক কর্নার' },
    { route: '/ebook', icon: FaBookOpen, name: 'ই-বুক' },
    { route: '/blog', icon: HiNewspaper, name: 'ব্লগ' },
    { route: '/forum', icon: MdForum, name: 'ফোরাম' }
  ]

  function LinkItem({ link }) {

    const isActiveRoute = Boolean(useMatch(`${link.route}`));
  
    return (
      <Link to={link.route}>
        <div className={isActiveRoute ? 'nagorik_color' : 'inactive'}>
          {<link.icon className='gap_div'/>} {link.name}
        </div>
      </Link>
    )
  }

const PageLink = ({ data }) => {
    return (
        <div className='Homepage_header_div'
        >
            {LINKS.map(link => <LinkItem key={link.route} link={link} />)}
        </div>
    )
}

export default PageLink
