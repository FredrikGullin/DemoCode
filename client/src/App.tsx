import "./App.css";
import Footer from "./components/footer/footer";
import NavScroll from "./components/navbar/navbar";
import Home from "./views/home/home";

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
