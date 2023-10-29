import { Routes, Route } from "react-router-dom";
import Home from "../views/home/home";
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
  </Routes>
);

export default router;
