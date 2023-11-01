import React from "react";
import { Link } from "react-router-dom";
import { DashboardProps } from "../../interfaces/dashboardInterface";
import { DashboardOptionProps } from "../../interfaces/dashboardOptopionsInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGraduationCap,
  faBook,
  faCog,
  faDoorOpen,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./dashboardUser.css";

const DashboardOption: React.FC<DashboardOptionProps> = ({
  icon,
  label,
  as,
  to,
  className,
}) => {
  const Component = as || "div";

  return (
    <div className="col-lg-4 col-md-6 col-sm-6 col-6 mb-4">
      <div className="card h-100">
        <div className="card-body text-center">
          <Component className={`dashboard-option ${className}`} to={to}>
            <FontAwesomeIcon icon={icon} className="icon mb-3" size="3x" />
            <label className="card-text">{label}</label>
          </Component>
        </div>
      </div>
    </div>
  );
};

const DashboardUser: React.FC<DashboardProps> = ({ username }) => {
  return (
    <>
      <div className="welcome-message mb-5">
        <h1>Welcome, {username}!</h1>
      </div>
      <div className="dashboardUser-container row">
        <DashboardOption
          icon={faUser}
          label="Profile"
          as={Link}
          to="/"
          className="dashboard-link"
        />
        <DashboardOption
          icon={faGraduationCap}
          label="My Courses"
          as={Link}
          to="/courses"
          className="dashboard-link"
        />
        <DashboardOption
          icon={faBook}
          label="Courses"
          as={Link}
          to="/courses"
          className="dashboard-link"
        />
        <DashboardOption
          icon={faInfoCircle}
          label="About"
          as={Link}
          to="/about"
          className="dashboard-link"
        />
        <DashboardOption
          icon={faCog}
          label="Settings"
          as={Link}
          to="/"
          className="dashboard-link"
        />
        <DashboardOption
          icon={faDoorOpen}
          label="Logout"
          as={Link}
          to="/"
          className="dashboard-link"
        />
      </div>
    </>
  );
};

export default DashboardUser;
