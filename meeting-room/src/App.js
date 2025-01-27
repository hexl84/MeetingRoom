import logo from './logo.svg';
import './App.css';
import ResponsiveAppBar from './AppBar';
import MainContent from './MainContent';
function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <MainContent></MainContent>     
    </div>
  );
}

export default App;
