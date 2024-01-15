import "./App.css";
import Navbar from "./Components/Navbar";
import PropTypes from "prop-types";
import TextForm from "./Components/TextForm";
import { useState } from "react";
import Alert from "./Components/Alert";
import About from "./Components/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const ToggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#042743";
      showAlert("Dark mode has been enabled", "success");
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light mode has been enabled", "success");
    }
  };

  return (
    <>
     <BrowserRouter>
    <Navbar title="Texter"  mainpage="Home" About="About" mode = {mode} ToggleMode= {ToggleMode}/>
      <Alert alert={alert}/>
      <div className="container my-3">
      <Routes>
        <Route
          path= "/home"
          element={
            <TextForm
              showAlert={showAlert}
              heading="Enter the text to analyze below"
              mode={mode}
              ToggleMode={ToggleMode}
            />
          }
        />
        <Route
          path= "/"
          element={
            <TextForm
              showAlert={showAlert}
              heading="Enter the text to analyze below"
              mode={mode}
              ToggleMode={ToggleMode}
            />
          }
        />
        <Route path="/about" element={<About mode= {mode} />} />    
      </Routes>
      </div>
    </BrowserRouter>
    </>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  mainPage: PropTypes.string.isRequired,
  about: PropTypes.string
};

Navbar.defaultProps = {
  title: "Set title here",
  mainPage: "Home",
  about: "Set About here"
};

export default App;
