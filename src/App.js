import {Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home } from './pages/Home';
import { NavBar } from './components/nav-bar/NavBar';
import { Miner } from './pages/Miner';
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Admin } from "./pages/Admin";
import './App.css';

function App() {
  const global = useSelector(state => state)
  console.log(global)

  return (
    <div className="app">
      <NavBar/>
      <div className='app-container'>
        <Routes>
        <Route path="/" element={<Home/>}/>
          <Route path="/mining" element={<Miner/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/controller" element={<Admin/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
