import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLike } from "react-icons/ai";
import { TfiCommentAlt } from "react-icons/tfi";
import { RxLoop } from "react-icons/rx";
import { IoIosSend } from "react-icons/io";
import { AiTwotoneLike } from "react-icons/ai";
import {
  getAllComments,
  getPostAction,
  getPostWithIdAction,
  likeAction,
  sendCommentAsyncAction,
  unlikeAction,
} from "../redux/actions";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import "../styles/likeAndUnlike.css";
import { useNavigate } from "react-router-dom";

const LikeAndUnlike = (props) => {
  const dispatch = useDispatch();

  const isLike2 = props.singlePost.likes?.some(
    (like) => like._id === props.currentUser._id
  );
  useEffect(() => {
    dispatch(getPostWithIdAction(props.singlePost._id));
    dispatch(getPostAction());

    // eslint-disable-next-line
  }, []);
  const navigate = useNavigate();

  const [comment, setComment] = useState({
    user: "",
    comment: "",
    post: "",
    createdAt: new Date(),
  });
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [likesSection, setLikesSection] = useState(false);

  console.log(isLike2);
  const handleLikeToggle = () => {
    setLikesSection(!likesSection);
  };
  const handleCommentToggle = () => {
    setShowCommentSection(!showCommentSection);
  };

  return (
    <div className="card-footer p-0">
      <p className="likes-paragraph">
        <img
          className="like-comment"
          src="https://static.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt"
          alt="like"
          data-test-reactions-icon-type="LIKE"
          data-test-reactions-icon-theme="light"
        />
        <span onClick={handleLikeToggle}>
          {props.singlePost.likes && props.singlePost.likes.length} Likes
        </span>
      </p>
      <Row className="justify-content-center align-items-center">
        <Col className="text-center comment-box pt-2">
          {isLike2 ? (
            <button
              className="comment-box-btn ml-3"
              onClick={() => {
                dispatch(
                  unlikeAction(props.singlePost._id, props.currentUser._id)
                );
                dispatch(getPostAction());
              }}
            >
              <AiTwotoneLike className="comment-box-btn-icon  mr-1" />
              Dislike
            </button>
          ) : (
            <button
              className="comment-box-btn ml-3"
              onClick={() => {
                dispatch(
                  likeAction(props.singlePost._id, props.currentUser._id)
                );
                dispatch(getPostAction());
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
      <Modal
        show={likesSection}
        onHide={handleLikeToggle}
        animation={false}
        id="modal-post-news"
      >
        <Modal.Header closeButton>
          <Modal.Title>All the likes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column mx-2 my-2">
            <ul>
              <strong>
                {props.singlePost.likes &&
                  props.singlePost.likes.map((singleLike, index) => {
                    return (
                      <li key={index}>
                        {singleLike.name && singleLike.name}{" "}
                        {singleLike.surname && singleLike.surname}
                      </li>
                    );
                  })}
              </strong>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleLikeToggle}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
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
                      user: props.currentUser._id,
                      post: props.singlePost._id,
                    });
                  }}
                />
                <button
                  className="add-comment-button"
                  onClick={() => {
                    dispatch(sendCommentAsyncAction(comment));

                    setComment({ user: "", comment: "", post: "" });
                    navigate("/feed");

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
