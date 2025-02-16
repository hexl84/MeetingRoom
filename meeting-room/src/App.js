import logo from "./logo.svg";
import "./App.css";
import ResponsiveAppBar from "./AppBar";
import MainContent from "./MainContent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="App">
      <ResponsiveAppBar />
      <MainContent></MainContent>
    </div>
  );
}

export default App;
