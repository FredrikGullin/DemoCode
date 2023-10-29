import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "./home.css";

const Home: React.FC = () => {
  return (
    <Container fluid className="hero-container">
      <div className="hero-text">
        <div style={{ marginBottom: "2rem" }}>
          <h1>Welcome to Appeggio</h1>
          <p>
            Learn to play a musical instrument from the comfort of your home
          </p>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <div className="buttons-container">
            <Button
              variant="primary"
              className="button signUpButton"
              href="/signup"
            >
              Sign Up
            </Button>
            <Button variant="secondary" className="button" href="/login">
              Login
            </Button>
          </div>
        </div>
      </div>
      <div className="hero-image"></div>
    </Container>
  );
};

export default Home;
