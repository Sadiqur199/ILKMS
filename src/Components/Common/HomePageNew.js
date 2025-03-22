import React, {useState, useEffect} from 'react';
import useAuth from '../../hooks/authHooks';
import './HomePageNew.css';
import {Helmet} from 'react-helmet';
import SearchText from './SearchText';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import SupportWindow from '../SupportWindow/SupportWindow';
import PageLink from "./PageLink";
import {GoLaw} from "react-icons/go";
import {GiClawHammer} from "react-icons/gi";
import {BsFillJournalBookmarkFill} from "react-icons/bs";
import RuleRoundedIcon from "@mui/icons-material/RuleRounded";
import {MdBlurCircular, MdMenuBook, MdPolicy} from "react-icons/md";
import {RiGuideLine} from "react-icons/ri";
import {AiOutlineNotification} from "react-icons/ai";
import {TbDotsCircleHorizontal} from "react-icons/tb";

const boxVariants = {
    hidden: {
        opacity: 0,
        x: -50,
        transition: {
            x: {duration: 0.5},
        },
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            x: {duration: 0.5},
        },
    },
};

const HomePageNew = () => {
    const {marginDiv, visible, setVisible} = useAuth();
    const [isVisible, setIsVisible] = useState(true);
    const [boxes, setBoxes] = useState([]);
    const [showFruits, setShowFruits] = useState(true);

    useEffect(() => {
        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
                setShowFruits(!showFruits);
                setIsVisible(true);
            }, 1000);
        }, 5000);
    }, [showFruits]);

    function getNewBoxes() {
        const newBoxes = [];
        const fruits = [
            'আইন',
            'অধ্যাদেশ',
            'রাষ্ট্রপতির আদেশ',
            'বিধিমালা',
            'প্রবিধান',
        ];
        const flowers = [
            'নীতিমালা',
            'নির্দেশিকা',
            'পরিপত্র',
            'প্রজ্ঞাপন',
            'অফিস আদেশ',
        ];
        const linkFruits = [
            '/acts',
            '/ordinances',
            '/presidentorders',
            '/rules',
<<<<<<< HEAD
            '/regulations',
=======
            'regulations',
>>>>>>> origin/main
        ];
        const linkFlowers = [
            '/policies',
            '/guidelines',
            '/circulars',
            '/notifications',
            '/officeorders',
        ];

        const itemsToShow = showFruits ? fruits : flowers;

        for (let i = 1; i <= 5; i++) {
            newBoxes.push(
                <motion.div
                    key={`fruit-${i}`}
                    variants={boxVariants}
                    initial='hidden'
                    animate={isVisible ? 'visible' : 'hidden'}
                    style={{display: showFruits ? 'block' : 'none'}}
                    whileHover={{scale: 1.2}}
                >
                    <div
                        style={{width: 120, margin: 10}}
                        className='HomePageNewCategory'
                    >
                        <Link to={linkFruits[i - 1]}>{itemsToShow[i - 1]}</Link>
                    </div>
                </motion.div>
            );
        }

        for (let i = 1; i <= 5; i++) {
            newBoxes.push(
                <motion.div
                    key={`flower-${i}`}
                    variants={boxVariants}
                    initial='hidden'
                    animate={isVisible ? 'visible' : 'hidden'}
                    style={{display: showFruits ? 'none' : 'block'}}
                    whileHover={{scale: 1.2}}
                >
                    <div
                        style={{width: 120, margin: 10}}
                        className='HomePageNewCategory'
                    >
                        <Link to={linkFlowers[i - 1]}>{itemsToShow[i - 1]}</Link>
                    </div>
                </motion.div>
            );
        }

        return newBoxes;
    }

    useEffect(() => {
        setBoxes(getNewBoxes());
    }, [showFruits, isVisible]);

    return (
        <div
            /* responsive for mobile devices by siam start*/
            className='HomePageNewMain'

            /* responsive for mobile devices by siam end*/
            onClick={() => {
                visible && setVisible(!visible);
            }}
        >
            <Helmet>
                <title>হোম</title>
            </Helmet>
            <div className='topmenu' style={{
               /* display: 'flex',*/
                position: 'fixed',
                /*justifyContent: 'end',
                alignItems: 'end',*/
                background: 'var(--primary-bg)',
                paddingRight: '20px',
                zIndex: '10',

                right: '0',
            }}>
                <PageLink/>
            </div>
            <div className='HomePageNewSearchDiv'>
                <div className='hide'>
                    <PageLink/>
                </div>
                <div className='mb-2'>
                    <main className="main">
                        <section className="first-section">
                            <div className="title-container">
                                <figure title='বাংলাদেশ জাতীয় পতাকা' className="logo-container">
                                    <img
                                        src="/images/map3.png"
                                        alt="Bangladesh National Flag"
                                        className="logo"
                                        title='বাংলাদেশ জাতীয় পতাকা'
                                    />
                                </figure>
                                <div title='স্মার্ট ভূমি লোগো' className="subtitle">
                                    <figure>
                                        <img
                                            src="/images/smart.png"
                                            alt="Smart Vhumi Logo"
                                            title='স্মার্ট ভূমি লোগো'
                                        />
                                    </figure>
                                    {/*  <p>The free Encyclopedia</p>*/}
                                </div>
                            </div>
                            <article className="section-content">
                                <div title='আইন' className='mapMenu' style={{
                                   /* marginRight: '20px',*/
                                }}>
                                    <h4>
                                        <Link to="/acts"><GoLaw fontSize={22}/> আইন</Link>
                                    </h4>
                                    {/* <p>1 755 000+ artículos</p>*/}
                                </div>
                                <div title='নীতিমালা' className='mapMenu policy'>
                                    <h4>
                                        <Link to="/policies"><MdPolicy fontSize={22}/> নীতিমালা</Link>
                                    </h4>
                                    {/*  <p>6 458 000+ articles</p>*/}
                                </div>
                                <div title='অধ্যাদেশ' className='mapMenu'>
                                    <h4>
                                        <Link to="/ordinances"><GiClawHammer fontSize={22}/> অধ্যাদেশ</Link>
                                    </h4>
                                    {/* <p>1 798 000+ статей</p>*/}
                                </div>
                                <div title='নির্দেশিকা' className='mapMenu'>
                                    <h4>
                                        <Link to="/guidelines"><RiGuideLine fontSize={22}/> নির্দেশিকা</Link>
                                    </h4>
                                    {/*<p>1 314 000+ 記事</p>*/}
                                </div>
                                <div className='mapMenu' title='রাষ্ট্রপতির আদেশ'>
                                    <h4 className='act_small'>
                                        <Link to="presidentorders/">
                                            <BsFillJournalBookmarkFill fontSize={22}/> রাষ্ট্রপতির আদেশ</Link>
                                    </h4>
                                    {/*  <p>2 667 000+ Artikel</p>*/}
                                </div>
                                <figure title='বাংলাদেশ জাতীয় পতাকা'>
                                    <img
                                        src="/images/map3.png"
                                        alt="Bangladesh National Flag"
                                        title='বাংলাদেশ জাতীয় পতাকা'
                                        className="logo"
                                    />
                                </figure>
                                <div title='পরিপত্র' className='mapMenu'>
                                    <h4>
                                        <Link to="/circulars"><MdBlurCircular fontSize={22} /> পরিপত্র</Link>
                                    </h4>
                                    {/*  <p>2 400 000+ articles</p>*/}
                                </div>
                                <div title='বিধিমালা' className='mapMenu'>
                                    <h4>
                                        <Link to="/rules"><RuleRoundedIcon /> বিধিমালা</Link>
                                    </h4>
                                    {/* <p>1 256 000+ 條目</p>*/}
                                </div>
                                <div title='প্রজ্ঞাপন' className='mapMenu'>
                                    <h4>
                                        <Link to="/notifications"><AiOutlineNotification fontSize={22}/> প্রজ্ঞাপন</Link>
                                    </h4>
                                    {/* <p>1 742 000+ voci</p>*/}
                                </div>
                                <div title='সমঝোতা স্মারক' className='mapMenu others'>
                                    <h4 className='act_small'>
                                        <Link to="/others"><TbDotsCircleHorizontal fontSize={22}/> সমঝোতা স্মারক</Link>
                                    </h4>
                                    {/*  <p>1 085 000+ artigos</p>*/}
                                </div>
                                <div title='ম্যানুয়াল' className='mapMenu manuals'>
                                    <h4>
                                        <Link to="/manuals"><MdMenuBook fontSize={22}/> ম্যানুয়াল</Link>
                                    </h4>
                                    {/* <p>1 512 000+ hasel</p>*/}
                                </div>
                            </article>
                        </section>
                    </main>


                </div>
                <div className='mt-4'>
                    <h3>ভূমি সংক্রান্ত যাবতীয় তথ্য এখন আপনার সন্নিকটে</h3>
                </div>
                <div className='pb-3'>
                    <SearchText/>
                </div>
                {/* <div className='Boxes_Container'>{boxes}</div>*/}
            </div>
            {/*   <div className='HomePageNewChatBot'>
        <motion.div
          className='HomePageNewImg'
          // animate={{scale: 2}}
          whileHover={{ scale: 1.1 }}
          // transition={{delay: .1}}
        >
          <Link>
            <img
              src='/images/chatbot_home.png'
              className='HomePageNewImgSecond'
              onClick={() => setVisible(!visible)}
            />
          </Link>
        </motion.div>
        <motion.div className='HomePageNewImg' whileHover={{ scale: 1.1 }}>
          <Link to='/ebook'>
            <img
              src='/images/ebook_home.png'
              className='HomePageNewImgSecond'
            />
          </Link>
        </motion.div>
      </div>*/}
            <SupportWindow visible={visible}/>
        </div>
    );
};

export default HomePageNew;
