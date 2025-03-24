import React, { useState, useEffect, useRef } from "react";
import "./ActInnerView.css";
import useAuth from "../../../hooks/authHooks";
import { Helmet } from "react-helmet";
import axios from "../../axios/axios";
import EachSectionSingle from "./EachSectionSingle";
import { Link, useParams } from "react-router-dom";
import { convertToBengaliNumber } from "../../../numberConverter";
import Modal from "react-bootstrap/Modal";
import { GoLaw } from "react-icons/go";
import { Box, Button, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ActInnerView = () => {
  const { marginDiv } = useAuth();
  const [post, setPost] = useState({});
  const [year, setYear] = useState(null);
  const [actnumber, setNumber] = useState(null);
  const [oiginalActData, setOriginalActData] = useState({});
  const [liveActData, setLiveActData] = useState([]);
  const [actFile, setActFile] = useState(null);
  const [treeData, setTreeData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const targetRef = useRef(null);

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const handleShow = () => setShow(true);
  const handleShow2 = () => setShow2(true);
  const scrollToSection = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleActData = (actData, year, actNumber) => {
    setYear(year);
    setPost(actData);
    setNumber(actNumber);
  };
  let params = useParams();

  useEffect(() => {
    setShow(false);
    liveActDataFunction();
    actDetailFunction();
    actFileFunction();
    treeFunction();
    counter();
  }, [params.id]);

  const counter = () => {
    axios
      .post(`/api/ebooks/viewercounter/`, {
        ebook_id: params.id,
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  function actFileFunction() {
    axios
      .post(`/api/getactspdf/`, {
        act_id: params.id,
      })
      .then((res) => {
        setActFile(res.data.data.file);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function liveActDataFunction() {
    axios
      .post(`/api/getliveact/`, {
        act_id: params.id,
      })
      .then((res) => {
        setLiveActData(res.data.live_data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function actDetailFunction() {
    axios
      .post(`/api/actsDetail/`, {
        id: params.id,
      })
      .then((res) => {
        setPost(res.data.Act[0]);
        setOriginalActData(res.data.Act[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const treeFunction = () => {
    axios
      .post(`/api/treeview/`, {
        act_id: params.id,
      })
      .then((res) => {
        setTreeData(res.data.treeView);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="ActInner_main"
      style={{ marginLeft: marginDiv ? "155px" : "50px", transition: ".5s" }}
    >
      <Helmet>
        <title>বিস্তারিত ই-বুক</title>
      </Helmet>
      <div className="ActInner_top">
        <h3>
          <b>{post.title_of_act}</b>
        </h3>
        <div className="ActInner_top_inside">
          <Link
            to={"/ebook/pdf/view/" + params.id}
            target="_blank"
            style={{
              marginRight: "10px",
            }}
          >
            <img src="/pdf.png" alt="pdf download" width="32px" />
          </Link>

          {actFile && (
            <a
              href={
                actFile
                  ? axios.defaults.baseURL + "/uploads/" + actFile
                  : axios.defaults.baseURL + "/images/vumi_logo.png"
              }
              download
            >
              <img src="/download.png" alt="pdf download" width="32px" />
            </a>
          )}
          {post.multiple_reference_link && (
            <>
              <span
                className="pointer-event"
                style={{
                  cursor: "pointer",
                }}
                onClick={handleShow2}
              >
                <img src="/reference.png" alt="pdf download" width="32" />
              </span>

              <Modal
                size="xl"
                scrollable={true}
                animation={true}
                show={show2}
                onHide={handleClose2}
              >
                <Modal.Header closeButton>
                  <Modal.Title>রেফারেন্স</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ul>
                    {post.multiple_reference_link.map((eachLink, index) => (
                      <li key={index}>
                        <a href={eachLink} target="_blank">
                          {eachLink}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Modal.Body>
                <Modal.Footer>
                  <button
                    className="btn btn-lg btn-info"
                    onClick={handleClose2}
                  >
                    বন্ধ করুন
                  </button>
                </Modal.Footer>
              </Modal>
            </>
          )}

          <h5
            style={{
              justifyContent: "end",
              float: "right",
            }}
          >
            {convertToBengaliNumber(
              post.publication_date ? post.publication_date : ""
            )}
          </h5>
        </div>
        {liveActData && (
          <div className="ActInner_top_inside2">
            <div style={{ display: "flex" }}>
              <div
                className="main-act"
                style={{
                  height: "100%",
                  background: "#42adff",
                  padding: "0px 10px",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                  border: year ? "none" : "2px solid white",
                }}
                onClick={() => handleActData(oiginalActData)}
              >
                <b>মূল আইন</b>
                {/*                                <button className='btn btn-lg btn-info' onClick={generatePDF}>
                                    Generate PDF
                                </button>*/}
              </div>
              {/*  <b style={{color: 'white'}}>-></b>*/}
              &nbsp;&nbsp;
              {liveActData.map((eachLiveActData, index) => (
                <h5
                  key={index}
                  onClick={() =>
                    handleActData(
                      eachLiveActData.json_data__Act[0],
                      eachLiveActData.year,
                      eachLiveActData.mod_by_act_id__number
                    )
                  }
                  style={{ cursor: "pointer" }}
                >
                  {year === eachLiveActData.year &&
                  actnumber === eachLiveActData.mod_by_act_id__number ? (
                    <>
                      <h5 style={{ color: "#0C6395" }}>
                        {eachLiveActData.year} -{" "}
                        {eachLiveActData.mod_by_act_id__number} নং
                      </h5>
                      {/*{index !== liveActData.length - 1 && <span>-></span>}*/}
                    </>
                  ) : (
                    <span>
                      {eachLiveActData.year} -{" "}
                      {eachLiveActData.mod_by_act_id__number} নং
                      {index !== liveActData.length - 1 && <span></span>}
                    </span>
                  )}
                </h5>
              ))}
            </div>
            {treeData && (
              <>
                {Object.keys(treeData).length > 0 && (
                  /*                                    <button className='btn btn-lg btn-info float-end' onClick={scrollToSection}>ট্রি
                                                                            ভিউ</button>*/

                  <button
                    className="btn btn-lg btn-info float-end"
                    onClick={handleShow}
                  >
                    ট্রি ভিউ
                  </button>
                )}

                <Modal
                  size="xl"
                  scrollable={true}
                  animation={true}
                  show={show}
                  onHide={handleClose}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>ট্রি ভিউ</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {treeData && (
                      <>
                        {Object.keys(treeData).length > 0 && (
                          <div>
                            <img src="/images/tree.png" useMap="#image_map" />
                            <map name="image_map">
                              <area
                                alt="অর্পিত সম্পত্তি প্রত্যর্পণ আইন, ২০০১"
                                title="অর্পিত সম্পত্তি প্রত্যর্পণ আইন, ২০০১"
                                href="http://157.230.243.221/ebook/temp/view/79"
                                coords="293,236,507,312"
                                shape="rect"
                              ></area>
                              <area
                                alt="অর্পিত সম্পত্তি প্রত্যর্পণ আইন, ২০০২"
                                title="অর্পিত সম্পত্তি প্রত্যর্পণ আইন, ২০০২"
                                href="http://157.230.243.221/ebook/temp/view/80"
                                coords="288,348,398,403"
                                shape="rect"
                              ></area>
                              <area
                                alt="অর্পিত সম্পত্তি প্রত্যর্পণ (সংশোধন) আইন, ২০১১"
                                title="অর্পিত সম্পত্তি প্রত্যর্পণ (সংশোধন) আইন, ২০১১"
                                href="http://157.230.243.221/ebook/temp/view/81"
                                coords="287,440,400,499"
                                shape="rect"
                              ></area>
                              <area
                                alt="অর্পিত সম্পত্তি প্রত্যর্পণ (সংশোধন) আইন, ২০১২"
                                title="অর্পিত সম্পত্তি প্রত্যর্পণ (সংশোধন) আইন, ২০১২"
                                href="http://157.230.243.221/ebook/temp/view/83"
                                coords="287,532,403,595"
                                shape="rect"
                              ></area>
                              <area
                                alt="অর্পিত সম্পত্তি প্রত্যর্পণ (দ্বিতীয় সংশোধন) আইন, ২০১২"
                                title="অর্পিত সম্পত্তি প্রত্যর্পণ (দ্বিতীয় সংশোধন) আইন, ২০১২"
                                href="http://157.230.243.221/ebook/temp/view/85"
                                coords="287,627,402,686"
                                shape="rect"
                              ></area>
                              <area
                                alt="অর্পিত সম্পত্তি প্রত্যর্পণ (পঞ্চম সংশোধন) আইন, ২০১৩"
                                title="অর্পিত সম্পত্তি প্রত্যর্পণ (পঞ্চম সংশোধন) আইন, ২০১৩"
                                href="http://157.230.243.221/ebook/temp/view/88"
                                coords="289,719,399,781"
                                shape="rect"
                              ></area>
                              <area
                                alt="অর্পিত সম্পত্তি প্রত্যর্পণ (দ্বিতীয় সংশোধন) আইন, ২০১৩"
                                title="অর্পিত সম্পত্তি প্রত্যর্পণ (দ্বিতীয় সংশোধন) আইন, ২০১৩"
                                href="http://157.230.243.221/ebook/temp/view/87"
                                coords="286,810,400,875"
                                shape="rect"
                              ></area>
                              <area
                                alt=""
                                title=""
                                href=""
                                coords="426,812,1003,874"
                                shape="rect"
                              ></area>
                            </map>

                            {Object.keys(treeData).length > 0 && (
                              <>
                                <ul className="text-center">
                                  {treeData.map((tree, index) => (
                                    <div key={index}>
                                      {index === 0 ? null : (
                                        <p>
                                          <img
                                            src={
                                              axios.defaults.baseURL +
                                              "/tree.png"
                                            }
                                            alt="Tree"
                                          />
                                        </p>
                                      )}
                                      {tree.map((item, itemIndex) => (
                                        <small key={item.id} title={item.year}>
                                          <Link
                                            to={"/ebook/temp/view/" + item.id}
                                          >
                                            {" "}
                                            {item.law_name}{" "}
                                            {itemIndex === tree.length - 1
                                              ? ""
                                              : "+"}
                                          </Link>
                                        </small>
                                      ))}
                                    </div>
                                  ))}
                                </ul>
                              </>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    <button
                      className="btn btn-lg btn-info"
                      onClick={handleClose}
                    >
                      বন্ধ করুন
                    </button>
                  </Modal.Footer>
                </Modal>
              </>
            )}
            {/*                        {actFile && (
                            <div
                                style={{
                                    fontWeight: 'bold',
                                    marginLeft: 'auto',
                                    cursor: 'pointer',
                                }}
                            >
                                <a
                                    className='btn btn-lg btn-info'
                                    href={actFile ? axios.defaults.baseURL + "/uploads/" + actFile : axios.defaults.baseURL + "/images/vumi_logo.png"}
                                    download
                                >

                                    ডাউনলোড <img src={axios.defaults.baseURL + "/pdf.png"}/>
                                </a>
                            </div>
                        )}*/}
          </div>
        )}
      </div>
      <div className="ActInner_middle">
        <div
          dangerouslySetInnerHTML={{
            __html: `
        <style>
          .ActInner_middle a {
            color: blue !important;
            text-decoration: underline !important;
          }
        </style>
        ${post.proposal}
      `,
          }}
          style={{ fontWeight: "bold" }}
        />
        <br />
        <div
          dangerouslySetInnerHTML={{
            __html: `
        <style>
          .ActInner_middle a {
            color: blue !important;
            text-decoration: underline !important;
          }
        </style>
        ${post.objective}
      `,
          }}
        />
      </div>

      <div className="ActInner_middle_two">
        <h3>
          <b>সূচি</b>
        </h3>
      </div>
      <div className="ActInner_middle_three">
        <h3>
          <b>ধারাসমূহ</b>
        </h3>
      </div>
      <div className="ActInner_last">
        {post.section &&
          Object.values(post.section).map((eachSection, index) => (
            <>
              <div
                key={index}
                className="ActInner_last_each"
                style={
                  index % 2 === 0
                    ? {
                        background: "none",
                        cursor: "pointer",
                      }
                    : {
                        background: "#f9f9f9",
                        cursor: "pointer",
                      }
                }
              >
                <EachSectionSingle
                  key={index}
                  heading={eachSection.heading}
                  note={eachSection.note}
                  content={eachSection.content ? eachSection.content : ""}
                  number={eachSection.number}
                  live={eachSection.live}
                  repealed={eachSection.repealed_by || eachSection.repealed_to}
                  repealed_by={eachSection.repealed_by}
                  repealed_to={eachSection.repealed_to}
                  repealed_by_data={eachSection.repealed_by_data}
                  repealed_to_data={eachSection.repealed_to_data}
                  amendment_from={eachSection.amendment_from}
                  amendment_to={eachSection.amendment_to}
                  appendment_from={eachSection.appendment_from}
                  appendment_after={eachSection.appendment_after}
                  repealed_data={eachSection.repealed_data}
                  subSection={
                    eachSection.sub_section ? eachSection.sub_section : ""
                  }
                  amendment_from_data={
                    eachSection.amendment_from_data
                      ? eachSection.amendment_from_data
                      : ""
                  }
                  amendment_to_data={
                    eachSection.amendment_to_data
                      ? eachSection.amendment_to_data
                      : ""
                  }
                  appendment_from_data={
                    eachSection.appendment_from_data
                      ? eachSection.appendment_from_data
                      : ""
                  }
                  appendment_after_data={
                    eachSection.appendment_after_data
                      ? eachSection.appendment_after_data
                      : ""
                  }
                />
              </div>
            </>
          ))}
      </div>
      {post.schedules && (
        <>
          <div className="ActInner_middle_two">
            <h3>
              <b>তফসিল</b>
            </h3>
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.schedules }} />
        </>
      )}
      {/*            {treeData && (
                <div ref={targetRef}>
                    {Object.keys(treeData).length > 0 && (

                        <>
                            <div className='ActInner_middle_two'>
                                <h3><b>ট্রি ভিউ</b></h3>
                            </div>
                            <ul className='text-center'>
                                {treeData.map((tree, index) => (
                                    <div key={index}>
                                        {index === 0 ? null : (
                                            <h6>
                                                <img src={axios.defaults.baseURL + "/tree.png"} alt="Tree"/>
                                            </h6>
                                        )}
                                        {tree.map((item, itemIndex) => (
                                            <small key={item.id} title={item.year}><Link
                                                to={'/ebook/temp/view/' + item.id}> {item.law_name} {itemIndex === tree.length - 1 ? '' : '+'}
                                            </Link></small>
                                        ))}

                                    </div>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            )}*/}

      {isModalOpen && (
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              maxWidth: 400,
            }}
          >
            {/* Modal header */}
            <Typography variant="h5" mb={2}>
              অনুরোধ
              <IconButton
                onClick={() => setIsModalOpen(false)}
                sx={{ position: "absolute", top: 0, right: 0 }}
              >
                <CloseIcon />
              </IconButton>
            </Typography>
            <h1>test</h1>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default ActInnerView;
