import React from "react";
import useAuth from "../../../hooks/authHooks";
import axios from "../../axios/axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { BackwardFilled } from "@ant-design/icons";
import { BiLeftArrowAlt } from "react-icons/bi";
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

const BlogCreate = () => {
  const { token } = useAuth();
  const accessToken = localStorage.getItem("access");
  if (!accessToken) {
    window.location.href = "/login";
  }
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuthor = (event) => {
    setAuthor(event.target.value);
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleContent = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const handleCoverPhoto = (event) => {
    setCoverPhoto(event.target.files[0]);
  };

  const handleCreateAct = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("jwt", token);
    formData.append("title_name", title);
    formData.append("author", author);
    formData.append("content", content);
    if (coverPhoto) {
      formData.append("cover", coverPhoto, coverPhoto.name);
    } else {
      formData.append("cover", coverPhoto);
    }
    axios
      .post("/api/blogs/create/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((result) => {
        toast.success("ব্লগ যোগ করা হয়েছে");
        setLoading(false);
        navigate("/admin/blogs");
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
                  <b>ব্লগ যোগ করুন</b>
                  <b className="float-end">
                    <Link to="/admin/blogs">
                      <button className="btn btn-lg btn-info">
                        <BiLeftArrowAlt
                          style={{ marginTop: "-3px", fontSize: "25px" }}
                        />
                        ব্লগ সমূহ দেখুন
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
                    value={title}
                    onChange={handleTitle}
                    inputProps={{ style: { height: "15px" } }}
                  />
                  <div
                    style={{
                      gap: "10px",
                    }}
                  ></div>

                  <TextField
                    required={true}
                    fullWidth
                    label="লেখক"
                    variant="outlined"
                    className="text_field"
                    value={author}
                    onChange={handleAuthor}
                    inputProps={{ style: { height: "15px" } }}
                  />

                  <div
                    style={{
                      gap: "10px",
                    }}
                  ></div>
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
                                                      data={content}
                                                      onChange={handleContent}
                                                      config={{
                                                          placeholder: 'বিষয়বস্তু',
                                                          height: '2000'
                                                      }}
                                            /> */}

                      <CKEditor
                        className="text_field"
                        editor={ClassicEditor}
                        data={content}
                        onChange={handleContent}
                        config={{
                          extraPlugins: [CustomUploadAdapterPlugin], // Add the custom plugin
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

export default BlogCreate;
