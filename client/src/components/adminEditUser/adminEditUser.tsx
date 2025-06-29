import React, { FormEvent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form } from "react-bootstrap";
import { useAuth } from "../../context/authContext";
import adminFetchUser from "../../services/adminFetchUser";
import adminUpdateUser from "../../services/adminUpdateUser";
import { UserInterface } from "../../interfaces/userInterface";
import "./adminEditUser.css";

const AdminEditUser: React.FC = () => {
  const { accessToken, role } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserInterface | null>(null);
  const [updateUsername, setUpdateUsername] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [updateRole, setUpdateRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken || !id) {
      toast.error("Access token or user ID is missing.");
      return;
    }

    if (role !== "admin") {
      toast.error("Unauthorized action!");
      console.error("Unauthorized action!");
      navigate("/");
      return;
    }

    const getUserInfo = async () => {
      try {
        const fetchedUser = await adminFetchUser(accessToken, id);
        setUser(fetchedUser);
        setUpdateUsername(fetchedUser.username);
        setUpdateEmail(fetchedUser.email);
        setUpdateRole(fetchedUser.role);
      } catch (error) {
        toast.error("Failed fetching user information.");
        console.error("Component error: ", error);
      }
    };
    getUserInfo();
  }, [accessToken, id]);

  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userData = {
      username: updateUsername || user?.username,
      email: updateEmail || user?.email,
      password: updatePassword,
      role: updateRole || user?.role,
    };

    try {
      await adminUpdateUser(accessToken!, id!, userData);
      toast.success("User updated successfully.");
    } catch (error) {
      toast.error("Failed to update user.");
      console.error("Component error: ", error);
    }
  };

  return (
    <div className="update-form-container">
      <h1>Edit profile</h1>
      <Form onSubmit={handleUpdateUser} className="update-form">
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

        <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Select
            value={updateRole}
            onChange={(e) => setUpdateRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" className="update-button">
          Update User
        </Button>
      </Form>
    </div>
  );
};

export default AdminEditUser;
