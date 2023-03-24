import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Image,
  Row,
  Col,
  Modal,
  Alert,
  Dropdown,
} from "react-bootstrap";
import { AiFillCamera } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { RiGalleryFill } from "react-icons/ri";
import { ImBin } from "react-icons/im";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import {
  friendUnfriend,
  getAllFriends,
  getAllRequests,
  getCvAction,
  putUserProfileApi,
} from "../redux/actions";
import "../styles/profileDiv.css";
import { getUserProfileApi } from "../redux/actions";
import { FiSend } from "react-icons/fi";
import { BsUpload } from "react-icons/bs";
import { Link } from "react-router-dom";

const ProfileAvatar = () => {
  const userProfileAPIRS = useSelector((state) => state.userDataAPI.stock);
  const friends = useSelector((state) => state.AllFriends.allFr);

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  // const [showPic, setShowPic] = useState(false);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if (!userProfileAPIRS) {
      dispatch(getUserProfileApi());

      setChanged(false);
    } else {
      setChanged(true);
    }
  }, []);
  window.onload = () => {
    dispatch(getUserProfileApi());
  };

  const handleClosePen = () => setShow(false);
  const handleShowPen = () => setShow(true);

  const [showPic, setShowPic] = useState(false);
  const handleClosePic = () => setShowPic(false);
  const handleShowPic = () => setShowPic(true);

  const [successful, setSuccessful] = useState(false);
  const handleCloseSuccessful = () => setSuccessful(false);
  const handleShowSuccessful = () => setSuccessful(true);

  const combinedFunction = () => {
    dispatch(putUserProfileApi());
    handleClosePen();
  };

  //Image Upload
  const [file, setFile] = useState();

  function handleFile(event) {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  }

  const inputRef = useRef(null);

  const handleClick = () => {
    // 👇️ open file input box on click of other element
    inputRef.current.click();
  };

  function handleUpload() {
    const baseURL = `${process.env.REACT_APP_URL}/users/${userProfileAPIRS._id}/image`;
    const formData = new FormData();
    formData.append("image", file);
    fetch(baseURL, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("You've uploaded your profile pic!", result);
        setChanged(true);
      })
      .catch((error) => {
        console.error("Problem uploading the image :(", error);
        setChanged(true);
      });
  }

  const showPopup = () => {
    let popup = document.querySelector("#popup");
    if (popup.style.display === "none") {
      popup.style.display = "block";
    } else {
      popup.style.display = "none";
    }
  };

  useEffect(() => {
    dispatch(getAllRequests(userProfileAPIRS._id));
  }, [userProfileAPIRS._id]);
  useEffect(() => {
    dispatch(getAllFriends(userProfileAPIRS._id));
    console.log(userProfileAPIRS._id);
  }, [userProfileAPIRS._id]);

  const friendAndGet = async (id, sid) => {
    try {
      await dispatch(friendUnfriend(id, sid));
      dispatch(getAllFriends(userProfileAPIRS._id));
      dispatch(getAllRequests(userProfileAPIRS._id));
    } catch (err) {
      console.log(err);
    }

    console.log(friends);
  };

  // const declineAndGet = async (id, sid) => {
  //   try {
  //     await dispatch(decline(id, sid));
  //     dispatch(getAllFriends(userProfileAPIRS._id));
  //     dispatch(getAllRequests(userProfileAPIRS._id));
  //   } catch (err) {
  //     console.log(err);
  //   }

  //   console.log(friends);
  // };

  // const sendAndGet = async (id, sid) => {
  //   try {
  //     await dispatch(sendUnsend(id, sid));
  //     dispatch(getAllFriends(userProfileAPIRS._id));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <Row
      className="d-flex flex-column edit-section bg-white mr-2 mb-2"
      id="round-corners"
    >
      <Col className="avatar-wrapper-profile px-0">
        <Row>
          <Image
            onClick={handleShowPic}
            className="img avatar-bg-banner"
            src="https://www.gordonkamitomo.com/wp-content/uploads/2017/09/LinkedIn-Banner-High-River.jpg"
          />
        </Row>
        <Image
          onClick={handleShowPic}
          className="img profile-pic"
          id="profile-picture"
          src={userProfileAPIRS && userProfileAPIRS.image}
          roundedCircle
        />
        <Row
          className="d-flex justify-content-end px-5 mt-3"
          id="profile-photo-attach"
        >
          <Col xs={1} md={1} lg={1} className="ml-auto">
            <Button
              variant="light"
              className="edit-btn ml-auto"
              onClick={handleShowPen}
            >
              <FiEdit2 />
            </Button>
          </Col>
        </Row>

        <Modal show={show} onHide={handleClosePen}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Info</Modal.Title>
          </Modal.Header>

          <InputGroup size="sm" className="mb-3 px-5 pt-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Name</InputGroup.Text>
            <Form.Control
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              id="change-name"
              placeholder={userProfileAPIRS && userProfileAPIRS.name}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3 px-5">
            <InputGroup.Text id="inputGroup-sizing-sm">Surname</InputGroup.Text>
            <Form.Control
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              id="change-surname"
              placeholder={userProfileAPIRS && userProfileAPIRS.surname}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3 px-5">
            <InputGroup.Text id="inputGroup-sizing-sm">Email</InputGroup.Text>
            <Form.Control
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              id="change-email"
              placeholder={userProfileAPIRS && userProfileAPIRS.email}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3 px-5">
            <InputGroup.Text id="inputGroup-sizing-sm">Title</InputGroup.Text>
            <Form.Control
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              id="change-title"
              placeholder={userProfileAPIRS && userProfileAPIRS.title}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3 px-5">
            <InputGroup.Text id="inputGroup-sizing-sm">
              Location
            </InputGroup.Text>
            <Form.Control
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              id="change-area"
              placeholder={userProfileAPIRS && userProfileAPIRS.area}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3 px-5">
            <InputGroup.Text id="inputGroup-sizing-sm">
              Username
            </InputGroup.Text>
            <Form.Control
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              id="change-username"
              placeholder={userProfileAPIRS && userProfileAPIRS.username}
            />
          </InputGroup>

          <InputGroup size="sm" className="mb-3 px-5">
            <InputGroup.Text>About</InputGroup.Text>
            <Form.Control
              as="textarea"
              aria-label="With textarea"
              id="change-bio"
              placeholder={userProfileAPIRS && userProfileAPIRS.bio}
            />
          </InputGroup>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClosePen}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                combinedFunction();
                handleShowSuccessful();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Successful Modal */}
        <Modal show={successful} onHide={handleCloseSuccessful}>
          <Alert variant="success" className="text-center">
            Successfully Updated !!
          </Alert>
        </Modal>

        {/* Pic Modal */}
        <Modal
          show={showPic}
          onHide={handleClosePic}
          animation={false}
          className="modal-profile"
        >
          <Modal.Header closeButton className="modal-wrapper">
            <Modal.Title className="text-white">Profile photo</Modal.Title>
          </Modal.Header>
          <div className="d-flex justify-content-center modal-wrapper pb-3">
            <Image
              className="img-fluid model-profile-pic"
              id="profile-picture"
              src={userProfileAPIRS && userProfileAPIRS.image}
              roundedCircle
            />
          </div>
          <div className="modal-wrapper"></div>

          <Modal.Body className="modal-wrapper m-0">
            <Row className="justify-content-between">
              <Row>
                <Col className="m-3">
                  {/* <AiFillCamera className="text-light" /><p className="text-light">Add photo</p> */}
                  <form className="d-flex justify-content-around align-items-center">
                    <input
                      style={{ display: "none" }}
                      ref={inputRef}
                      type="file"
                      name="file"
                      onChange={handleFile}
                    />
                    <Button
                      id="profile-pic-update-buttons"
                      className="p-2"
                      onClick={handleClick}
                    >
                      <BsUpload></BsUpload>
                      <p className="text-light mb-0">UPLOAD</p>
                    </Button>
                    <Button
                      id="profile-pic-update-buttons"
                      className="p-2"
                      onClick={() => {
                        handleUpload();
                        handleShowSuccessful();
                      }}
                    >
                      <FiSend className="text-light"></FiSend>
                      <p className="text-light mb-0">SUBMIT</p>
                    </Button>
                  </form>
                </Col>
              </Row>
            </Row>
          </Modal.Body>
        </Modal>

        <Row className="details-box justify-content-between">
          <Col xs={4} md={6} lg={8} className="px-4">
            <h4 className="mt-4">
              {userProfileAPIRS && userProfileAPIRS.name}{" "}
              {userProfileAPIRS && userProfileAPIRS.surname}
            </h4>
            <h6>{userProfileAPIRS && userProfileAPIRS.title}</h6>
            <p className="mb-0">{userProfileAPIRS && userProfileAPIRS.area} </p>
            <p className="mb-0">
              Contact Info: {userProfileAPIRS && userProfileAPIRS.email}
            </p>
            <Dropdown className="dropdowns">
              <Dropdown.Toggle id="dropdown-toggle-connections">
                Connections
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {friends &&
                  friends.map((fr) => {
                    return (
                      <Dropdown.Item>
                        <small>
                          {fr.name} {fr.surname}
                        </small>
                        <img
                          style={{ height: "30px", borderRadius: "50%" }}
                          src={fr.image}
                          alt=""
                        />
                        <Button
                          onClick={() =>
                            friendAndGet(userProfileAPIRS._id, fr._id)
                          }
                          variant="outline-danger"
                          className="d-flex justify-content-center align-items-center text-truncate px-3 mb-2"
                          id="profile-buttons"
                        >
                          Unfriend
                        </Button>
                      </Dropdown.Item>
                    );
                  })}

                {/* <Dropdown.Item>action</Dropdown.Item> */}
                <Dropdown.Item>
                  {" "}
                  <p>Total:{friends.length} Friends</p>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col xs={4} md={6} lg={4} className="mt-4 ">
            <div className="d-flex justify-content-center align-items-center">
              <img
                src="https://ecologiahoy.net/wp-content/uploads/2014/12/nasa-logo2.jpg"
                alt=""
                id="profile-company-logo"
              />
              <p className="mb-0 ml-2">NASA</p>
            </div>
          </Col>
        </Row>
        <Col
          xs={6}
          md={6}
          lg={6}
          className="d-flex justify-content-start d-none d-sm-flex mb-4"
        >
          <Col className="px-2">
            <Button
              variant="primary"
              className="d-flex justify-content-center align-items-center px-4"
              id="profile-buttons"
            >
              Open to
            </Button>
          </Col>
          <Col className="px-1">
            <Button
              variant="outline-primary"
              className="d-flex justify-content-center align-items-center text-truncate px-3"
              id="profile-buttons"
            >
              Add profile section
            </Button>
          </Col>
          <Col className="px-1">
            <Button
              variant="outline-secondary"
              className="d-flex justify-content-center align-items-center px-3"
              id="profile-buttons"
              onClick={showPopup}
            >
              More
            </Button>
          </Col>
          <Col>
            <div id="popup" style={{ display: "none" }}>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-supported-dps="24x24"
                  fill="currentColor"
                  className="mercado-match mr-1"
                  width="24"
                  height="24"
                  focusable="false"
                >
                  <path d="M23 12l-4.61 7H16l4-6H8a3.92 3.92 0 00-4 3.84V17a4 4 0 00.19 1.24L5.12 21H3l-.73-2.22A6.4 6.4 0 012 16.94 6 6 0 018 11h12l-4-6h2.39z"></path>
                </svg>
                Send profile in a message
              </p>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-supported-dps="24x24"
                  fill="currentColor"
                  className="mercado-match"
                  width="24"
                  height="24"
                  focusable="false"
                >
                  <path d="M21 14v5a3 3 0 01-3 3H6a3 3 0 01-3-3v-5h2v5a1 1 0 001 1h12a1 1 0 001-1v-5zm-4-.57V11l-4 2.85V3h-2v10.85L7 11v2.43L12 17z"></path>
                </svg>
                <Link
                  to={`http://localhost:3001/api/pdf/${userProfileAPIRS._id}`}
                  className="link-to-pdf"
                >
                  {" "}
                  Download PDF
                </Link>
              </p>
              <p>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-supported-dps="24x24"
                  fill="currentColor"
                  className="mercado-match"
                  width="24"
                  height="24"
                  focusable="false"
                >
                  <path d="M18 3H6a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3V6a3 3 0 00-3-3zm-4 15h-1a3 3 0 01-3-3 3.22 3.22 0 01.1-.75L11.2 10h2.07L12 14.75A1 1 0 0013 16h1zm-1-9.75A1.25 1.25 0 1114.25 7 1.25 1.25 0 0113 8.25z"></path>
                </svg>
                About this Profile
              </p>
            </div>
          </Col>
        </Col>
      </Col>
    </Row>
  );
};

export default ProfileAvatar;
