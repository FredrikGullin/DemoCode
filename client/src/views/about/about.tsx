import React from "react";
import Container from "react-bootstrap/Container";
import "./about.css";

const About: React.FC = () => {
  return (
    <Container fluid className="about-container">
      <div className="about-background">
        <div className="text-section">
          <h2>About Us</h2>
          <p>
            Welcome to Appeggio, a harmonious platform dedicated to music
            enthusiasts and budding musicians.
            <br />
            <br />
            Whether you're picking up an instrument for the first time or
            looking to refine your skills, Appeggio is your go-to destination
            for online music lessons. At Appeggio, we believe in the universal
            language of music and its profound ability to connect souls.
            <br />
            <br />
            We've created a comprehensive collection of video lessons designed
            to help you master your chosen instrument at your own pace. From the
            elegant notes of a piano to the soulful strings of a guitar,
            discover lessons that resonate with your musical journey.
            <br />
            <br />
            A Note on Our Origins Appeggio isn't just a platform; it's a passion
            project. Developed as a school assignment by a second-year student
            of the Fullstack Web Development program at Chas Academy, this
            platform embodies dedication to both technology and music. Powered
            by advanced technologies like Node.js, Express, MongoDB, REDIS in
            the backend, and React in the frontend, Appeggio stands as a
            testament to what aspiring developers can achieve with the right
            tune of determination and skill.
            <br />
            <br />
            And while our platform may humbly originate from a classroom, our
            aspirations are limitless. We envision a world where anyone,
            anywhere, can have access to quality music education without
            breaking the bank. After all, Appeggio is about passion. So, pick up
            your instrument, tune in, and let's make music together!
          </p>
          {/* <h2>Disclaimer</h2>
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
          </p> */}
        </div>
      </div>
    </Container>
  );
};

export default About;
