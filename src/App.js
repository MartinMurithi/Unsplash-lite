import "./App.css";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import SearchData from "./Pages/SearchData/SearchData";
import Nav from './Componenets/Nav/Nav'
import About from "./Pages/About";
import History from "./Pages/History";
import Contacts from "./Pages/Contacts";
import Help from "./Pages/Help";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/searchData" element={<SearchData />} />
        <Route path="/about" element={<About />} />
        <Route path="/history" element={<History />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/helpcenter" element={<Help />} />
      </Routes>
    </div>
  );
}

export default App;
