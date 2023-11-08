import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import fetchUser from "../../services/fetchUser";
import deleteAccount from "../../services/deleteAccount";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { UserInterface } from "../../interfaces/userInterface";
import { useAuth } from "../../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./profile.css";

const Profile: React.FC<{ id: string }> = () => {
  const { id } = useParams<{ id: string }>();
  const { accessToken, logout } = useAuth();
  const [user, setUser] = useState<UserInterface | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [usernameForDelete, setUsernameForDelete] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      if (!id) {
        console.log("No userId provided");
        return;
      }
      console.log(accessToken);

      try {
        const userData = await fetchUser(accessToken!, id);
        setUser(userData);
      } catch (error) {
        console.error("Error getting user data:", error);
      }
    };

    getUser();
  }, [id, accessToken]);

  const handleDeleteAccount = async () => {
    if (usernameForDelete === user?.username) {
      try {
        const response = await deleteAccount(accessToken!, id!);
        toast.success("Account deleted successfully!");
        sessionStorage.removeItem("accessToken");
        logout();
        navigate("/");
        setShowModal(false);
        return response.data;
      } catch (error) {
        console.error("Error deleting account: ", error);
        toast.error("Failed to delete account. Please try again later.");
      }
    } else {
      toast.error("Username does not match. Please try again.");
    }
  };

  const handleDeleteButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <>
      <div className="info-card-container">
        <div className="info-card" style={{ width: "100%", maxWidth: "480px" }}>
          <h3>User profile</h3>
          <div
            className="info-card-img-top"
            style={{ backgroundColor: "#f8f9fa", padding: "20px" }}
          >
            <FontAwesomeIcon icon={faUser} size="5x" />{" "}
          </div>
          <div className="info-card-body">
            <h5 className="info-card-title">Username: {user.username}</h5>
            <h6 className="info-card-subtitle">Role: {user.role}</h6>
            <p className="info-card-text">Email: {user.email}</p>
            <p className="info-card-text">
              Member since:{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
            <div className="text-center">
              <Button variant="danger" onClick={handleDeleteButtonClick}>
                Delete Account
              </Button>
              <Link to={`/profile/edit/${id}`}>
                <Button variant="primary">Edit Profile</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please enter your username to confirm account deletion.</p>
          <input
            type="text"
            className="form-control"
            value={usernameForDelete}
            onChange={(e) => setUsernameForDelete(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="danger"
            className="me-2"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
