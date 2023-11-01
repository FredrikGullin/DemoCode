import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import searchService from "../../services/searchService";
import { CourseInterface } from "../../interfaces/courseInterface";
import { RouterStateInterface } from "../../interfaces/routerStateInterface";
import "./searchResult.css";

function SearchResult() {
  const [result, setResult] = useState<CourseInterface[]>([]);
  const location = useLocation();
  const searchQuery = (location.state as RouterStateInterface)?.searchQuery;

  useEffect(() => {
    const fetchResult = async () => {
      if (searchQuery) {
        const data = await searchService(searchQuery);
        setResult(data);
      }
    };
    fetchResult();
  }, [searchQuery]);

  if (!result) {
    return (
      <>
        <div className="not-found-container">
          <div className="search-hero-section-lg">
            <h1>Appeggio</h1>
            <h2>Search results</h2>
            <p>
              We have presented the courses that matched your search query in
              the list below.
            </p>
          </div>
          <div className="not-found-message">
            <h1>
              Sorry! We couldn't find any courses that match your search...
            </h1>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="result-container">
          <div className="search-hero-section-lg">
            <h1>Appeggio</h1>
            <h2>Search results</h2>
            <p>
              We have presented the courses that matched your search query in
              the list below.
            </p>
          </div>
          <div className="container mt-4">
            <div className="search-list-container">
              {result.map((course) => (
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
                          <h5 className="card-slogan">
                            {course.course_slogan}
                          </h5>
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
        </div>
      </>
    );
  }
}

export default SearchResult;
