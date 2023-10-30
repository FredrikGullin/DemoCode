import React from "react";
import Container from "react-bootstrap/Container";
import "./dashboardTemplate.css";

type DashboardProps = {
  children?: React.ReactNode;
};

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  return (
    <Container fluid className="dashboard-container">
      {children}
    </Container>
  );
};

export default Dashboard;
