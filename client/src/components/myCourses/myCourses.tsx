import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/authContext";
import { CourseInterface } from "../../interfaces/courseInterface";
import fetchOwnedCourses from "../../services/fetchUserCourses";
import "./myCourses.css";

const MyCourses: React.FC = () => {
  const [courses, setCourses] = useState<CourseInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { accessToken } = useAuth();
  const { userId } = useAuth();

  useEffect(() => {
    const loadCoureses = async () => {
      if (!accessToken || !userId) {
        console.error("Access token or user ID is undefined.");
        setError("Authentication details are missing.");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchOwnedCourses(accessToken, userId);
        setCourses(data);
      } catch (err) {
        if (courses.length === 0) {
          toast.info("You don't own any courses yet.");
          return (
            <>
              <div style={{ minHeight: "calc(100vh - 233px)" }}></div>
            </>
          );
        } else {
          setError("Failed fetching courses.");
        }
      } finally {
        setLoading(false);
      }
    };
    loadCoureses();
  }, [accessToken, userId]);

  if (!courses) {
    return <div>You don't own any courses yet.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="my-courses-container">
        <div className="my-courses-hero-section-lg">
          <h1>My Courses</h1>
        </div>
        <div className="container mt-4">
          <div className="list-container">
            {courses.map((course) => (
              <Link
                to={`/courses/${course._id}`}
                className="text-decoration-none"
                key={course._id}
              >
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={course.course_picture}
                        alt={course.course_name}
                        className="img-fluid rounded-start course-image"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h2 className="card-title">{course.course_name}</h2>
                        <h5 className="card-slogan">{course.course_slogan}</h5>
                        <div className="card-info">
                          <p>{course.course_info}</p>
                        </div>
                      </div>
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

export default MyCourses;
