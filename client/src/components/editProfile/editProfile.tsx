import React, { FormEvent, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form } from "react-bootstrap";
import { useAuth } from "../../context/authContext";
import editUser from "../../services/editUser";
import "./editProfile.css";

const EditProfile: React.FC = () => {
  const { accessToken, username, email, setAuthData } = useAuth();
  const { id } = useParams();
  const [updateUsername, setUpdateUsername] = useState(username || "");
  const [updateEmail, setUpdateEmail] = useState(email || "");
  const [updatePassword, setUpdatePassword] = useState("");
  const navigate = useNavigate();

  const handleUpdateProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!accessToken) {
      toast.error("Authentication token is missing.");
      return;
    }

    if (!id) {
      toast.error("No user ID provided.");
      return;
    }

    const userData = {
      username: updateUsername,
      email: updateEmail,
      ...(updatePassword && { password: updatePassword }),
    };

    try {

      // @ts-ignore
      const updatedUser = await editUser(
        accessToken,
        id,
        setAuthData,
        userData
      );

      await editUser(accessToken, id, setAuthData, userData);

      toast.success("Profile updated successfully.");
      navigate(`/profile/${id}`);
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error("Component error: ", error);
    }
  };

  return (
    <>
      <div className="update-form-container">
        <h1>Edit profile</h1>
        <Form onSubmit={handleUpdateProfile} className="update-form">
          <Form.Group className="update-mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={updateUsername}
              onChange={(e) => setUpdateUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="update-mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={updateEmail}
              onChange={(e) => setUpdateEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="update-mb-3" controlId="formNewPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="New Password"
              value={updatePassword}
              onChange={(e) => setUpdatePassword(e.target.value)}
            />
            <Form.Text className="update-text-muted">
              Leave this blank if you do not want to change your password.
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit" className="update-button">
            Update Profile
          </Button>
        </Form>
      </div>
    </>
  );
};

export default EditProfile;
