import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import "./footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="custom-footer">
      <div className="social-icons">
        <a href="https://www.facebook.com" target="_blank">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://www.x.com" target="_blank">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://www.instagram.com" target="_blank">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://www.youtube.com" target="_blank">
          <FontAwesomeIcon icon={faYoutube} />
        </a>{" "}
      </div>

      <hr />
      <div className="footer-links">
        <Link to="/about">About</Link>
        <span>|</span>
        <Link to="/disclaimer">Terms & Conditions</Link>
        <span>|</span>
        <Link to="#">Feedback</Link>
      </div>
      <div className="standard-site">
        <p>© 2023 Appeggio. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
