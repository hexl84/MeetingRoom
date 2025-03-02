import "./App.css";
import ResponsiveAppBar from "./components/AppBar";
import RouteConfig from "./routes/Route";
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
      {loginUser && <ResponsiveAppBar loginUser={loginUser} />}
      <RouteConfig setLoginUser={setLoginUser} />
    </div>
  );
}

export default App;
