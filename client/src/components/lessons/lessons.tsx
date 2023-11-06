import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { extractVidID } from "../../services/extractVidID";
import fetchLessons from "../../services/fetchLessons";
import { LessonInterface } from "../../interfaces/lessonInterface";
import "./lessons.css";

const CourseLessons: React.FC<{ courseId: string }> = () => {
  const [lessons, setLessons] = useState<LessonInterface | null>(null);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    if (!accessToken) {
      console.error("Access token is undefined!");
      setError("Authentication details are missing!");
      setLoading(false);
      return;
    }

    let isMounted = true;

    const loadLessons = async () => {
      try {
        const lessonsData = await fetchLessons(accessToken, id!);
        if (isMounted) {
          setLessons(lessonsData);
        }
      } catch (error) {
        if (isMounted) {
          setError("Failed fetching lessons!");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    loadLessons();

    return () => {
      isMounted = false;
    };
  }, [accessToken && id]);

  if (!lessons) {
    return <div>Loading course...</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!lessons) {
    return <div>There are no lessons for this course!</div>;
  }

  return (
    <>
      <div className="lessons-container">
        <div className="lessons-hero-section-lg">
          <h1>Lessons</h1>
        </div>
        <div className="container mt-4">
          <div className="list-container">
            {lessons.map((lesson: LessonInterface) => (
              <Link
                to={`/my-courses/${id}/lessons/${lesson._id}`}
                className="text-decoration-none"
                key={lesson._id}
              >
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="lesson-pic-SM col-md-4">
                      <img
                        src={`https://img.youtube.com/vi/${extractVidID(
                          lesson.video_url
                        )}/0.jpg`}
                        className="img-fluid rounded-end"
                        alt={`Thumbnail for ${lesson.lesson_title}`}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="lesson-card-body">
                        <h2 className="card-title">{lesson.lesson_title}</h2>
                        <h5 className="card-text">{lesson.description}</h5>
                      </div>
                    </div>
                    <div className="lesson-pic-container-LG col-md-4">
                      <img
                        src={`https://img.youtube.com/vi/${extractVidID(
                          lesson.video_url
                        )}/0.jpg`}
                        className="lesson-pic-LG img-fluid rounded-end"
                        alt={`Thumbnail for ${lesson.lesson_title}`}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseLessons;
