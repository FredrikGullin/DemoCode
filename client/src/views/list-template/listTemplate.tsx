import React from "react";
import Container from "react-bootstrap/Container";
import "./listTemplate.css";

type ListTemplateProps = {
  children?: React.ReactNode;
};

const ListTemplate: React.FC<ListTemplateProps> = ({ children }) => {
  return (
    <Container fluid className="template-container">
      {children}
    </Container>
  );
};

export default ListTemplate;
