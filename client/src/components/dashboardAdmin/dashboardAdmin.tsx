import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import logoutUser from "../../services/logoutUser";
import { DashboardProps } from "../../interfaces/dashboardInterface";
import { DashboardOptionProps } from "../../interfaces/dashboardOptopionsInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faNewspaper,
  faChartBar,
  faCog,
  faDoorOpen,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import "./dashboardAdmin.css";

const DashboardOption: React.FC<DashboardOptionProps> = ({
  icon,
  label,
  as,
  to,
  className,
  onClick,
}) => {
  const Component = as || "div";

  return (
    <div className="col-lg-4 col-md-6 col-sm-6 col-6 mb-4">
      <div className="card h-100">
        <div className="card-body text-center">
          <Component
            className={`admin-dashboard-option ${className}`}
            to={to}
            onClick={onClick}
          >
            <FontAwesomeIcon icon={icon} className="icon mb-3" size="3x" />
            <label className="card-text">{label}</label>
          </Component>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC<DashboardProps> = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  const { role } = useAuth();

  const { logout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      toast.warning("Unauthorized action!");
      console.log(role);
      navigate("/");
    }
  }, [role, navigate]);

  const handleLogout = async () => {
    if (accessToken) {
      try {
        await logoutUser(accessToken);
        logout();
        navigate("/");
        toast.success("You've been logged out!");
      } catch (error) {
        toast.error("An error occured while loggin out!");
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="admin-dashboard-main">
        <div className="welcome-message mb-5">
          <h3>Logged in as Admin</h3>
        </div>
        <div className="admin-dashboard-container row">
          <DashboardOption
            icon={faUsers}
            label="Users"
            as={Link}
            to="/admin/users"
            className="admin-dashboard-link"
          />
          <DashboardOption
            icon={faBook}
            label="Courses"
            as={Link}
            to="/courses"
            className="dashboard-link"
          />
          <DashboardOption
            icon={faNewspaper}
            label="News"
            as={Link}
            to="/admin/dashboard"
            className="admin-dashboard-link"
          />
          <DashboardOption
            icon={faChartBar}
            label="Statistics"
            as={Link}
            to="/admin/dashboard"
            className="admin-dashboard-link"
          />
          <DashboardOption
            icon={faCog}
            label="Settings"
            as={Link}
            to="/admin/dashboard"
            className="admin-dashboard-link"
          />
          <DashboardOption
            icon={faDoorOpen}
            label="Logout"
            as={Link}
            to="/"
            className="admin-dashboard-link"
            onClick={handleLogout}
          />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
