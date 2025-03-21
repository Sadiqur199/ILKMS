import React, {useEffect, useState} from 'react';
import axios from "../axios/axios";
import useAuth from "../../hooks/authHooks";
import {Download, Downloading} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";


const Dashboard = () => {
    const [act, setAct] = useState(null);
    const [ordinances, setOrdinances] = useState(null);
    const [presidentorders, setPresidentorders] = useState(null);
    const [rules, setRules] = useState(null);
    const [regulations, setRegulations] = useState(null);
    const [policies, setPolicies] = useState(null);
    const [guidelines, setGuidelines] = useState(null);
    const [circulars, setCirculars] = useState(null);
    const [notifications, setNotifications] = useState(null);
    const [officeorders, setOfficeorders] = useState(null);
    const [mous, setMous] = useState(null);
    const [manuals, setManuals] = useState(null);
    const [gazettes, setGazettes] = useState(null);
    const [other, setOther] = useState(null);
    const [users, setUsers] = useState(null);
    const[ocrs, setOcrs] = useState(null);
    const[ebook, setEbook] = useState(null);
    const {marginDiv} = useAuth();

    useEffect(() => {
        getCount();
    }, [])
    const getCount = async () => {
        const response = await axios.get(
            "/api/dashboardcounter/"
        );
        if (response) {
            setAct(response.data.data.acts)
            setOrdinances(response.data.data.ordinances)
            setPresidentorders(response.data.data.presidentorders)
            setRules(response.data.data.rules)
            setRegulations(response.data.data.regulations)
            setPolicies(response.data.data.policies)
            setGuidelines(response.data.data.guidelines)
            setCirculars(response.data.data.circulars)
            setNotifications(response.data.data.notifications)
            setOfficeorders(response.data.data.officeholders)
            setMous(response.data.data.mos)
            setManuals(response.data.data.manuals)
            setGazettes(response.data.data.gazettes)
            setOther(response.data.data.others)
            setUsers(response.data.data.user_list_count)
            setOcrs(response.data.data.ocr_page_sum)
            setEbook(response.data.data.ebook_sum)
        }
    };


    const convertNumber = (num) => {
        if (num === null || num === undefined) {
            return "";
        }
        let banglaNumber = "";
        const banglaNumberArray = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
        const numArray = num.toString().split("");
        numArray.forEach((element) => {
            banglaNumber += banglaNumberArray[element];
        });
        return banglaNumber;
    };

    return (
        <div className='category_main_div' style={{ marginLeft: marginDiv ? '155px' : '50px' }}>
                    <div className='container-fluid'>
                        <div className="row">
                            <div className='col-md-12'>
                                <Helmet>
                                    <title>ড্যাশবোর্ড</title>
                                </Helmet>
                                <div className='card mt-4 text-center bg-secondary'>
                                    <div className='card-header text-white'>
                                        ড্যাশবোর্ড
                                    </div>
                                    <div className="card-body">
                                        <div className="row g-2">
                                            <div className='col-md-3 col-lg-3'>
                                                <div className='card '>
                                                    <div className='card-header'>আইন</div>
                                                    <div className='card-body'>
                                                        {convertNumber(act)}
                                                    </div>
                                                    <div className='card-footer'>
                                                        <Link to='/act/list' className='btn btn-primary'>বিস্তারিত</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-3 col-lg-3'>
                                                <div className='card '>
                                                    <div className='card-header'>অধ্যাদেশ</div>
                                                    <div className='card-body'>
                                                        {convertNumber(ordinances)}
                                                    </div>
                                                    <div className='card-footer'>
                                                        <Link to='/ordinance/list' className='btn btn-primary'>বিস্তারিত</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-3 col-lg-3'>
                                                <div className='card '>
                                                    <div className='card-header'>রাষ্ট্রপতির আদেশ</div>
                                                    <div className='card-body'>
                                                        {convertNumber(presidentorders)}
                                                    </div>
                                                    <div className='card-footer'>
                                                        <Link to='/president/order/list' className='btn btn-primary'>বিস্তারিত</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-3 col-lg-3'>
                                                <div className='card '>
                                                    <div className='card-header'>বিধিমালা</div>
                                                    <div className='card-body'>
                                                        {convertNumber(rules)}
                                                    </div>
                                                    <div className='card-footer'>
                                                        <Link to='/adminrule/list' className='btn btn-primary'>বিস্তারিত</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-3 col-lg-3'>
                                                <div className='card '>
                                                    <div className='card-header'>প্রবিধান</div>
                                                    <div className='card-body'>
                                                        {convertNumber(regulations)}
                                                    </div>
                                                    <div className='card-footer'>
                                                        <Link to='/admin' className='btn btn-primary'>বিস্তারিত</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-3 col-lg-3'>
                                                <div className='card '>
                                                    <div className='card-header'>নীতিমালা</div>
                                                    <div className='card-body'>
                                                        {convertNumber(policies)}
                                                    </div>
                                                    <div className='card-footer'>
                                                        <Link to='/admin/policy/list' className='btn btn-primary'>বিস্তারিত</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-3 col-lg-3'>
                                                <div className='card '>
                                                    <div className='card-header'>দপ্তরী নির্দেশিকা</div>
                                                    <div className='card-body'>
                                                        {convertNumber(guidelines)}
                                                    </div>
                                                    <div className='card-footer'>
                                                        <Link to='/admin/guideline/list' className='btn btn-primary'>বিস্তারিত</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-3 col-lg-3'>
                                                <div className='card '>
                                                    <div className='card-header'>প্রজ্ঞাপন</div>
                                                    <div className='card-body'>
                                                        {convertNumber(notifications)}
                                                    </div>
                                                    <div className='card-footer'>
                                                        <Link to='/admin/circular/list' className='btn btn-primary'>বিস্তারিত</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-3 col-lg-3'>
                                                <div className='card'>
                                                    <div className='card-header'>অফিস আদেশ</div>
                                                    <div className='card-body'>
                                                        {convertNumber(officeorders)}
                                                    </div>
                                                    <div className='card-footer'>
                                                        <Link to='/admin/notification/list' className='btn btn-primary'>বিস্তারিত</Link>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-md-3 col-lg-3'>
                                                <div className='card'>
                                                    <div className='card-header'>সমঝোতা স্মারক</div>
                                                    <div className='card-body'>
                                                        {convertNumber(mous)}
                                                    </div>
                                                    <div className='card-footer'>
                                                        <Link to='/admin/other/list' className='btn btn-primary'>বিস্তারিত</Link>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-3 col-lg-3'>
                                                <div className='card'>
                                                    <div className='card-header'>ম্যানুয়াল</div>
                                                    <div className='card-body'>
                                                        {convertNumber(manuals)}
                                                    </div>
                                                    <div className='card-footer'>
                                                        <Link to='/admin/manual/list' className='btn btn-primary'>বিস্তারিত</Link>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-md-3 col-lg-3'>
                                                <div className='card'>
                                                    <div className='card-header'>গেজেট</div>
                                                    <div className='card-body'>
                                                        {convertNumber(gazettes)}
                                                    </div>
                                                    <div className='card-footer'>
                                                        <Link to='/admin/other/list' className='btn btn-primary'>বিস্তারিত</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-3 col-lg-3'>
                                                <div className='card'>
                                                    <div className='card-header'> অন্যান্য</div>
                                                    <div className='card-body'>
                                                        {convertNumber(other)}
                                                    </div>
                                                    <div className='card-footer'>
                                                        <Link to='/admin/other/list' className='btn btn-primary'>বিস্তারিত</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-3 col-lg-3'>
                                                <div className='card'>
                                                    <div className='card-header'> ইউজার লিস্ট</div>
                                                    <div className='card-body'>
                                                        {convertNumber(users)}
                                                    </div>
                                                    <div className='card-footer'>
                                                        <Link to='/admin/users' className='btn btn-primary'>বিস্তারিত</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-3 col-lg-3'>
                                                <div className='card'>
                                                    <div className='card-header'>ওসিআর
                                                    </div>
                                                    <div className='card-body'>
                                                        {convertNumber(ocrs)}
                                                    </div>
                                                    <div className='card-footer'>
                                                        <Link to='/admin/ocr/list' className='btn btn-primary'>বিস্তারিত</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-3 col-lg-3'>
                                                <div className='card'>
                                                    <div className='card-header'>ইবুক</div>
                                                    <div className='card-body'>
                                                        {convertNumber(ebook)}
                                                    </div>
                                                    <div className='card-footer'>
                                                        <Link to='/ebook' className='btn btn-primary'>বিস্তারিত</Link>
                                                    </div>
                                                </div>
                                            </div>















                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
        </div>

    );
};

export default Dashboard;