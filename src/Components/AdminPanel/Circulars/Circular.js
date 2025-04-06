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
import { BackwardFilled } from "@ant-design/icons";
import { BiLeftArrowAlt } from "react-icons/bi";
import DropdownList from "react-widgets/DropdownList";
import { toast } from "react-toastify";

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  // Converts the file to Base64 and resolves the URL
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve({ default: reader.result }); // Base64 image
          reader.onerror = (error) => reject(error);
        })
    );
  }

  abort() {
    console.log("Upload aborted");
  }
}

// Plugin to integrate the custom upload adapter
function CustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

const Circular = () => {
  const { token, marginDiv } = useAuth();
  const accessToken = localStorage.getItem("access");
  if (!accessToken) {
    window.location.href = "/login";
  }
  const navigate = useNavigate();

  const [publicationDate, setPublicationDate] = useState("");
  const [publicationChoice, setPublicationChoice] = useState("");
  const [actTitle, setActTitle] = useState("");
  const [objective, setObjective] = useState("");
  const [schedule, setSchedule] = useState("");
  const [file, setFile] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const [heading, setHeading] = useState("");
  const [branch, setBranch] = useState("");
  const [subBranch, setSubBranch] = useState("");
  const [actNumber, setActNumber] = useState("");
  const [signatures, setSignatures] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [copyTo, setCopyTo] = useState("");
  const [footer, setFooter] = useState("");
  const [meta_keywords, setMetaKeywords] = useState([]);
  const [motto, setMotto] = useState("");
  const [created_at_bn, setCreatedAtBn] = useState("");
  const [created_at_en, setCreatedAtEn] = useState("");
  const [signature_position, setSignaturePosition] = useState("");
  const [applicable_date_bn, setApplicableDateBn] = useState("");
  const [applicable_date_en, setApplicableDateEn] = useState("");

  const handlePublicationDate = (event) => {
    setPublicationDate(event.target.value);
  };
  const handleActTitle = (event) => {
    setActTitle(event.target.value);
  };

  const handleFooter = (event, editor) => {
    const data = editor.getData();
    setFooter(data);
  };
  /*    const headingChange = (event,editor) => {
        const data = editor.getData();
        setHeading(data);
    }*/
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
  const handleCreateAct = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("jwt", token ? token : localStorage.getItem("access"));
    formData.append("publication_date", publicationDate);
    formData.append("title_of_act", actTitle);
    formData.append("schedule", schedule);
    formData.append("publication_by", publicationChoice);
    formData.append("ebooks_type", "পরিপত্র");
    formData.append("act_number", actNumber);
    formData.append("heading", heading);
    formData.append("branch", branch);
    formData.append("sub_branch", subBranch);
    formData.append("signature_by", signatures);
    formData.append("created_by", createdBy);
    formData.append("copy_to", copyTo);
    formData.append("footer", footer);
    formData.append("meta_keywords", meta_keywords);
    formData.append("motto", motto);
    formData.append("created_at_bn", created_at_bn);
    formData.append("created_at_en", created_at_en);
    formData.append("signature_position", signature_position);
    formData.append("applicable_date_bn", applicable_date_bn);
    formData.append("applicable_date_en", applicable_date_en);
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
        setLoading(false);
        toast.success("পরিপত্র সফলভাবে তৈরি হয়েছে");
        navigate("/admin/circular/list");
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
    <div
      className="category_main_div"
      style={{ marginLeft: marginDiv ? "155px" : "50px" }}
    >
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <b> পরিপত্র যোগ করুন</b>
              <b className="float-end">
                <Link to="/admin/circular/list">
                  <button className="btn btn-lg btn-info">
                    <BiLeftArrowAlt
                      style={{ marginTop: "-3px", fontSize: "25px" }}
                    />
                    পরিপত্র সমূহ দেখুন
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
              <TextField
                fullWidth
                label="সূত্র"
                variant="outlined"
                className="text_field"
                value={motto}
                onChange={(event) => setMotto(event.target.value)}
                inputProps={{ style: { height: "15px" } }}
              />
              <div
                style={{
                  gap: "10px",
                }}
              >
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
                  {/* <CKEditor className='text_field'
                                                      editor={ClassicEditor}
                                                      data={objective}
                                                      onChange={handleSchedule}
                                                      config={{
                                                          placeholder: 'বিষয়বস্তু',
                                                          height: '2000'
                                                      }}
                                            /> */}
                  <CKEditor
                    className="text_field"
                    editor={ClassicEditor}
                    data={objective}
                    onChange={handleSchedule}
                    config={{
                      extraPlugins: [CustomUploadAdapterPlugin],
                      placeholder: "বিষয়বস্তু",
                      toolbar: [
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        "link",
                        "uploadImage",
                        "blockQuote",
                        "insertTable",
                        "undo",
                        "redo",
                      ],
                      image: {
                        toolbar: [
                          "imageStyle:full",
                          "imageStyle:side",
                          "|",
                          "toggleImageCaption",
                          "imageTextAlternative",
                        ],
                      },
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
                    onChange={(nextValue) => setPublicationChoice(nextValue.id)}
                    data={[
                      { id: "গেজেট", color: "গেজেট" },
                      { id: "নন-গেজেট", color: "নন-গেজেট" },
                    ]}
                  />
                </div>

                {/*                                        <div className='mt-2'>
                                            <CKEditor className='text_field'
                                                      editor={ClassicEditor}
                                                      data={heading}
                                                      onChange={headingChange}
                                                      config={{
                                                          placeholder: 'হেডিং',
                                                          height: '2000'
                                                      }}
                                            />
                                        </div>*/}
                <TextField
                  fullWidth
                  label="তৈরির তারিখ বাংলা"
                  variant="outlined"
                  className="text_field"
                  value={created_at_bn}
                  onChange={(event) => setCreatedAtBn(event.target.value)}
                  inputProps={{ style: { height: "15px" } }}
                />
                <TextField
                  fullWidth
                  label="তৈরির তারিখ ইংরেজি"
                  variant="outlined"
                  className="text_field"
                  value={created_at_en}
                  onChange={(event) => setCreatedAtEn(event.target.value)}
                  inputProps={{ style: { height: "15px" } }}
                />

                <TextField
                  fullWidth
                  label="প্রযোজ্য তারিখ বাংলা"
                  variant="outlined"
                  className="text_field"
                  value={applicable_date_bn}
                  onChange={(event) => setApplicableDateBn(event.target.value)}
                  inputProps={{ style: { height: "15px" } }}
                />
                <TextField
                  fullWidth
                  label="প্রযোজ্য তারিখ ইংরেজি"
                  variant="outlined"
                  className="text_field"
                  value={applicable_date_en}
                  onChange={(event) => setApplicableDateEn(event.target.value)}
                  inputProps={{ style: { height: "15px" } }}
                />

                <TextField
                  fullWidth
                  label="হেডিং"
                  variant="outlined"
                  className="text_field"
                  value={heading}
                  onChange={(event) => setHeading(event.target.value)}
                  inputProps={{ style: { height: "15px" } }}
                />

                <TextField
                  fullWidth
                  label="শাখা"
                  variant="outlined"
                  className="text_field"
                  value={branch}
                  onChange={(event) => setBranch(event.target.value)}
                  inputProps={{ style: { height: "15px" } }}
                />

                <TextField
                  fullWidth
                  label="উপ-শাখা"
                  variant="outlined"
                  className="text_field"
                  value={subBranch}
                  onChange={(event) => setSubBranch(event.target.value)}
                  inputProps={{ style: { height: "15px" } }}
                />
                <TextField
                  fullWidth
                  label="স্মারক নম্বর"
                  variant="outlined"
                  className="text_field"
                  value={actNumber}
                  onChange={(event) => setActNumber(event.target.value)}
                  inputProps={{ style: { height: "15px" } }}
                />
                <TextField
                  fullWidth
                  label="স্বাক্ষরকারীর নাম"
                  variant="outlined"
                  className="text_field"
                  value={signatures}
                  onChange={(event) => setSignatures(event.target.value)}
                  inputProps={{ style: { height: "15px" } }}
                />
                <TextField
                  fullWidth
                  label="স্বাক্ষরকারীর পদবি "
                  variant="outlined"
                  className="text_field"
                  value={signature_position}
                  onChange={(event) => setSignaturePosition(event.target.value)}
                  inputProps={{ style: { height: "15px" } }}
                />
                <TextField
                  fullWidth
                  label="তৈরীকারক"
                  variant="outlined"
                  className="text_field"
                  value={createdBy}
                  onChange={(event) => setCreatedBy(event.target.value)}
                  inputProps={{ style: { height: "15px" } }}
                />

                <TextField
                  fullWidth
                  label="অনুলিপি"
                  variant="outlined"
                  className="text_field"
                  value={copyTo}
                  onChange={(event) => setCopyTo(event.target.value)}
                  inputProps={{ style: { height: "15px" } }}
                />

                <div className="mt-2">
                  {/* <CKEditor className='text_field'
                                                      editor={ClassicEditor}
                                                      data={footer}
                                                      onChange={handleFooter}
                                                      config={{
                                                          placeholder: 'ফুটার',
                                                          height: '2000'
                                                      }}
                                            /> */}

                  <CKEditor
                    className="text_field"
                    editor={ClassicEditor}
                    data={footer}
                    onChange={handleFooter}
                    config={{
                      extraPlugins: [CustomUploadAdapterPlugin],
                      placeholder: "ফুটার",
                      toolbar: [
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        "link",
                        "uploadImage",
                        "blockQuote",
                        "insertTable",
                        "undo",
                        "redo",
                      ],
                      image: {
                        toolbar: [
                          "imageStyle:full",
                          "imageStyle:side",
                          "|",
                          "toggleImageCaption",
                          "imageTextAlternative",
                        ],
                      },
                    }}
                  />
                </div>

                <TextField
                  fullWidth
                  label="মেটা কীওয়ার্ডস"
                  variant="outlined"
                  className="text_field"
                  value={meta_keywords}
                  onChange={(event) => setMetaKeywords(event.target.value)}
                  inputProps={{ style: { height: "15px" } }}
                />
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
  );
};

export default Circular;
