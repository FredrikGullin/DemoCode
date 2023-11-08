import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import fetchUser from "../../services/fetchUser";
import { UserInterface } from "../../interfaces/userInterface";
import { useAuth } from "../../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./profile.css";

const Profile: React.FC<{ id: string }> = () => {
  const { id } = useParams<{ id: string }>();
  const { accessToken } = useAuth();
  const [user, setUser] = useState<UserInterface | null>(null);

  useEffect(() => {
    const getUser = async () => {
      if (!id) {
        console.log("No userId provided");
        return;
      }

      try {
        const userData = await fetchUser(accessToken!, id);
        setUser(userData);
      } catch (error) {
        console.error("Error getting user data:", error);
      }
    };

    getUser();
  }, [id, accessToken]);

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <>
      <div className="info-card-container">
        <div className="info-card" style={{ width: "100%", maxWidth: "480px" }}>
          <div
            className="info-card-img-top"
            style={{ backgroundColor: "#f8f9fa", padding: "20px" }}
          >
            <FontAwesomeIcon icon={faUser} size="5x" />{" "}
            {/* FontAwesome user icon */}
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
              <Link to={`/profile/edit/${id}`}>
                <button className="btn btn-primary info-card-button">
                  Edit Profile
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
