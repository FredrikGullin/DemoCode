import React from "react";
import Container from "react-bootstrap/Container";
import "./disclaimer.css";
import disclaimerImage from "../../assets/disclaimer-img.jpg";

const Disclaimer: React.FC = () => {
  return (
    <Container fluid className="disclaimer-container">
      <div className="disclaimer-wrap">
        <div className="disclaimer-text-section">
          <h2>Disclaimer</h2>
          <p>
            This application is provided strictly for non-commercial use. Any
            other use, including but not limited to the resale, redistribution,
            or commercial exploitation of the application or its content, is
            expressly prohibited.
            <br />
            <br /> While we strive to ensure the accuracy and reliability of the
            application, we make no representations, warranties, or guarantees
            regarding its suitability, reliability, availability, or accuracy.
            <br />
            <br />
            Users agree to use the application at their own risk. The creator(s)
            and developer(s) of this application shall not be held liable for
            any direct, indirect, incidental, consequential, or punitive
            damages, or any other damages whatsoever, including, but not limited
            to, damages for loss of profits, goodwill, data, or other intangible
            losses, resulting from the use or inability to use the application.
            <br />
            <br />
            By using this application, users acknowledge and agree to this
            disclaimer in its entirety.
          </p>
        </div>
        <div className="disclaimer-image-wrap">
          <img
            src={disclaimerImage}
            alt="A girl sitting with a trompet"
            className="disclaimer-image"
          />
        </div>
      </div>
    </Container>
  );
};

export default Disclaimer;
