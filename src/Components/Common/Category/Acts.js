import React, {useState, useEffect} from 'react'
import './Categories.css'
import useAuth from '../../../hooks/authHooks';
import { Helmet } from 'react-helmet';
import PageLink from '../PageLink';
import { Link } from 'react-router-dom';
import { BiLeftArrowAlt, BiPlus } from 'react-icons/bi'
import axios from "../../axios/axios"
import {Button} from "react-bootstrap";
import {convertToBengaliNumber} from "../../../numberConverter";
import {EyeFilled} from "@ant-design/icons";

const Acts = () => {
  const { marginDiv, token } = useAuth();
  const [acts, setActs] = useState([])
  const [sortColumn, setSortColumn] = useState('act_year'); // State to store the column being sorted
  const [sortOrder, setSortOrder] = useState('desc'); // State to store the sorting order


  useEffect(() => {
    const loadActs = async () => {
      const response = await axios.get(
        "/api/acts/"
      );
      setActs(response.data);
      // setTotal(response.data.length);

    };

    loadActs();
  }, []);


  const toggleSortOrder = (column) => {
    if (column === sortColumn) {
      // Toggle sorting order if the same column is clicked again
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set a new column for sorting and default to ascending order
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedActs = [...acts].sort((a, b) => {
    const columnA = a[sortColumn];
    const columnB = b[sortColumn];

    if (sortOrder === 'asc') {
      return columnA < columnB ? -1 : 1;
    } else {
      return columnA > columnB ? -1 : 1;
    }
  });
  return (
      <div className='category_main_div' style={{ marginLeft: marginDiv ? '155px' : '50px' }}>
        <Helmet>
          <title>আইন সমূহ</title>
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
              }}>আইন সমূহ</b>

            </div>
            <div className='card-body'>
              <div className="table-responsive ">
                <table className="table  table-bordered table-hover">
                  <thead className="thead-dark">
                  <tr>
                    <th scope="col">সূচিপত্র</th>
                    <th scope="col">ছবি</th>
                    <th scope="col" className='text-center'>শিরোনাম</th>
                    <th scope="col" onClick={() => toggleSortOrder('act_year')}>
                      প্রকাশনা বছর {sortColumn === 'act_year' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </th>
                    <th scope="col" onClick={() => toggleSortOrder('number')}>
                      আইনের সংখ্যা {sortColumn === 'number' && (sortOrder === 'asc' ? '▲' : '▼') }
                    </th>
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
                  {sortedActs.map((data,index) => (
                      <tr key={index}>
                        <th scope="row"><Link to={"/ebook/temp/view/" + data.id}>{convertToBengaliNumber(index+1)}</Link></th>
                        <th scope="row"><Link to={"/ebook/temp/view/" + data.id}>
                          <div className='category_thumbnail'>
                            <img src={data.cover ? data.cover : '/images/forum_thumbnail.png'}
                                 style={{
                                   height: '40px',
                                   width: '40px',
                                 }}></img>
                          </div>
                        </Link></th>
                        <td>
                          <Link to={"/ebook/comment/" + data.id}>{data.title_of_act}</Link></td>
                        <td>{convertToBengaliNumber(data.act_year)}</td>
                        <td>{convertToBengaliNumber(data.number)}</td>
                        <td>{convertToBengaliNumber( data.publication_date ? data.publication_date:'')}</td>

                        <td>
                          <Link to={"/last/act/view/" + data.id}>
                            <EyeFilled fontSize={25}/>
                          </Link>
                        </td>
                        <td>
                          <Link to={"/ebook/temp/view/" + data.id}>
                            <EyeFilled fontSize={50}/>
                          </Link>
                        </td>
{/*                        <td>{convertToBengaliNumber( data.total_number_of_sections)}</td>
                        <td>{convertToBengaliNumber( data.total_number_of_sub_sections)}</td>
                        <td>{convertToBengaliNumber( data.total_number_of_schedules)}</td>
                        <td>{convertToBengaliNumber( data.total_number_of_sub_schedules)}</td>*/}
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

export default Acts
