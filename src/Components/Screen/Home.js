import React from "react";
import BodyHead from "../Common/BodyHead";
import LeftSidebar from "../Common/LeftSidebar";
import BlogContent from "../Common/BlogContent";
import EbookDummy from "../Common/EbookDummy";
import ForumContent from "../Common/ForumContent";
import SignUp from "../Common/SignUp";
import EbookView from "../Common/EbookView";


import './Home.css';
import Footer from "../Common/Footer";

import {
    Route,
    Routes
} from "react-router-dom";
import BlogInner from "../Common/BlogInner";
import EbookComment from "../Common/EbookComment";
import ChatbotView from "../SupportWindow/ChatbotView";
import Login from "../Common/Login";
import ChatbotDummy from "../SupportWindow/ChatbotDummy";
import AddComment from "../Common/AddComment";
import FlipBook from "../Common/FlipBook";
import Profile from "../Common/Profile";
import ForumView from "../Common/ForumView";
import Acts from "../Common/Category/Acts"
import Circulars from "../Common/Category/Circulars"
import Gazzettes from "../Common/Category/Gazzettes"
import Guidelines from "../Common/Category/Guidelines"
import Manuals from "../Common/Category/Manuals"
import Mous from "../Common/Category/Mous"
import Notifications from "../Common/Category/Notifications"
import OfficeOrders from "../Common/Category/OfficeOrders"
import Ordinance from "../Common/Category/Ordinances"
import Others from "../Common/Category/Others"
import Policies from "../Common/Category/Policies"
import PresidentOrders from "../Common/Category/PresidentOrders"
import Orders from "../AdminPanel/presidentorders/Presidentorders"
import RulesAdmin from "../AdminPanel/rules/Rules"
import Regulations from "../Common/Category/Regulations"
import Rules from "../Common/Category/Rules"
import ShowSearchText from "../Common/ShowSearchText";
import ShowSearchContent from "../Common/ShowSearchContent";
import TermAndCondition from "../Common/AppPrivacy/TermAndCondition";
import PrivacyPolicy from "../Common/AppPrivacy/PrivacyPolicy";
import HomePageNew from "../Common/HomePageNew";
import ActInitialView from "../Common/ActView/ActInitialView";
import ActInnerView from "../Common/ActView/ActInnerView";
import AdminLogin from "../AdminPanel/AdminLogin";
import ActInput from "../AdminPanel/ActInput";
import CreateAct from "../AdminPanel/CreateAct";
import CreateSection from "../AdminPanel/CreateSection";
import Action from "../AdminPanel/Action";
import Ocr from "../AdminPanel/Ocr";
import AdminSidebar from "../AdminPanel/AdminSidebar";
import Dashboard from "../AdminPanel/Dashboard";
import OcrList from "../AdminPanel/OcrList";
import OcrDetails from "../AdminPanel/OcrDetails";
import LastView from "../Common/ActView/LastView";
import Users from "../AdminPanel/Users";
import Ordinances from "../AdminPanel/ordinances/Ordinances";
import OrdinanceAdd from "../AdminPanel/ordinances/Ordinance";
import Presidentorder from "../AdminPanel/presidentorders/Presidentorder";
import PoliciesAdmin from "../AdminPanel/Policy/Policies";
import Rule from "../AdminPanel/rules/Rule";
import Policy from "../AdminPanel/Policy/Policy";
import View from "../Common/View";
import Create from "../AdminPanel/Guideline/Create";
import List from "../AdminPanel/Guideline/List";
import Circular from "../AdminPanel/Circulars/Circular";
import CircularsAdmin from "../AdminPanel/Circulars/Circulars";
import Notification from "../AdminPanel/Notifications/Notification";
import NotificationsAdmin from "../AdminPanel/Notifications/Notifications";
import ManualsAdmin from "../AdminPanel/Manuals/Manuals";
import OthersAdmin from "../AdminPanel/Others/Others";
import Manual from "../AdminPanel/Manuals/Manual";
import Other from "../AdminPanel/Others/Other";
import Support from "../Common/Support";
import HomePage from "../Common/HomePage";
import Pdf from "../Common/ActView/Pdf";
import LastPdf from "../Common/ActView/LastPdf";
import Blogs from "../AdminPanel/Blogs/Blogs";
import BlogCreate from "../AdminPanel/Blogs/BlogCreate";
import Forums from "../AdminPanel/Forums/Forums";
import ForumCreate from "../AdminPanel/Forums/ForumCreate";
import Backup from "../AdminPanel/chat/Backup";
import Forgot from "../Common/Forgot";
import Upload from "../AdminPanel/chat/Upload";
import Request from "../AdminPanel/Request";
import Requests from "../AdminPanel/Requests";
import FileBook from "../Common/FileBook";
import {ToastContainer} from "react-toastify";

function Home() {
    const accessToken = localStorage.getItem('access');
    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Routes>
                <Route exact path="/"
                       element={[<BodyHead/>, <LeftSidebar/>, <HomePageNew/> ,<HomePage/>, <ChatbotView/>, <Footer/>]}/>
                <Route exact path="/ebook"
                       element={[<BodyHead/>, <LeftSidebar/>, <EbookDummy/>, <ChatbotView/>, <Footer/>]}/>
                <Route exact path="/blog"
                       element={[<BodyHead/>, <LeftSidebar/>, <BlogContent/>, <ChatbotView/>, <Footer/>]}/>
                <Route exact path="admin/blogs"
                       element={[<BodyHead/>, <AdminSidebar/>, <Blogs/>,  <Footer/>]}/>
                <Route exact path="admin/blog"
                       element={[<BodyHead/>, <AdminSidebar/>, <BlogCreate/>, <Footer/>]}/>
                <Route exact path="admin/request"
                       element={[<BodyHead/>, <AdminSidebar/>, <Request/>,  <Footer/>]}/>

                <Route exact path="admin/request/lists"
                       element={[<BodyHead/>, <AdminSidebar/>, <Requests/>,  <Footer/>]}/>

                <Route exact path="admin/forums"
                       element={[<BodyHead/>, <AdminSidebar/>, <Forums/>,  <Footer/>]}/>
                <Route exact path="admin/forum"
                       element={[<BodyHead/>, <AdminSidebar/>, <ForumCreate/>, <Footer/>]}/>

                <Route exact path="/forum"
                       element={[<BodyHead/>, <LeftSidebar/>, <ForumContent/>, <ChatbotView/>, <Footer/>]}/>
                <Route exact path="/SignUp"
                       element={[<BodyHead/>, <LeftSidebar/>, <SignUp/>, <Footer/>]}/>
                <Route exact path="/login"
                       element={[<BodyHead/>, <LeftSidebar/>, <Login/>, <Footer/>]}/>

                <Route exact path="/forgot"
                       element={[<BodyHead/>, <LeftSidebar/>, <Forgot/>, <ChatbotView/>, <Footer/>]}/>
                <Route exact path="/profile"
                       element={[<BodyHead/>, <AdminSidebar/>, <Profile/>, <ChatbotView/>, <Footer/>]}/>

                <Route exact path="/profile/role/:id"
                       element={[<BodyHead/>, <AdminSidebar/>, <Profile/>, <Footer/>]}/>
                <Route exact path="/search"
                       element={[<BodyHead/>, <LeftSidebar/>, <ShowSearchText/>, <ChatbotView/>, <Footer/>]}/>
                <Route exact path="/termsandconditions"
                       element={[<BodyHead/>, <LeftSidebar/>, <TermAndCondition/>, <ChatbotView/>, <Footer/>]}/>
                <Route exact path="/privacypolicy"
                       element={[<BodyHead/>, <LeftSidebar/>, <PrivacyPolicy/>, <ChatbotView/>, <Footer/>]}/>
                <Route exact path="/search/content/:id"
                       element={[<BodyHead/>, <LeftSidebar/>, <ShowSearchContent/>, <ChatbotView/>, <Footer/>]}/>
                <Route path="/ebook/view/:id"
                       element={[<BodyHead/>, <LeftSidebar/>, <EbookView/>, <ChatbotView/>, <Footer/>]}/>
                <Route path="/support"
                       element={[<BodyHead/>, <LeftSidebar/>, <Support/>, <ChatbotView/>, <Footer/>]}/>
                <Route path="/ebook/comment/:id"
                       element={[<BodyHead/>, <LeftSidebar/>, <EbookComment/>, <ChatbotView/>, <Footer/>]}/>
                <Route path="/details/:id"
                       element={[<BodyHead/>, <LeftSidebar/>, <View/>, <ChatbotView/>, <Footer/>]}/>
                <Route exact path="/forum/view/:id"
                       element={[<BodyHead/>, <LeftSidebar/>, <ForumView/>, <ChatbotView/>, <Footer/>]}/>
                <Route path="/blog/:id"
                       element={[<BodyHead/>, <LeftSidebar/>, <BlogInner/>, <ChatbotView/>, <Footer/>]}/>
                <Route exact path="/chatbot"
                       element={[<BodyHead/>, <LeftSidebar/>, <ChatbotDummy/>, <ChatbotView/>, <Footer/>]}/>
                <Route exact path="/comment"
                       element={[<BodyHead/>, <LeftSidebar/>, <AddComment/>, <ChatbotView/>, <Footer/>]}/>
                <Route path="/ebook/pdf/:id"
                       element={[<BodyHead/>, <LeftSidebar/>, <FlipBook/>, <ChatbotView/>, <Footer/>]}/>
                <Route path="/ebook/system/pdf/:id"
                       element={[<BodyHead/>, <LeftSidebar/>, <FileBook/>, <ChatbotView/>, <Footer/>]}/>
                <Route exact path="/acts" element={[<BodyHead/>, <LeftSidebar/>, <Acts/>, <ChatbotView/>, <Footer/>]}/>
                <Route exact path="/circulars"
                       element={[<BodyHead/>, <LeftSidebar/>, <Circulars/>, <ChatbotView/>, <Footer/>]}/>
                <Route exact path="/ordinances"
                       element={[<BodyHead/>, <LeftSidebar/>, <Ordinance/>, <ChatbotView/>, <Footer/>]}/>
                <Route exact path="/presidentorders"
                       element={[<BodyHead/>, <LeftSidebar/>, <PresidentOrders/>, <ChatbotView/>, <Footer/>]}/>
                <Route exact path="/rules"
                       element={[<BodyHead/>, <LeftSidebar/>, <Rules/>, <ChatbotView/>, <Footer/>]}/>
                <Route exact path="/regulations"
                       element={[<BodyHead/>, <LeftSidebar/>, <Regulations/>, <ChatbotView/>, <Footer/>]}/>
                <Route exact path="/policies"
                       element={[<BodyHead/>, <LeftSidebar/>, <Policies/>, <ChatbotView/>, <Footer/>]}/>
                <Route exact path="/guidelines"
                       element={[<BodyHead/>, <LeftSidebar/>, <Guidelines/>, <ChatbotView/>, <Footer/>]}/>
                <Route exact path="/notifications"
                       element={[<BodyHead/>, <LeftSidebar/>, <Notifications/>, <ChatbotView/>, <Footer/>]}/>
                <Route exact path="/officeorders"
                       element={[<BodyHead/>, <LeftSidebar/>, <OfficeOrders/>, <ChatbotView/>, <Footer/>]}/>
                <Route exact path="/mous" element={[<BodyHead/>, <LeftSidebar/>, <Mous/>, <ChatbotView/>, <Footer/>]}/>
                <Route exact path="/manuals"
                       element={[<BodyHead/>, <LeftSidebar/>, <Manuals/>, <ChatbotView/>, <Footer/>]}/>
                <Route exact path="/gazettes"
                       element={[<BodyHead/>, <LeftSidebar/>, <Gazzettes/>, <ChatbotView/>, <Footer/>]}/>
                <Route exact path="/others"
                       element={[<BodyHead/>, <LeftSidebar/>, <Others/>, <ChatbotView/>, <Footer/>]}/>
                <Route exact path="/ebook/temp"
                       element={[<BodyHead/>, <LeftSidebar/>, <ActInitialView/>, <ChatbotView/>, <Footer/>]}/>
                {/*<Route exact path="/ebook/temp/view" element={[<BodyHead />, <LeftSidebar />, <ActInnerView />, <ChatbotView />, <Footer />]} />*/}
                <Route exact path="/ebook/temp/view/:id"
                       element={[<BodyHead/>, <LeftSidebar/>, <ActInnerView/>, <ChatbotView/>, <Footer/>]}/>
                <Route exact path="/ebook/pdf/view/:id"
                       element={[<Pdf/>]}/>
                <Route exact path="/ebook/pdf/last/:id"
                       element={[<LastPdf/>]}/>
                <Route exact path="/last/act/view/:id"
                       element={[<BodyHead/>, <LeftSidebar/>, <LastView/>, <ChatbotView/>, <Footer/>]}/>
                {accessToken && (
                    <Route exact path="/admin/dashboard" element={[<BodyHead/>,<AdminSidebar/>, <Dashboard/>, <Footer/>]}/>
                )}
                {!accessToken && (
                    <Route exact path="/admin" element={ [<AdminLogin/>]}/>
                )}
                <Route exact path="/actinput" element={[<BodyHead/>, <AdminSidebar/>, <ActInput/>, <Footer/>]}/>
                <Route exact path="admin/users" element={[<BodyHead/>, <AdminSidebar/>, <Users/>, <Footer/>]}/>
                <Route exact path="/act/list" element={[<BodyHead/>, <AdminSidebar/>, <ActInput/>, <Footer/>]}/>
                <Route exact path="/ordinance/list" element={[<BodyHead/>, <AdminSidebar/>, <Ordinances/>, <Footer/>]}/>
                <Route exact path="admin/ordinance/add" element={[<BodyHead/>, <AdminSidebar/>, <OrdinanceAdd/>, <Footer/>]}/>
                <Route exact path="president/order/list" element={[<BodyHead/>, <AdminSidebar/>, <Orders/>, <Footer/>]}/>
                <Route exact path="admin/policy/list" element={[<BodyHead/>, <AdminSidebar/>, <PoliciesAdmin/>, <Footer/>]}/>
                <Route exact path="admin/policy/add" element={[<BodyHead/>, <AdminSidebar/>, <Policy/>, <Footer/>]}/>
                <Route exact path="admin/guideline/add" element={[<BodyHead/>, <AdminSidebar/>, <Create/>, <Footer/>]}/>
                <Route exact path="admin/guideline/list" element={[<BodyHead/>, <AdminSidebar/>, <List/>, <Footer/>]}/>
                <Route exact path="admin/rule/list" element={[<BodyHead/>, <AdminSidebar/>, <RulesAdmin/>, <Footer/>]}/>
                <Route exact path="admin/rule/add" element={[<BodyHead/>, <AdminSidebar/>, <Rule/>, <Footer/>]}/>
                <Route exact path="admin/circular/add" element={[<BodyHead/>, <AdminSidebar/>, <Circular/>, <Footer/>]}/>
                <Route exact path="admin/circular/list" element={[<BodyHead/>, <AdminSidebar/>, <CircularsAdmin/>, <Footer/>]}/>
                <Route exact path="admin/notification/list" element={[<BodyHead/>, <AdminSidebar/>, <NotificationsAdmin/>, <Footer/>]}/>
                <Route exact path="admin/notification/add" element={[<BodyHead/>, <AdminSidebar/>, <Notification/>, <Footer/>]}/>
                <Route exact path="admin/manual/add" element={[<BodyHead/>, <AdminSidebar/>, <Manual/>, <Footer/>]}/>
                <Route exact path="admin/manual/list" element={[<BodyHead/>, <AdminSidebar/>, <ManualsAdmin/>, <Footer/>]}/>
                <Route exact path="admin/other/list" element={[<BodyHead/>, <AdminSidebar/>, <OthersAdmin/>, <Footer/>]}/>
                <Route exact path="admin/other/add" element={[<BodyHead/>, <AdminSidebar/>, <Other/>, <Footer/>]}/>
                <Route exact path="admin/president/order/add" element={[<BodyHead/>, <AdminSidebar/>, <Presidentorder/>, <Footer/>]}/>
                <Route exact path="/createact" element={[<BodyHead/>, <AdminSidebar/>, <CreateAct/>, <Footer/>]}/>
                <Route exact path="/action" element={[<BodyHead/>, <AdminSidebar/>, <Action/>, <Footer/>]}/>
                <Route exact path="admin/ocr/list" element={[<BodyHead/>, <AdminSidebar/>, <OcrList/>, <Footer/>]}/>
                <Route exact path="admin/chat-bot/data/download" element={[<BodyHead/>, <AdminSidebar/>, <Backup/>, <Footer/>]}/>
                <Route exact path="admin/chat-bot/data/upload" element={[<BodyHead/>, <AdminSidebar/>, <Upload/>, <Footer/>]}/>
                <Route exact path="admin/ocr" element={[<BodyHead/>, <AdminSidebar/>, <Ocr/>, <Footer/>]}/>
                <Route exact path="admin/ocr/:id" element={[<BodyHead/>, <AdminSidebar/>, <OcrDetails/>, <Footer/>]}/>
                <Route exact path="/createsection/:id"
                       element={[<BodyHead/>, <AdminSidebar/>, <CreateSection/>, <Footer/>]}/>
                <Route path="*"
                       element={
                           <div>
                               <h2>404 Page not found</h2>
                           </div>
                       }
                />
            </Routes>
            <ToastContainer />
        </div>
    )
}

export default Home
