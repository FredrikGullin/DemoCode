import React from "react";
import Container from "react-bootstrap/Container";
import "./mainTemplate.css";
import { useLocation } from "react-router-dom";

type MainTemplateProps = {
  children?: React.ReactNode;
};

const MainTemplate: React.FC<MainTemplateProps> = ({ children }) => {
  const location = useLocation();
  const heroPaths = ["/", "/register", "/login"];
  const isHero = heroPaths.includes(location.pathname);

  return (
    <Container
      fluid
      className={isHero ? "hero-template" : "template-container"}
    >
      {children}
    </Container>
  );
};

export default MainTemplate;
