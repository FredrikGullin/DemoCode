import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AppNavbar from "./components/navbar/navbar";
import router from "./router/routerIndex";
import Footer from "./components/footer/footer";

function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <AppNavbar />
        {router}
        <Footer />
      </Router>
    </>
  );
}

export default App;
