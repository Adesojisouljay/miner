import {Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home } from './pages/Home';
import { NavBar } from './components/nav-bar/NavBar';
import { Miner } from './pages/Miner';
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Admin } from "./pages/Admin";
import './App.css';
import Pagetest from "./pages/Pagetest";
import Aos from 'aos'
import "aos/dist/aos.css"
import { useEffect } from "react";
import Dashtest from "./pages/Dashtest";
import Spinner from "./pages/Spinner";

function App() {
  // const global = useSelector(state => state)
  // console.log(global)
  useEffect(() => {
    Aos.init({duration:1000});
    
  }, [])

  return (
    <div className="app">
      <NavBar/>
      <div className='app-container'>
        <Routes>
        <Route path="/" element={<Home/>}/>
          <Route path="/mining" element={<Miner/>}/>
          <Route path="/dashboard" element={<Dashtest/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/controller" element={<Admin/>}/>
          <Route path="test" element={<Pagetest />} />
          <Route path="spinner" element={<Spinner />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
