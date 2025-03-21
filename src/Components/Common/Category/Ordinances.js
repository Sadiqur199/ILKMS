import React, { useState, useEffect } from 'react'
import './Categories.css'
import useAuth from '../../../hooks/authHooks';
import { Helmet } from 'react-helmet';
import PageLink from '../PageLink';
import { Link } from 'react-router-dom';
import { BiLeftArrowAlt, BiPlus } from 'react-icons/bi'
import axios from "../../axios/axios"
import {convertToBengaliNumber} from "../../../numberConverter";
import {Button} from "react-bootstrap";
import {AiFillDelete} from "react-icons/ai";
import {EyeFilled} from "@ant-design/icons";


const Ordinances = () => {
  const { marginDiv, token } = useAuth();
  const [ordinances, setOrdinances] = useState([])

  useEffect(() => {
    const loadOrdinances = async () => {
      const response = await axios.get(
        "/api/ordinances/"
      );
      setOrdinances(response.data);
      // setTotal(response.data.length);

    };

    loadOrdinances();
  }, []);
  return (
      <div className='category_main_div' style={{ marginLeft: marginDiv ? '155px' : '50px' }}>
        <Helmet>
          <title>অধ্যাদেশ সমূহ</title>
        </Helmet>
        <div style={{
          marginTop: '0px',
        }}>
          <PageLink />
        </div>
          <div className='card'>
            <div className='card-header text-center'>

              <b style={{
                color: '#0c6395',
              }}>অধ্যাদেশ সমূহ</b>

            </div>
            <div className='card-body'>
              <div className="table-responsive ">
                <table className="table  table-bordered table-hover">
                  <thead className="thead-dark">
                  <tr>
                    <th scope="col">সূচিপত্র</th>
                    <th scope="col">ছবি</th>
                    <th scope="col" className='text-center'>শিরোনাম</th>
                    <th scope="col">প্রকাশনা বছর</th>
                    <th scope="col">অধ্যাদেশ সংখ্যা</th>
                    <th scope="col">প্রকাশের তারিখ</th>
                    <th scope="col">
                      সর্বশেষ বলবৎ </th>
                    <th scope="col"> সংশোধনের পূর্বে</th>
{/*                    <th scope="col">সর্বমোট  ধারা</th>
                    <th scope="col">সর্বমোট  উপধারা</th>
                    <th scope="col">সর্বমোট  দফা</th>
                    <th scope="col">সর্বমোট  উপদফা</th>*/}
                  </tr>
                  </thead>
                  <tbody>


                  {ordinances.map((ordinance,index) => (
                      <tr key={index}>
                        <th scope="row"><Link to={"/ebook/temp/view/" + ordinance.id}>{convertToBengaliNumber(index+1)}</Link></th>
                        <th scope="row"><Link to={"/ebook/temp/view/" + ordinance.id}>

                          <div className='category_thumbnail'>
                            <img src={ordinance.cover ? ordinance.cover : '/images/forum_thumbnail.png'}
                                 style={{
                                   height: '40px',
                                   width: '40px',
                                 }}></img>
                          </div>
                        </Link></th>
                        <td>
                          <Link to={"/ebook/comment/" + ordinance.id}>{ordinance.title_of_act}</Link></td>
                        <td>{convertToBengaliNumber(ordinance.act_year)}</td>
                        <td>{convertToBengaliNumber(ordinance.number)}</td>
                        <td>{convertToBengaliNumber(ordinance.publication_date)}</td>

                        <td>
                          <Link to={"/last/act/view/" + ordinance.id}>
                            <EyeFilled fontSize={25}/>
                          </Link>
                        </td>
                        <td>
                          <Link to={"/ebook/temp/view/" + ordinance.id}>
                            <EyeFilled fontSize={25}/>
                          </Link>
                        </td>
{/*                        <td>{convertToBengaliNumber( ordinance.total_number_of_sections)}</td>
                        <td>{convertToBengaliNumber( ordinance.total_number_of_sub_sections)}</td>
                        <td>{convertToBengaliNumber( ordinance.total_number_of_schedules)}</td>
                        <td>{convertToBengaliNumber( ordinance.total_number_of_sub_schedules)}</td>*/}
                      </tr>

                  ))}


                  </tbody>
                </table>

              </div>

            </div>
          </div>
      </div>
  )
}

export default Ordinances
