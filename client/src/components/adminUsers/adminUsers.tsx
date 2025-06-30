import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import adminFetchUsers from "../../services/adminFestchUsers";
import { UserInterface } from "../../interfaces/userInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import adminDeleteUser from "../../services/adminDeleteUser";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./adminUsers.css";

const AdminUserList: React.FC = () => {

  const { id: _id } = useParams<{ id: string }>();

  const [users, setUsers] = useState<UserInterface[] | null>([]);
  const [loading, setLoading] = useState(true);
  const { role, accessToken } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserInterface | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      toast.error("Access token is missing.");
      console.error("Access token is undefined.");
      setLoading(false);
      return;
    }

    if (role !== "admin") {
      toast.error("Unauthorized action!");
      console.error("Unauthorized action!");
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
        toast.error("Failed fetching users.");
        console.error("Component error: ", error);
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

  const promptDeleteUser = (user: UserInterface) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleDeleteUser = async (accessToken: string, userId: string) => {
    if (!userId) return;

    try {
      await adminDeleteUser(accessToken, userId);
      toast.success("User deleted successfully.");

      setUsers(
        (currentUsers) =>
          currentUsers?.filter((user) => user._id !== userId) ?? []
      );
      setShowDeleteModal(false);
    } catch (error) {
      toast.error("Unable to delete user.");
      console.error("Component error: ", error);
    }
  };

  const renderDeleteModal = () => (
    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm User Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {`Are you sure you want to delete the user "${userToDelete?.username}"? This action cannot be undone.`}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => handleDeleteUser(accessToken!, userToDelete!._id)}
        >
          Delete User
        </Button>
      </Modal.Footer>
    </Modal>
  );

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
                            Member since:{" "}
                            {user.createdAt
                              ? new Date(user.createdAt).toLocaleDateString()
                              : "N/A"}
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
                            onClick={() => promptDeleteUser(user)}
                          >
                            Delete
                          </button>
                          <Link
                            to={`/admin/users/${user._id}`}
                            className="admin-buttons"
                          >
                            <Button variant="primary">View</Button>
                          </Link>
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
      {renderDeleteModal()}
    </>
  );
};

export default AdminUserList;
