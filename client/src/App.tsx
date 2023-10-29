import "./App.css";
import Footer from "./components/footer/footer";
import NavScroll from "./components/navbar/navbar";
import Home from "./views/home/home";
import Login from "./views/login/login";
import Register from "./views/register/register";

function App() {
  return (
    <>
      <NavScroll />
      <Home />
      <Footer />
    </>
  );
}

export default App;
