import "./App.css";
import ResponsiveAppBar from "./AppBar";
import MainContent from "./MainContent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as React from "react";

function App() {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState(null);

  useEffect(() => {
    const currentLoginUser = localStorage.getItem("loginUser");
    if (currentLoginUser) {
      setLoginUser(currentLoginUser);
    } else {
      setLoginUser(currentLoginUser);
    }
  }, []);

  return (
    <div className="App">
      {loginUser && <ResponsiveAppBar />}
      <MainContent setLoginUser={setLoginUser} />
    </div>
  );
}

export default App;
