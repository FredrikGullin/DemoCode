import React from "react";
import { Form, Card, Button } from "react-bootstrap";
import "./settings.css";

const Settings: React.FC = () => {
  return (
    <>
      <div className="page-container">
        <div className="settings-container">
          <h1 className="settings-title">Settings</h1>

          <Card className="settings-card">
            <Card.Body>
              <Form.Label>Dark Mode</Form.Label>
              <Form.Check type="switch" id="dark-mode-switch" label="" />
            </Card.Body>
          </Card>

          <Card className="settings-card">
            <Card.Body>
              <Form.Label>Push Notifications</Form.Label>
              <Form.Check
                type="switch"
                id="push-notifications-switch"
                label=""
              />
            </Card.Body>
          </Card>

          <Card className="settings-card">
            <Card.Body>
              <Form.Label>Email Notifications</Form.Label>
              <Form.Check
                type="switch"
                id="email-notifications-switch"
                label=""
              />
            </Card.Body>
          </Card>

          <Card className="settings-card">
            <Card.Body>
              <div className="download-container">
                <div className="download-text">
                  <p>
                    You can download and install the application locally for a
                    faster and more integrated experience.
                  </p>
                </div>
                <div className="download-button-container">
                  <Button variant="primary">Download</Button>
                </div>
              </div>
            </Card.Body>
          </Card>
          {/* <div className="download-button-container">
            <Button variant="primary">Download</Button>
          </div> */}
          <Card className="settings-card clickable">
            <Card.Body>Version: 1.0.0</Card.Body>
          </Card>

          <Card className="settings-card clickable">
            <Card.Body>Integrity</Card.Body>
          </Card>

          <Card className="settings-card clickable">
            <Card.Body>License</Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Settings;
