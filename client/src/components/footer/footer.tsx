import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import "./footer.css";

function Footer() {
  return (
    <footer className="custom-footer">
      <div className="social-icons">
        <a href="#">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faYoutube} />
        </a>{" "}
      </div>

      <hr />
      <div className="footer-links">
        <a href="#">About</a>
        <span>|</span>
        <a href="#">Terms & Conditions</a>
        <span>|</span>
        <a href="#">Feedback</a>
      </div>
      <div className="standard-site">
        <p>© 2023 Appeggio. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
