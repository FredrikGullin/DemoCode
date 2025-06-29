import React, { useState, FormEvent } from "react";
import { Form, Button } from "react-bootstrap";
import "./feedback.css";

const FeedbackForm: React.FC = () => {
  const [feedback, setFeedback] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    alert(`Feedback submitted: ${feedback}`);
    setFeedback("");
  };

  return (
    <>
      <div className="feedback-container">
        <div className="feedback-form-container my-3 p-3 border rounded bg-light">
          <h5 className="text-center">Feedback</h5>
          <p>
            We welcome your feedback about the application and content. Your
            insights are valuable to us.
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="feedbackForm.TextArea">
              <Form.Label>Your Feedback</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Enter your feedback here..."
                required
              />
            </Form.Group>
            <div className="feedback-button d-flex">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default FeedbackForm;
