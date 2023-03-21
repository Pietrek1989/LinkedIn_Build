import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLike } from "react-icons/ai";
import { TfiCommentAlt } from "react-icons/tfi";
import { RxLoop } from "react-icons/rx";
import { IoIosSend } from "react-icons/io";
import { AiTwotoneLike } from "react-icons/ai";
import {
  getAllComments,
  getPostAction,
  likeAction,
  sendCommentAsyncAction,
  unlikeAction,
} from "../redux/actions";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import "../styles/likeAndUnlike.css";

const LikeAndUnlike = (props) => {
  const like = useSelector((state) => state.like.like);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  useEffect(() => {
    console.log(props.singlePost._id);
    dispatch(getAllComments(props.singlePost._id));
  }, [props.singlePost]);
  const commentsOfSelectedPost = useSelector((state) => state.comment.content);

  const isLike = like.includes(props.singlePost._id);
  // const [showComment, setShowComment] = useState(false);
  // const handleCommentOpen = () => setShowComment(true);
  // const handleCommentClose = () => setShowComment(false);
  const [comment, setComment] = useState({
    user: "",
    comment: "",
    post: "",
  });
  const [showCommentSection, setShowCommentSection] = useState(false); // add state variable

  const handleCommentToggle = () => {
    setShowCommentSection(!showCommentSection); // toggle state variable on click
  };

  return (
    <div className="card-footer p-0">
      <Row className="justify-content-center align-items-center">
        <Col className="text-center comment-box pt-2">
          {isLike ? (
            <button
              className="comment-box-btn ml-3"
              onClick={() => {
                dispatch(
                  unlikeAction(props.singlePost._id, process.env.REACT_APP_USER)
                );
              }}
            >
              <AiTwotoneLike className="comment-box-btn-icon  mr-1" />
              Unlike
            </button>
          ) : (
            <button
              className="comment-box-btn ml-3"
              onClick={() => {
                dispatch(
                  likeAction(props.singlePost._id, process.env.REACT_APP_USER)
                );
              }}
            >
              <AiOutlineLike className="comment-box-btn-icon  mr-1" />
              Like
            </button>
          )}
        </Col>
        <Col className="text-center comment-box pt-2">
          <button className="comment-box-btn" onClick={handleCommentToggle}>
            <TfiCommentAlt className="comment-box-btn-icon  mr-1" /> Comments
          </button>
        </Col>
        <Col className="text-center comment-box pt-2">
          <button className="comment-box-btn">
            <RxLoop className="comment-box-btn-icon mr-1" />
            Send
          </button>
        </Col>
        <Col className="text-center comment-box pt-2">
          <button className="comment-box-btn mr-3">
            <IoIosSend className="comment-box-btn-icon  mr-1" /> Send
          </button>
        </Col>
      </Row>
      {/* <Modal
        show={showComment}
        onHide={handleCommentClose}
        animation={false}
        id="modal-post-news"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column mx-2 my-2">
            <div className="d-flex">
              <img
                src={props.singlePost && props.singlePost.user.image}
                alt="profile"
                className="profile-middle m-2"
              ></img>
              <div>
                <p>
                  <strong>
                    {props.singlePost && props.singlePost.user.name}{" "}
                    {props.singlePost && props.singlePost.user.surname}
                  </strong>
                </p>
              </div>
            </div>
            <div className="form-outline">
              <Form>
                <Form.Group className="form-outline">
                  <br></br>
                  <Form.Control
                    id="textAreaExample"
                    as="textarea"
                    rows={5}
                    value={comment.comment}
                    onChange={(e) => {
                      setComment({
                        ...comment,
                        comment: e.target.value,
                        user: props.singlePost.user._id,
                        post: props.singlePost._id,
                      });
                    }}
                  />

                  <label className="form-label" htmlFor="textAreaExample">
                    <p className="mb-5 pb-5">Write a Comment!</p>
                  </label>
                </Form.Group>
              </Form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCommentClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              dispatch(sendCommentAsyncAction(comment));
              dispatch(getAllComments(props.singlePost._id));
              handleCommentClose();
              navigate("/feed");
              setComment({ comment: "" });
              handleCommentOpen();
              dispatch(getPostAction());
              //   dispatch(getPostAction());
            }}
          >
            POST
          </Button>
        </Modal.Footer>
      </Modal> */}
      <div className={`comments-container ${showCommentSection ? "open" : ""}`}>
        {showCommentSection && (
          <div>
            <div className="add-comment-container pr-4 mb-5">
              <img src={props.currentUser.image} alt={props.currentUser.name} />
              <div className="add-comment-input-container">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={comment.comment}
                  onChange={(e) => {
                    setComment({
                      ...comment,
                      comment: e.target.value,
                      user: props.singlePost.user._id,
                      post: props.singlePost._id,
                    });
                  }}
                />
                <button
                  className="add-comment-button"
                  onClick={() => {
                    dispatch(sendCommentAsyncAction(comment));
                    dispatch(getAllComments(props.singlePost._id));
                    setComment({ comment: "" });
                    dispatch(getPostAction());
                    //   dispatch(getPostAction());
                  }}
                >
                  Post
                </button>
              </div>
            </div>
            {props.singlePost.comments &&
              props.singlePost.comments.map((singleComment, index) => {
                return (
                  <div key={index} className="comment-container ml-3">
                    <div className="d-flex">
                      <div className="comment-header">
                        <img
                          src={singleComment.user.image}
                          alt={singleComment.user.name}
                        />
                        <div>
                          <p className="comment-time">
                            {singleComment.createdAt &&
                              singleComment.createdAt.toDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="comment-body ml-2 pl-2">
                        <p className="comment-author mb-2">
                          <strong>
                            {singleComment.user.name}{" "}
                            {singleComment.user.surname}
                          </strong>
                        </p>
                        <p className="comment-text">{singleComment.comment}</p>
                      </div>
                    </div>
                    <div className="comment-footer">
                      <button className="comment-like-button mr-0 pr-0">
                        Like
                      </button>
                      <img
                        className="like-comment"
                        src="https://static.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt"
                        alt="like"
                        data-test-reactions-icon-type="LIKE"
                        data-test-reactions-icon-theme="light"
                      />
                      <button className="comment-reply-button">Reply</button>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LikeAndUnlike;
