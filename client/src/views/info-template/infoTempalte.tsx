import React from "react";
import Container from "react-bootstrap/Container";
import "./infoTemplate.css";

type InfoTemplateProps = {
  children?: React.ReactNode;
};

const InfoTemplate: React.FC<InfoTemplateProps> = ({ children }) => {
  return (
    <Container fluid className="info-template-container">
      {children}
    </Container>
  );
};

export default InfoTemplate;
