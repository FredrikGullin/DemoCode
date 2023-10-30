import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppNavbar from "./components/navbar/navbar";
import router from "./router/routerIndex";
import Footer from "./components/footer/footer";

function App() {
  return (
    <>
      <Router>
        <AppNavbar />
        {router}
        <Footer />
      </Router>
    </>
  );
}

export default App;
