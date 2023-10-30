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
    <Component className={`dashboard-option ${className}`} to={to}>
      <FontAwesomeIcon icon={icon} className="icon" />
      <label>{label}</label>
    </Component>
  );
};

const DashboardUser: React.FC<DashboardProps> = ({ username }) => {
  return (
    <>
      <div className="welcome-message">
        <h1>Welcome, {username}!</h1>
      </div>
      <div className="dashboardUser-container">
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
          to="/"
          className="dashboard-link"
        />
        <DashboardOption
          icon={faBook}
          label="Courses"
          as={Link}
          to="/"
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
