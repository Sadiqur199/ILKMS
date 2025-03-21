import React from "react";
import useAuth from "../../../hooks/authHooks";
import axios from "../../axios/axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "react-bootstrap";
import "./CreateAct.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DropdownList from "react-widgets/DropdownList";
import { BackwardFilled } from "@ant-design/icons";
import { BiLeftArrowAlt } from "react-icons/bi";
/*import YearDropdown from "../../Common/YearDropdown";*/
/*import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";*/

const Rule = () => {
  const { token } = useAuth();
  const accessToken = localStorage.getItem("access");
  if (!accessToken) {
    window.location.href = "/login";
  }
  const navigate = useNavigate();

  const [publicationDate, setPublicationDate] = useState("");
  /* const [publicationYear, setPublicationYear] = useState("")*/
  const [publicationChoice, setPublicationChoice] = useState("");
  const [actNumber, setActNumber] = useState("");
  const [actTitle, setActTitle] = useState("");
  const [proposal, setProposal] = useState("");
  const [objective, setObjective] = useState("");
  const [schedule, setSchedule] = useState("");
  const [file, setFile] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  /*    const [keywords, setKeywords] = useState("")*/
  /*    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const handleYearChange = (year) => {
        setSelectedYear(year);
        setPublicationYear(year);
    };*/

  /*    const handlePublicationYear = (event) => {
        setPublicationYear(event.target.value);
    };*/

  const handlePublicationDate = (event) => {
    setPublicationDate(event.target.value);
  };

  const handleActNumber = (event) => {
    setActNumber(event.target.value);
  };

  const handleActTitle = (event) => {
    setActTitle(event.target.value);
  };

  /*    const handleProposal = (event) => {
            /!* alert(data)*!/
            setProposal(event.target.value);
        };*/
  const getDataFromEditor = (event, editor) => {
    const data = editor.getData();
    setProposal(data);
  };
  const handleObjective = (event, editor) => {
    //  setObjective(event.target.value);
    const data = editor.getData();
    setObjective(data);
  };
  const handleSchedule = (event, editor) => {
    const data = editor.getData();
    setSchedule(data);
  };

  const handleFile = (event) => {
    setFile(event.target.files[0]);
  };

  const handleCoverPhoto = (event) => {
    setCoverPhoto(event.target.files[0]);
  };

  /*    const handleKeywords = (event) => {
            setKeywords(event.target.value);
        };*/

  const handleCreateAct = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("jwt", token);
    formData.append("publication_date", publicationDate);
    /*   formData.append('publication_year', publicationYear);*/
    formData.append("act_number", actNumber);
    formData.append("title_of_act", actTitle);
    formData.append("proposal", proposal);
    formData.append("objective", objective);
    formData.append("publication_by", publicationChoice);
    formData.append("schedule", schedule);
    formData.append("ebooks_type", "বিধিমালা");
    if (coverPhoto) {
      formData.append("cover_photo", coverPhoto, coverPhoto.name);
    } else {
      formData.append("cover_photo", coverPhoto);
    }
    if (file) {
      formData.append("file", file, file.name);
    } else {
      formData.append("file", file);
    }
    axios
      .post("/api/act/create/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((result) => {
        navigate("/admin/rule/list");
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          alert(error.response.data.detail);
        } else if (error.request) {
          alert(error.request);
        } else {
          alert("Error", error.detail);
        }
      });
  };
  return (
    <div className="Main">
      <div className="Inner">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <b> বিধিমালা যোগ করুন</b>
                  <b className="float-end">
                    <Link to="/admin/rule/list">
                      <button className="btn btn-lg btn-info">
                        <BiLeftArrowAlt
                          style={{ marginTop: "-3px", fontSize: "25px" }}
                        />
                        বিধিমালা সমূহ দেখুন
                        <BackwardFilled
                          style={{ marginTop: "-3px", fontSize: "25px" }}
                        />
                      </button>
                    </Link>
                  </b>
                </div>
                <div className="card-body">
                  <TextField
                    required={true}
                    fullWidth
                    label="শিরোনাম"
                    variant="outlined"
                    className="text_field"
                    value={actTitle}
                    onChange={handleActTitle}
                    inputProps={{ style: { height: "15px" } }}
                  />
                  <div
                    style={{
                      gap: "10px",
                    }}
                  >
                    {/*                                        <TextField required={true} fullWidth label="বছর" variant="outlined"
                                                   className='text_field'
                                                   value={publicationYear} onChange={handlePublicationYear}
                                                   inputProps={{style: {height: '15px'}}}/>*/}
                    {/* <YearDropdown selectedYear={selectedYear} onYearChange={handleYearChange} />*/}
                    <TextField
                      fullWidth
                      label="নম্বর"
                      variant="outlined"
                      className="text_field"
                      value={actNumber}
                      onChange={handleActNumber}
                      inputProps={{ style: { height: "15px" } }}
                    />
                    {/*                                        <TextField required={true} fullWidth label="প্রকাশনার তারিখ" variant="outlined"
                                                   className='text_field'
                                                   value={publicationDate} onChange={handlePublicationDate}
                                                   inputProps={{style: {height: '15px'}}}/>*/}
                    <label>প্রকাশনার তারিখ</label>
                    <input
                      type="date"
                      className="w-100"
                      value={publicationDate}
                      onChange={handlePublicationDate}
                    />
                  </div>
                  <br />
                  <div
                    style={{
                      display: "flex",
                      gap: "15px",
                      flexDirection: "column",
                    }}
                  >
                    <div>
                      <CKEditor
                        className="text_field"
                        editor={ClassicEditor}
                        data={proposal}
                        onChange={getDataFromEditor}
                        config={{
                          placeholder: "প্রস্তাব",
                        }}
                      />
                    </div>
                    <div>
                      <CKEditor
                        className="text_field"
                        editor={ClassicEditor}
                        data={objective}
                        onChange={handleObjective}
                        config={{
                          placeholder: "উদ্দেশ্য",
                        }}
                      />
                    </div>
                    <div>
                      <CKEditor
                        className="text_field"
                        editor={ClassicEditor}
                        data={schedule}
                        onChange={handleSchedule}
                        config={{
                          placeholder: "তফসিল",
                          height: "2000",
                        }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div>
                      <p>কভার ফটো যোগ করুন</p>
                      <input
                        accept="image/*"
                        id="image-upload"
                        type="file"
                        onChange={handleCoverPhoto}
                      />
                    </div>
                    <div>
                      <p>আইন পিডিএফ যোগ করুন</p>
                      <input
                        accept="application/pdf,application/vnd.ms-excel"
                        id="image-upload"
                        type="file"
                        onChange={handleFile}
                      />
                    </div>
                    <div>
                      <label>প্রকাশনা </label>
                      <DropdownList
                        dataKey="id"
                        textField="color"
                        value={publicationChoice}
                        placeholder={"প্রকাশনা নির্বাচন করুন"}
                        onChange={(nextValue) =>
                          setPublicationChoice(nextValue.id)
                        }
                        data={[
                          { id: "গেজেট", color: "গেজেট" },
                          { id: "নন-গেজেট", color: "নন-গেজেট" },
                        ]}
                      />
                    </div>
                  </div>
                </div>
                {loading ? (
                  <div className="card-footer">
                    <Button
                      variant="contained"
                      className="float-end text-danger font-weight-bold"
                      disabled={true}
                    >
                      {" "}
                      <b>সাবমিট হচ্ছে...</b>{" "}
                    </Button>
                    <div
                      className="spinner-border text-primary float-end"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div
                      className="spinner-border text-secondary float-end"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div
                      className="spinner-border text-success float-end"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div
                      className="spinner-border text-danger float-end"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div
                      className="spinner-border text-warning float-end"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div
                      className="spinner-border text-info float-end"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div
                      className="spinner-border text-light float-end"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div className="card-footer">
                    <Button
                      variant="contained"
                      className="text_field_sign"
                      onClick={handleCreateAct}
                    >
                      সাবমিট
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rule;
