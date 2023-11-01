import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CourseInterface } from "../../interfaces/courseInterface";
import { fetchCourses } from "../../services/fetchCourses";
import "./courses.css";

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<CourseInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCoureses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (err) {
        setError("Faild to fetch courses!");
      } finally {
        setLoading(false);
      }
    };
    loadCoureses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="courses-hero-section-lg">
        <h1>Courses</h1>
        <h2>Discover Your Passion & Master Your Craft</h2>
        <p>
          Dive into our vast collection and choose from 10,000 curated courses
          tailored for every skill level. From novice to maestro, embark on your
          musical voyage today and unleash your inner musician.
        </p>
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
                      <p className="card-price">
                        Price: {course.course_price} USD
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Courses;
