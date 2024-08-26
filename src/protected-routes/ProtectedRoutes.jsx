import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

//Needs proper checking

const ProtectedRoute = ({ path, element }) => {
  const isAuthenticated = useSelector(state => state.ekzaUser.isAuthenticated);
  // const isAuthenticated = false;

  // return (
  //   <Route
  //     path={path}
  //     element={isAuthenticated ? element : <Navigate to="/login" replace />}
  //   />
  // );
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
};

export default ProtectedRoute;


// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// //Needs proper checking

// const ProtectedRoute = ({ path, element }) => {
//   const isAuthenticated = useSelector(state => state.ekzaUser.isAuthenticated);
//   // const isAuthenticated = false;

//   // return (
//   //   <Route
//   //     path={path}
//   //     element={isAuthenticated ? element : <Navigate to="/login" replace />}
//   //   />
//   // );
//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
// };

// export default ProtectedRoute;




// import {Route, Routes, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Home } from './pages/Home';
// import { NavBar } from './components/nav-bar/NavBar';
// import { Miner } from './pages/Miner';
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import { Admin } from "./pages/Admin";
// import './App.scss';
// import Pagetest from "./pages/Pagetest";
// import Aos from 'aos'
// import "aos/dist/aos.css"
// import { useEffect } from "react";
// import Dashtest from "./pages/Dashboard";
// import Spinner from "./pages/Spinner";
// import { getUserProfile } from "./api/profile";
// import { loginSuccess } from "./redux/userReducer";
// import { useDispatch } from "react-redux";
// import ProtectedRoute from "./protected-routes/ProtectedRoutes";

// function App() {
//   const dispatch = useDispatch()
//   const navigate = useNavigate();

//   useEffect(() => {
//     Aos.init({duration:1000});
//   }, [])

//   useEffect(() => {
//     //should work on a more effectife way to do this, but we can keep this as a temporal solution
//     getProfile()
//   }, [dispatch])

//   const getProfile = async () => {
//     try {
//       const data = await getUserProfile()
//       console.log(data)
//       dispatch(loginSuccess(data.data))
//       navigate('/dashboard'); 
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <div className="app">
//       <NavBar/>
//       <div className='app-container'>
//         <Routes>
//           <Route path="/" element={<Home/>}/>
//           <Route path="/login" element={<Login/>}/>
//           <Route path="/register" element={<Register/>}/>
//           <Route element={<ProtectedRoute />}>
//             <Route path="/dashboard" element={<Dashtest/>}/>
//             <Route path="/mining" element={<Miner/>}/>
//             <Route path="/controller" element={<Admin/>}/>
//             <Route path="/test" element={<Pagetest />} />
//             <Route path="spinner" element={<Spinner />} />
//           </Route>
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default App;
