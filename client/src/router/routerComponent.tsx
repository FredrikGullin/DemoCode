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
import CheckoutPurchase from "../components/checkoutPurchase/checkoutPurchase";
import MyCourses from "../components/myCourses/myCourses";
import CourseLessons from "../components/lessons/lessons";
import Lesson from "../components/lesson/lesson";
import Profile from "../components/profile/profile";
import EditProfile from "../components/editProfile/editProfile";

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
        path="/profile/:id"
        element={
          <ProtectedRoute>
            <Profile id={""} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/edit/:id"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/courses/:id/purchase"
        element={
          <ProtectedRoute>
            <CheckoutPurchase />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-courses"
        element={
          <ProtectedRoute>
            <MyCourses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-courses/:id/lessons"
        element={
          <ProtectedRoute>
            <CourseLessons courseId={""} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-courses/:id/lessons/:_id"
        element={
          <ProtectedRoute>
            <Lesson courseId={""} lessonId={""} />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <InfoTemplate>
            <h2>404: Page Not Found</h2>
          </InfoTemplate>
        }
      />
    </Routes>
  );
};

export default RouterComponent;
