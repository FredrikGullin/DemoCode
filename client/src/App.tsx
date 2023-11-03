import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./context/authContext";
import AppNavbar from "./components/navbar/navbar";
import RouterComponent from "./router/routerComponent";
import Footer from "./components/footer/footer";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Router>
          <ToastContainer />
          <AppNavbar />
          <RouterComponent />
          <Footer />
        </Router>
      </AuthContextProvider>
    </>
  );
}

export default App;
