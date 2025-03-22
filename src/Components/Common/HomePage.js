import React, { useEffect, useState } from 'react';
import './HomePage.css';
import MostReadBlog from './MostReadBlog';
import LatestPublication from './LatestPublication';
import ImportantServices from './ImportantServices';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/authHooks';
import MostDiscussedForum from './MostDiscussedForum';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MostLikeBlog from "../MostLikeBlog";

// function Article_div(props) {
//     const article = props.article;

//     const [isReadMore, setIsReadMore] = useState(false);

//     const handleClickAction = () => {
//         setIsReadMore(!isReadMore);
//     }

//     return (
//         // <div style={{ width: '50%' }}>
//         <div className='box_div' style={{ textAlign: 'left' }}>
//             <img src='images/blog_land.png' className='bank_logo' />
//             <p className='tittle_read_blog'>{article.title}</p>
//             <p className='body_read_blog'>
//                 {isReadMore ? article.description : article.description.substring(0, 200)}
//                 <button onClick={handleClickAction} className='button_style'>{isReadMore ? '...বিস্তারিত' : '...বিস্তারিত'}</button>
//             </p>
//         </div>
//     )
// }

const HomePage = (props) => {

    // const articles = [
    //     {
    //         title: 'ব্লগ শিরোনাম এখানে 1',
    //         description: 'বড় বড় গ্রামীণ পরিবার বা জমির মালিকদের সম্পদ ও আয় বৃদ্ধি পাচ্ছে, নানা ধরনের কাজের সঙ্গে জড়িয়ে পড়ছেন তাঁরা। জমির ইজারা দিয়ে তাঁরা অর্থ পাচ্ছেন, তাঁরাই আবার রাইস মিল দিচ্ছেন, শহরে বাড়ি-গাড়ি কিনছেন। আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের আরেক দিকে গ্রামীণ সমাজের'
    //     },
    //     {
    //         title: 'ব্লগ শিরোনাম এখানে 2',
    //         description: 'বড় বড় গ্রামীণ পরিবার বা জমির মালিকদের সম্পদ ও আয় বৃদ্ধি পাচ্ছে, নানা ধরনের কাজের সঙ্গে জড়িয়ে পড়ছেন তাঁরা। জমির ইজারা দিয়ে তাঁরা অর্থ পাচ্ছেন, তাঁরাই আবার রাইস মিল দিচ্ছেন, শহরে বাড়ি-গাড়ি কিনছেন। আরেক দিকে গ্রামীণ সমাজের'
    //     },
    // ];
    // const FilterArticles = useMemo(() => articles.filter((article, index) => index === 0), [articles]);
    const navigate = useNavigate()
    const { marginDiv, visible, setVisible } = useAuth();
    // useEffect(() => {
    //     if (localStorage.getItem('access')) {
    //         navigate('/')
    //     }
    // }, [])

    return (
        <div className='Homepage_div' style={{ marginLeft: marginDiv ? '140px' : '37px' }}>
            <Helmet>
                <title>নাগরিক কর্নার</title>
            </Helmet>
{/*            <div>
                <PageLink />
            </div>*/}
            <div className='container_margin' style={{ flex: 1 }}>
                {/*<div className='max_read_header'><h6 className='fw-bolder'>সর্বাধিক পঠিত</h6></div>*/}
                <div className='max_read_header'><h6 className='fw-bolder'>আলোচিত বিষয়
                </h6></div>
                {/* <div className='container_div_body'> */}
                {/* <div className='blog_box'>
                        {FilterArticles.map((article, index) => {
                            return <Article_div key={index} article={article} />;
                        })}
                    </div>
                    <div className='divider_line'></div>
                    <div className='blog_box'>
                        {FilterArticles.map((article, index) => {
                            return <Article_div key={index} article={article} />;
                        })}
                    </div> */}
                <MostReadBlog />
                {/* </div> */}
            </div>
            <div className='HomePageNewChatBot'>
                <motion.div
                    className='HomePageNewImg'
                    whileHover={{ scale: 1.1 }}
                >
                    <Link>
                        <img
                            src='/images/design1.png'
                            className='HomePageNewImgSecond'
                            onClick={() => setVisible(!visible)}
                        />
                    </Link>
                </motion.div>
                <motion.div className='HomePageNewImg' whileHover={{ scale: 1.1 }}>
                    <Link to='/ebook'>
                        <img
                            src='/images/design2.png'
                            className='HomePageNewImgSecond'
                        />
                    </Link>
                </motion.div>
            </div>
            <div className='ain_forum bottom_part'>
                <div className='container_margin flex_div' style={{ flex: 1, height: '100%' }}>
                    <div style={{ flex: 1 }}>
                        <div className='container_div_header flex_div'>
                            <h6 style={{ flex: 1 }} className='fw-bolder'>আলোচিত ফোরাম</h6>

                        <div className='bar_hide'
                        >
                            <img
                                src='/images/Vector.png'
                            />

                        </div>
                        </div>
                        <div className='container_div_body'>
                            {/* <img src="/images/alochitoforum.png" style={{
                                height: '380px',
                                width: '100%',
                            }}/> */}
                            <MostDiscussedForum />
                        </div>
                    </div>
                </div>
                <div className='container_margin flex_div' style={{ flex: 1, height: '100%' }}>
                    <div style={{ flex: 1 }}>
                        <div className='container_div_header flex_div'>
                            <h6 className='fw-bolder' style={{ flex: 1 }}>আলোচিত ব্লগ </h6>

                            <div className='bar_hide'
                            >
                                <img
                                    src='/images/Vector.png'
                                    className=''
                                />

                            </div>


                        </div>
                        <div className='container_div_body'>
                            {/* <img src="/images/alochitoforum.png" style={{
                                height: '380px',
                                width: '100%',
                            }}/> */}
                            <MostLikeBlog />
                        </div>
                    </div>
                </div>
            </div>
            <div className='ain_forum bottom_part pb-5'>
                <div className='container_margin flex_div' style={{ flex: 1, height: '100%' }}>
                    <div style={{ flex: 1 }}>
                        <div className='container_div_header flex_div'>
                            <h6 style={{
                                flex: 1,
                                textAlign: 'left'
                            }} className='fw-bolder'>সর্বশেষ প্রকাশনা</h6>
                            <div className='bar_hide'
                            >
                                <img
                                    src='/images/Vector.png'
                                    className=''
                                />

                            </div>

                        </div>
                        <div className='container_div_body' style={{
                          /*  minHeight:'33.3rem'*/

                        }}>
                            <LatestPublication />
                        </div>
                    </div>
                </div>
                <div className='smart_service container_margin flex_div' style={{ flex: 1, height: '100%'

                }}>
                    <div style={{ flex: 1 }}>
                        <div className='container_div_header flex_div'><h6
                            style={{
                                flex: 1,
                                textAlign: 'left'
                            }}


                            className='fw-bolder'>ভূমিসেবা </h6>

                            <div className='bar_hide'
                            >
                                <img
                                    src='/images/Vector.png'
                                    className=''
                                />

                            </div>

                        </div>
                        <div className='container_div_body'
                             style={{
                                // minHeight:'33.3rem'
                             }}
                        >
                            <div className='important_services_main'>
                                <a href='https://mutation.land.gov.bd' className='important_services_div' rel="noreferrer noopener">
                                    <img src='../images/mutations.png' className='important_services_image' />
                                    <b>মিউটেশন</b>
                                </a>


                                <a href='https://portal.ldtax.gov.bd/' className='important_services_div'>
                                    <img src='../images/vumiunnoyonkor.png' className='important_services_image' />
                                    <b>ভূমি উন্নয়ন কর   </b>
                                </a>
                                <a href='https://dlrms.land.gov.bd/' className='important_services_div' target="_blank" rel="noreferrer noopener">
                                    <img src='../images/Digitallandrecord.png' className='important_services_image' />
                                    <b>ভূমি রেকর্ড ও ম্যাপ</b>
                                </a>
                                <a href='/' className='important_services_div' >
                                    {/*<img src='../images/blog.png' className='important_services_image' />*/}
                                    <img src='../images/Enamjari.png' className='important_services_image' />
                                    <b>ভূমি অধিগ্রহণ ও হুকুমদখল</b>
                                </a>

                                <a href='https://case.gov.bd/' className='important_services_div' target="_blank" rel="noreferrer noopener">
                                    <img src='../images/1727019358.webp' className='important_services_image' />
                                    <b>ভূমি রাজস্ব মামলা</b>
                                </a>
                                <a href='/' className='important_services_div' target="_blank" rel="noreferrer noopener">
                                    <img src='../images/17270193582.webp' className='important_services_image' />
                                    <b>ভূমি তথ্য ব্যাংক</b>
                                </a>

{/*                                <a href='http://map.land.gov.bd/' className='important_services_div' target="_blank" rel="noreferrer noopener">
                                    <img src='../images/naksha.png' className='important_services_image' />
                                    <b>ভূমি নকশা </b>
                                </a>
                                <a href='https://mutation.land.gov.bd/search-mortgage-info' className='important_services_div' target="_blank" rel="noreferrer noopener">
                                    <img src='../images/mortgejtottho.png' className='important_services_image' />

                                    <b>মর্টগেজ তথ্য যাচাই </b>
                                </a>*/}

                         {/*       <Link to='/' className='important_services_div' rel="noreferrer noopener">
                                    <img src='../images/mutations.png' className='important_services_image' />
                                    <b>মিউটেশন</b>
                                </Link>*/}

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HomePage
