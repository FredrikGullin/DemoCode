import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import fetchLesson from "../../services/fetchLesson";
import { LessonInterface } from "../../interfaces/lessonInterface";
import "./lesson.css";

const Lesson: React.FC<{ courseId: string; lessonId: string }> = () => {
  const [lesson, setLesson] = useState<LessonInterface | null>(null);
  const { id } = useParams<{ id: string }>();
  const { _id } = useParams<{ _id: string }>();
  const { accessToken } = useAuth();

  useEffect(() => {
    if (!accessToken) {
      toast.error("Access token is undefined.");
      console.error("Missing access token.");
      return;
    }

    const getLesson = async () => {
      console.log("Access token frontend: ", accessToken);
      console.log("Course ID: ", id);
      console.log("Lesson ID: ", _id);
      try {
        const lessonData = await fetchLesson(accessToken, id!, _id!);
        setLesson(lessonData);
      } catch (error) {
        toast.error("Failed fetching lesson.");
        console.error("Component error: ", error);
      }
    };
    getLesson();
  }, [accessToken && id && _id]);

  if (!lesson) {
    return <div>Lesson not found.</div>;
  }

  let videoId = lesson.video_url.split("v=")[1];
  const ampersandPosition = videoId.indexOf("&");
  if (ampersandPosition !== -1) {
    videoId = videoId.substring(0, ampersandPosition);
  }

  return (
    <>
      <div className="lesson-container">
        <div className="lesson-card">
          <div className="row no-gutters">
            <div className="col-md-8">
              <div className="card-body">
                <h2 className="lesson-title">{lesson.lesson_title}</h2>
                <div className="lesson-video-wrapper">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="lesson-description">
                  <h5>Lesson description</h5>
                  <p className="lesson-text">{lesson.description}</p>
                </div>
              </div>
              <div className="lesson-back-button">
                <Link to={`/my-courses/${id}/lessons`}>
                  <button type="button" className="btn btn-primary">
                    Back to Lessons
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lesson;
