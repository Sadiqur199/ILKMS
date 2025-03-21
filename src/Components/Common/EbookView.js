import React, {useEffect, useState} from 'react'
import './EbookView.css'
import axios from '../axios/axios'
import {useParams} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import useAuth from '../../hooks/authHooks';

/*import '../CkTable.css'*/


function EbookView() {

    const {marginDiv} = useAuth()
    const params = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        axios.get(
            `/api/others/${params.id}/`
        )
            .then(res => {
                setPost(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [params.id]);

        useEffect(() => {
            axios.post(
                `/api/ebooks/viewercounter/`, {
                ebook_id: params.id
            }
            )
                .then(res => {

                })
                .catch(err => {
                    console.log(err)
                })

        }, [params.id]);

    return (
        <div className='ebook_view_main' style={{marginLeft: marginDiv ? '155px' : '50px', transition: '.5s'}}>
            <Helmet>
                <title>{post.title_of_act}</title>
            </Helmet>
            <div style={{marginTop: '10px', fontFamily: 'Kalpurush', padding: '10px 30px'}}>
                {post.heading && (
                    <div className='text-center'>
                        <b>{post.heading}</b>
                    </div>
                )}
                {post.created_by && (
                    <div className='text-center '>
                        <b>{post.created_by}</b>
                    </div>
                )}
                {post.branch && (
                    <div className='text-center '>
                        <b>{post.branch}</b>
                    </div>
                )}
                {post.sub_branch && (
                    <div className='text-center '>
                        <b>{post.sub_branch}</b>
                    </div>

                )}
                <div className="row">
                    {post.number && (
                    <div className='col-md-6'>
                        {post.number}
                    </div>
                    )}
                    {post.created_at_bn && (
                    <div className='col-md-6'>
                        <div className="row">
                            <div className='col-md-6'>
                              <span className='float-end mt-4'>
                                  তারিখ :
                              </span>
                            </div>
                            <div className='col-md-6'>
                                <span>{post.created_at_bn}</span>
                                    <hr/>
                                <span>{post.created_at_en}</span>
                            </div>
                        </div>

                    </div>
                    )}
                </div>
                {post.ebooks_type && (
                    <div className='text-center mb-2'>
                        <b className='text-decoration-underline'>{post.ebooks_type}</b>
                    </div>
                )}
                <h6>বিষয়: <b>{post.title_of_act}</b></h6>
                {post.motto && (
                    <h6>সূত্র : <b>{post.motto}</b></h6>
                )}
            </div>
            {post.schedules && (
            <div dangerouslySetInnerHTML={{__html: post.schedules}} style={{
                padding: '0px 30px'
            }}/>
            )}
            {(post.signature_by || post.signature_position) && (
                <div className='d-flex justify-content-end w-75 flex-column align-items-end'>
                    {post.signature_by && (
                        <b >{post.signature_by}</b>
                    )}
                    <div className='d-flex justify-content-center'
                         style={{
                             width: '15%'
                         }}>
                        {post.signature_position && (
                            <p >{post.signature_position}</p>
                        )}
                    </div>

                </div>
            )}
            {post.copy_to && (
                <div dangerouslySetInnerHTML={{__html: post.copy_to}}/>
            )}
            {post.footer && (
            <div className='text-center' dangerouslySetInnerHTML={{__html: post.footer}}/>
            )}
        </div>
    )
}

export default EbookView
