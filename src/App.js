import "./App.css";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import SearchData from "./Pages/SearchData/SearchData";
import Nav from './Componenets/Nav/Nav'

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/searchData" element={<SearchData />} />
      </Routes>
    </div>
  );
}

export default App;
