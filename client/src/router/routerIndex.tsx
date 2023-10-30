import { Routes, Route } from "react-router-dom";
import Home from "../views/home/home";
import About from "../views/about/about";
import Disclaimer from "../views/disclaimer/disclaimer";
import Dashboard from "../views/dashboardTemplate/dashboardTemplate";
import DashboardUser from "../components/dashboardUser/dashboardUser";
import Login from "../components/login/login";
import Register from "../components/register/register";
import HeroText from "../components/hero-text/heroText";

const router = (
  <Routes>
    <Route
      path="/"
      element={
        <Home>
          <HeroText />
        </Home>
      }
    />
    <Route
      path="/login"
      element={
        <Home>
          <Login />
        </Home>
      }
    />
    <Route
      path="/register"
      element={
        <Home>
          <Register />
        </Home>
      }
    />
    <Route path="/about" element={<About />} />
    <Route path="/disclaimer" element={<Disclaimer />} />
    <Route
      path="/dashboard"
      element={
        <Dashboard>
          <DashboardUser username={"John Doe"} />
        </Dashboard>
      }
    />
  </Routes>
);

export default router;
