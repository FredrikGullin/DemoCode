import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import adminFetchUsers from "../../services/adminFestchUsers";
import { UserInterface } from "../../interfaces/userInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./adminUsers.css";

const AdminUserList: React.FC = () => {
  const [users, setUsers] = useState<UserInterface[] | null>([]);
  const [loading, setLoading] = useState(true);
  const { role, accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      console.error("Access token is undefined.");
      toast.error("Access token is missing.");
      setLoading(false);
      return;
    }

    if (role !== "admin") {
      console.error("Unauthorized action!");
      toast.error("Unauthorized action!");
      navigate("/");
      return;
    }

    let isMounted = true;

    const loadUsers = async () => {
      try {
        const usersData = await adminFetchUsers(accessToken);
        if (isMounted) {
          setUsers(usersData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Faild fetching users.");
        toast.error("Failed fetching users.");
        setLoading(false);
      }
    };
    loadUsers();

    return () => {
      isMounted = false;
    };
  }, [accessToken]);

  if (!users) {
    return <div>Loading users...</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="admin-users-list-container">
        <div className="container mt-3">
          <h2>Users</h2>
          {users.map((user) => (
            <div className="row mb-3" key={user._id}>
              <div className="col-12">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="d-flex">
                      <div className="admin-user-icon d-flex flex-column align-items-center justify-content-center me-3">
                        <FontAwesomeIcon icon={faUser} size="4x" />
                        <h5 className="admin-user-title mt-2">
                          {user.username}
                        </h5>{" "}
                      </div>

                      <div>
                        <ul className="list-unstyled user-details mb-0">
                          <li>
                            <strong>User-ID:</strong> {user._id}
                          </li>
                          <li>
                            <strong>Role:</strong> {user.role}
                          </li>
                          <li>
                            <strong>Email:</strong> {user.email}
                          </li>
                        </ul>
                        <div className="mt-2">
                          <button
                            type="button"
                            className="admin-buttons btn btn-danger me-2"
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            className="admin-buttons btn btn-primary"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminUserList;
