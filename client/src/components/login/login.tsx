import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/authContext";
import loginUser from "../../services/loginUser";
import { Button, Form, FormGroup, Container, Row, Col } from "react-bootstrap";
import "./login.css";

const Login: React.FC = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const { setAuthData } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await loginUser({
        email: inputEmail,
        password: inputPassword,
      });
      console.log("Received:", response);

      const { accessToken, userId, username, email, role, owned_courses } =
        response;
      setAuthData({
        accessToken,
        userId,
        username,
        email,
        role,
        owned_courses,
      });

      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-view">
      <Container className="login-container">
        <Row className="justify-content-md-center mt-1">
          <Col md={8}>
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email..."
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password..."
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  required
                />
              </FormGroup>
              <Button type="submit" variant="primary" className="login-button">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
