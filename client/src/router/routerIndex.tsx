import { Routes, Route } from "react-router-dom";
import MainTemplate from "../views/main-template/mainTemplate";
import InfoTemplate from "../views/info-template/infoTemplate";
import Courses from "../components/courses/courses";
import About from "../components/about/about";
import Disclaimer from "../components/disclaimer/disclaimer";
import DashboardUser from "../components/dashboardUser/dashboardUser";
import Login from "../components/login/login";
import Register from "../components/register/register";
import HeroText from "../components/hero-text/heroText";
import Course from "../components/course/course";

const router = (
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
        <MainTemplate>
          <DashboardUser username={"John Doe"} />
        </MainTemplate>
      }
    />
  </Routes>
);

export default router;
