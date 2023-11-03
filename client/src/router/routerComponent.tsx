import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import { useAuth } from "../context/authContext";
import MainTemplate from "../views/main-template/mainTemplate";
import InfoTemplate from "../views/info-template/infoTemplate";
import HeroText from "../components/hero-text/heroText";
import Courses from "../components/courses/courses";
import Course from "../components/course/course";
import SearchResult from "../components/searchResult/searchResult";
import About from "../components/about/about";
import Disclaimer from "../components/disclaimer/disclaimer";
import Login from "../components/login/login";
import Register from "../components/register/register";
import DashboardUser from "../components/dashboardUser/dashboardUser";

const RouterComponent: React.FC = () => {
  const { username } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainTemplate>
            <HeroText />
          </MainTemplate>
        }
      />
      <Route path="/courses" element={<Courses></Courses>} />
      <Route path="/courses/:id" element={<Course courseId={""}></Course>} />
      <Route path="/search-results" element={<SearchResult></SearchResult>} />
      <Route
        path="/login"
        element={
          <MainTemplate>
            <Login />
          </MainTemplate>
        }
      />
      <Route
        path="/register"
        element={
          <MainTemplate>
            <Register />
          </MainTemplate>
        }
      />
      <Route
        path="/about"
        element={
          <InfoTemplate>
            <About />
          </InfoTemplate>
        }
      />
      <Route
        path="/disclaimer"
        element={
          <InfoTemplate>
            <Disclaimer />
          </InfoTemplate>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainTemplate>
              <DashboardUser username={username || "Guest"} />
            </MainTemplate>
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <InfoTemplate>
            <p>404: Page Not Found</p>
          </InfoTemplate>
        }
      />
    </Routes>
  );
};

export default RouterComponent;
