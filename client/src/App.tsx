import { RouterProvider } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/footer";
import NavScroll from "./components/navbar/navbar";
import router from "./router/routerIndex";

function App() {
  return (
    <>
      <Router>
        <NavScroll />
        {router}
        <Footer />
      </Router>
    </>
  );
}

export default App;
