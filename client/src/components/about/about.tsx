import React from "react";
import Container from "react-bootstrap/Container";
import "./about.css";

const About: React.FC = () => {
  return (
    <Container fluid className="about-container">
      <div className="about-wrap">
        <div className="about-text-section">
          <h1>About Us</h1>
          <p>
            Welcome to Appeggio, a harmonious platform dedicated to music
            enthusiasts and aspiring musicians.
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
            anywhere, can have access to quality music education. After all,
            Appeggio is about passion. So, pick up your instrument, tune in, and
            let's make music together!
          </p>
        </div>
      </div>
    </Container>
  );
};

export default About;
