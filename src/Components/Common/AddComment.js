import { useState } from "react";
import { Button } from "react-bootstrap";

function AddComment() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const onClickHandler = () => {
    setComments((comments) => [...comments, comment]);
  };
  const onChangeHandler = (e) => {
    setComment(e.target.value);
  };
  return (
    <div className="main-container">
      {comments.map((text) => (
        <div className="comment-container">{text}</div>
      ))}
      <div className="comment-flexbox">
        <h3 className="comment-text" style={{ fontSize: '16px'}}><b>কমেন্ট করুন</b></h3>
        <textarea
          value={comment}
          onChange={onChangeHandler}
          className="input-box"
          style={{width: '300px'}}
        />
        <Button onClick={onClickHandler} className="comment-button" style={{marginTop: '-20px', marginLeft: '10px'}}>
          সাবমিট
        </Button>
      </div>
    </div>
  );
}

export default AddComment;