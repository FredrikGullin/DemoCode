import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "./heroText.css";
import { Link } from "react-router-dom";

const HeroText: React.FC = () => {
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
              as={Link as any}
              to="/register"
              variant="primary"
              className="button signUpButton"
            >
              Sign Up
            </Button>

            <Button
              as={Link as any}
              to="/login"
              variant="secondary"
              className="button"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
      <div className="hero-image"></div>
    </Container>
  );
};

export default HeroText;
