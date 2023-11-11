import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./news.css";

interface NewsPost {
  title: string;
  content: string;
  createdAt: string;
  author: string;
}

const initialPost: NewsPost = {
  title: "Welcome to Appeggio!",
  content: `Welcome to Appeggio, a harmonious platform dedicated to music enthusiasts and aspiring musicians.

Whether you're a newcomer to music or an experienced player seeking to refine your skills, Appeggio is your ultimate online destination for music lessons. We cherish the universal language of music and its extraordinary power to unite hearts and minds.

Here, you will find a diverse collection of video lessons, each crafted to guide you through mastering your chosen instrument at your own pace. From the intricate melodies of a piano to the vibrant chords of a guitar, we offer lessons that will resonate with your musical spirit.

A Note on Our Beginnings: Appeggio is more than just a platform—it's a symphony of dreams, ambition, and technology. Conceived as a school project by a second-year Fullstack Web Development student at Chas Academy, Appeggio melds a love for music with cutting-edge web technologies. With a backend orchestrated with Node.js, Express, MongoDB, and REDIS, and a React-based frontend, our platform is a standing ovation to what developers can create with harmony in code and melody in heart.

Our journey may have started within the four walls of a classroom, but our dreams soar far beyond. We dream of a world where high-quality music education is accessible to all; a world where distance and resources are no longer barriers to the joy of music.

Appeggio is about igniting passions. So, we invite you to join us—grab your instrument, find your rhythm, and let's embark on this musical voyage together!`,
  createdAt: "November 8, 2023",
  author: "Appeggio Admin",
};

const NewsFeed: React.FC = () => {
  return (
    <div className="news-container">
      <Container>
        <Row>
          <Col>
            <h2 className="text-center my-4">News Feed</h2>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <div className="p-3 border rounded bg-white">
              <h3>{initialPost.title}</h3>
              <div
                className="news-post-text"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {initialPost.content}
              </div>
              <p className="text-muted">
                Posted by {initialPost.author} on {initialPost.createdAt}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NewsFeed;
