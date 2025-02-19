import logo from "./logo.svg";
import "./App.css";
import ResponsiveAppBar from "./AppBar";
import MainContent from "./MainContent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [hasLogin, setHasLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loginUser = localStorage.getItem("loginUser");
    if (loginUser) {
      setHasLogin(true);
    } else {
      setHasLogin(false);
    }
  }, []);

  return (
    <div className="App">
      {/* {hasLogin && } */}
      <ResponsiveAppBar />
      <MainContent></MainContent>
    </div>
  );
}

export default App;
