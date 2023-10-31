import React from "react";
import Container from "react-bootstrap/Container";
import "./mainTemplate.css";

type MainTemplateProps = {
  children?: React.ReactNode;
};

const MainTemplate: React.FC<MainTemplateProps> = ({ children }) => {
  return (
    <Container fluid className="template-container">
      {children}
    </Container>
  );
};

export default MainTemplate;
