import React, { useEffect, useState } from "react";
import "./EbookComment.css";
import { BiLeftArrowAlt } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "../axios/axios";

import { Grid, Paper } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { FaComments } from "react-icons/fa";
import ShareIcon from "@mui/icons-material/Share";

import PageLink from "./PageLink";
import { Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import useAuth from "../../hooks/authHooks";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import Comments from "./Comment/Comments";
import { convertToBengaliNumber } from "../../numberConverter";

const View = () => {
  const { marginDiv, token } = useAuth();
  const params = useParams();
  const [post, setPost] = useState({});
  const [cover, setCover] = useState({});
  const [liked, setLiked] = useState(false);
  const ebookURL = `https://bhumipedia.land.gov.bd/ebook/comment/${params.id}`;

  const [showShare, setShowShare] = useState(false);
  const handleShareClick = () => {
    setShowShare(!showShare);
  };

  const handleShareCount = () => {
    axios
      .post("/api/ebooks/usershare/", {
        jwt: token,
        ebook_id: params.id,
        share_link: "",
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLikeEbook = (id) => {
    if (token) {
      axios
        .post("/api/ebooks/userlike/", {
          jwt: token,
          ebook_id: id,
        })
        .then((response) => {
          handleSingleLikeEbook();
          handleLikedEbook();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSingleLikeEbook = () => {
    axios
      .get(`/api/ebooks/${params.id}/`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    actDetailFunction();
    /*  actFileFunction();*/
  }, [params.id]);

  function actDetailFunction() {
    axios
      .get(`/api/others/${params.id}/`)
      .then((res) => {
        setPost(res.data);
        //let cover = axios.defaults.baseURL + "/uploads/" + res.data.cover;
        /*  setPost({...post,cover:cover})*/
        /*                setPost(prevState => {
                                    return {...prevState, cover: cover}

                                })*/
        setCover(res.data.cover);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /*function actFileFunction() {
        axios.post(
            `/api/getactspdf/`, {
                act_id: params.id
            }
        )
            .then(res => {
                let cover = axios.defaults.baseURL + "/uploads/" + res.data.data.cover;
                /!*  setPost({...post,cover:cover})*!/
                /!*                setPost(prevState => {
                                    return {...prevState, cover: cover}

                                })*!/
                setCover(cover)
            })
            .catch(err => {
                console.log(err)
            })
    }*/

  useEffect(() => {
    axios
      .post(`/api/ebooks/userbasedlike/`, {
        jwt: token,
        ebook_id: params.id,
      })
      .then((res) => {
        if (res.data.message === "Found") {
          setLiked(true);
        } else {
          setLiked(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);

  const handleLikedEbook = () => {
    axios
      .post(`/api/ebooks/userbasedlike/`, {
        jwt: token,
        ebook_id: params.id,
      })
      .then((res) => {
        if (res.data.message === "Found") {
          setLiked(true);
        } else {
          setLiked(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="ebook_comment_main"
      style={{ marginLeft: marginDiv ? "155px" : "50px", transition: ".5s" }}
    >
      <Helmet>
        <title>ই-বুক</title>
      </Helmet>
      <div>
        <PageLink />
      </div>
      <div className="ebook_comment_content">
        <div className="ebook_comment_content_header">
          <Link to="/ebook">
            <div>
              <BiLeftArrowAlt style={{ marginTop: "-3px" }} />
              &nbsp;&nbsp;ই-বুক&nbsp;&nbsp;
            </div>
          </Link>
          <div style={{ color: "#0C6395" }}>
            <IoIosArrowForward />
            &nbsp;&nbsp;বিস্তারিত
          </div>
        </div>
        <div className="ebook_comment_content_body">
          <div className="ebook_comment_cover">
            <Paper elevation={4}>
              <img
                src={cover ? cover : "/images/forum_thumbnail.png"}
                className="ebook_comment_cover_size"
              />
            </Paper>
          </div>
          <div className="ebook_comment_book_details">
            <div className="overflow_ebook">
              <h6 style={{ fontWeight: "bold" }}>{post.title_of_act}</h6>
              {post.publication_date && (
                <p>
                  প্রকাশের তারিখঃ{" "}
                  {convertToBengaliNumber(post.publication_date)}
                </p>
              )}
              <div>
                <div dangerouslySetInnerHTML={{ __html: post.proposal }} />
                <div dangerouslySetInnerHTML={{ __html: post.objective }} />
                <p className="read_more"></p>
              </div>
            </div>
            <Grid style={{ display: "flex", marginTop: "10px" }}>
              {/*   <Link to={"/ebook/temp/view/" + post.id}>*/}
              <Link to={"/ebook/view/" + post.id}>
                <Button style={{ marginTop: "-5px", marginRight: "50px" }}>
                  সম্পূর্ণ পড়ুন
                </Button>
              </Link>
              <Link to={"/last/act/view/" + post.id}>
                <Button style={{ marginTop: "-5px", marginRight: "50px" }}>
                  সর্বশেষ বলবৎ
                </Button>
              </Link>
              {post.system_generated_pdf && (
                <Link to={"/ebook/system/pdf/" + post.id}>
                  <Button style={{ marginTop: "-5px", marginRight: "50px" }}>
                    বই আকারে পড়ুন
                  </Button>
                </Link>
              )}
              {post.file && (
                <Link to={"/ebook/pdf/" + post.id}>
                  <Button style={{ marginTop: "-5px", marginRight: "15px" }}>
                    আপলোড ফাইল পড়ুন
                  </Button>
                </Link>
              )}
              <Link
                style={{ marginRight: "15px" }}
                to={"/ebook/pdf/view/" + params.id}
                target="_blank"
              >
                <img src="/pdf.png" width="30px" />
              </Link>
              <VisibilityIcon
                sx={{ fontSize: 16, marginTop: "4px", color: "#0C6395" }}
              />
              <div className="like_comment_padding">{post.viewer_counter}</div>
              {liked ? (
                <ThumbUpIcon
                  sx={{ fontSize: 14, marginTop: "6px", color: "#0C6395" }}
                  onClick={() => {
                    handleLikeEbook(post.id);
                  }}
                />
              ) : (
                <ThumbUpOutlinedIcon
                  sx={{ fontSize: 14, marginTop: "6px", color: "#0C6395" }}
                  onClick={() => {
                    handleLikeEbook(post.id);
                  }}
                />
              )}
              <div className="like_comment_padding">
                {post.like_user_counter}
              </div>
              {/* <ThumbDownIcon sx={{ fontSize: 15, color: "#0C6395" }} />
                            <div className='like_comment_padding'>{post.dislike_user_counter}</div> */}
              <FaComments
                style={{ fontSize: 12, marginTop: "6px", color: "#0C6395" }}
              />
              <div className="like_comment_padding">{post.comment_counter}</div>
              <ShareIcon
                sx={{ fontSize: 12, marginTop: "6px", color: "#0C6395" }}
                onClick={handleShareClick}
              />
              <div className="like_comment_padding">
                {post.share_user_counter}
                {showShare && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      position: "absolute",
                      background: "white",
                      padding: "10px",
                      marginTop: "-220px",
                      boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <FacebookShareButton
                      url={ebookURL}
                      onClick={handleShareCount}
                    >
                      <FacebookIcon size={24} style={{ marginBottom: "5px" }} />
                    </FacebookShareButton>
                    <WhatsappShareButton
                      url={ebookURL}
                      onClick={handleShareCount}
                    >
                      <WhatsappIcon size={24} style={{ marginBottom: "5px" }} />
                    </WhatsappShareButton>
                    {/* <EmailShareButton url={ebookURL} onClick={handleShareCount}>
                                            <EmailIcon size={24} style={{marginBottom: '5px'}}/>
                                        </EmailShareButton> */}
                    <EmailShareButton
                      url={ebookURL}
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `mailto:?subject=Check out this eBook&body=I found this interesting eBook: ${ebookURL}`;
                        handleShareCount();
                      }}
                    >
                      <EmailIcon size={24} style={{ marginBottom: "5px" }} />
                    </EmailShareButton>

                    <LinkedinShareButton
                      url={ebookURL}
                      onClick={handleShareCount}
                    >
                      <LinkedinIcon size={24} style={{ marginBottom: "5px" }} />
                    </LinkedinShareButton>
                    <TelegramShareButton
                      url={ebookURL}
                      onClick={handleShareCount}
                    >
                      <TelegramIcon size={24} style={{ marginBottom: "5px" }} />
                    </TelegramShareButton>
                    <TwitterShareButton
                      url={ebookURL}
                      onClick={handleShareCount}
                    >
                      <TwitterIcon size={24} style={{ marginBottom: "5px" }} />
                    </TwitterShareButton>
                  </div>
                )}
              </div>
            </Grid>
          </div>
        </div>
      </div>
      {/* <AddComment /> */}
      <Comments id={params.id} />
    </div>
  );
};

export default View;
