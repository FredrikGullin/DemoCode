import React from "react";
import Container from "react-bootstrap/Container";
import "./home.css";

type HomeProps = {
  children?: React.ReactNode;
};

const Home: React.FC<HomeProps> = ({ children }) => {
  return (
    <Container fluid className="home-container">
      {children}
    </Container>
  );
};

export default Home;
