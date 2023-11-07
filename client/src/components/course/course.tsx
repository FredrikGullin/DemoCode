import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import fetchCourse from "../../services/fetchCourse";
import { CourseInterface } from "../../interfaces/courseInterface";
import { Button } from "react-bootstrap";
import "./course.css";

const Course: React.FC<{ courseId: string }> = () => {
  const { owned_courses } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<CourseInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isLoggedIn = Boolean(sessionStorage.getItem("accessToken"));
  const isOwned = owned_courses?.includes(id!);

  useEffect(() => {
    const getCourse = async () => {
      try {
        const courseData = await fetchCourse(id!);
        setCourse(courseData);
      } catch (err) {
        setError("Failed to fetch course!");
      } finally {
        setLoading(false);
      }
    };
    getCourse();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="course-container">
      <div className="course-card">
        <div className="row no-gutters">
          <div className="col-md-8">
            <div className="card-body">
              <h1 className="course-title">{course?.course_name}</h1>
              <div className="course-img-sm">
                <img
                  src={course?.course_picture}
                  alt={course?.course_name}
                  className="card-img-sm"
                />
              </div>
              <h3 className="cousre-text">{course?.course_slogan}</h3>
              <div className="buy-section-sm">
                {!isOwned && (
                  <p className="course-price">
                    Price: {course?.course_price} USD{" "}
                    {isLoggedIn && (
                      <Button
                        as={Link as any}
                        to={`/courses/${id}/purchase`}
                        variant="success"
                        className="buy-button"
                      >
                        BUY
                      </Button>
                    )}
                  </p>
                )}
              </div>
              <p className="course-info">{course?.course_info}</p>
              <div className="buy-section">
                {!isOwned && (
                  <p className="course-price">
                    Price: {course?.course_price} USD{" "}
                    {isLoggedIn && (
                      <Button
                        as={Link as any}
                        to={`/courses/${id}/purchase`}
                        variant="success"
                        className="buy-button"
                      >
                        BUY
                      </Button>
                    )}
                  </p>
                )}
              </div>
              {isOwned && (
                <div className="lessons-link">
                  <Link to={`/my-courses/${course!._id}/lessons`}>
                    <Button>Go to lessons</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-4">
            <img
              src={course?.course_picture}
              alt={course?.course_name}
              className="card-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
