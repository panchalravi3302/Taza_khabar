import logo from "./logo.svg";
import "./App.css";
import Navbar from "./componets/navbar";
import News from "./componets/news";

function App() {
  return (
    <div className="App">
      <Navbar />
      <News category="sports"/>
    </div>
  );
}

export default App;
