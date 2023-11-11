import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import adminFetchUser from "../../services/adminFetchUser";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { UserInterface } from "../../interfaces/userInterface";
import { useAuth } from "../../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./adminViewUser.css";

const AdminViewUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { accessToken, role } = useAuth();
  const [user, setUser] = useState<UserInterface | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      if (!accessToken || !id) {
        setError("Missing user ID or access token.");
        return;
      }

      if (role !== "admin") {
        toast.error("Unauthorized action!");
        console.error("Unauthorized action!");
        navigate("/");
        return;
      }

      try {
        const userData = await adminFetchUser(accessToken, id);
        setUser(userData);
      } catch (error) {
        setError("Error getting user data.");
        console.error("Component error:", error);
      }
    };

    getUser();
  }, [id, accessToken]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <>
      <div className="info-card-container">
        <div className="info-card" style={{ width: "100%", maxWidth: "480px" }}>
          <h3>User information</h3>
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
            <h6>Owned Courses</h6>
            <ul className="info-card-ul">
              {user.owned_courses.map((courseId) => (
                <li key={courseId}>{courseId}</li>
              ))}
            </ul>
            <p className="info-card-text">
              Member since:{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
            <div className="text-center">
              <Link to={`/admin/users/edit/${id}`}>
                <Button variant="primary">Edit user</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminViewUser;
