import React, { useState } from "react";
import { Button, Form, FormGroup, Container, Row, Col } from "react-bootstrap";
import "./register.css";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement register logic here
    console.log("Username:", username, "Email:", email, "Password:", password);
  };

  return (
    <div className="register-view">
      <Container className="register-container">
        <Row className="justify-content-md-center mt-1">
          <Col md={8}>
            <h2 className="text-center mb-4">Sign up</h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormGroup>
              <Button
                type="submit"
                variant="primary"
                className="register-button"
              >
                Sign up
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
