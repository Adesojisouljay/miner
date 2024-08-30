import { useEffect, useState } from "react";
import {Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Home } from './pages/Home';
import { NavBar } from './components/nav-bar/NavBar';
import { Miner } from './pages/Miner';
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Admin } from "./pages/Admin";
import './App.scss';
import Pagetest from "./pages/Pagetest";
import Aos from 'aos'
import "aos/dist/aos.css"
import Dashtest from "./pages/Dashboard";
import Spinner from "./pages/Spinner";
import { getUserProfile } from "./api/profile";
import { loginSuccess } from "./redux/userReducer";
import { useDispatch } from "react-redux";
import ProtectedRoute from "./protected-routes/ProtectedRoutes";
import { Kyc } from "./components/submit-kyc/Kyc";
import NotFound from "./components/not-found/NotFound";
import { KYCManagement } from "./components/manage-kyc/KycManagement";
import { MerchantAction } from "./components/merchant-action/Merchant";
import { CreateMerchantForm } from "./components/create-merchant/CreateMerchant";
import { BankAccount } from "./pages/BankAccount";
import { FiatWithdrawalAction } from "./components/fiat-withdrawal-action/FiatWithdrawalAction";
import { FiatDepositAction } from "./components/fiat-deposit-action/FiatDepositAction";
import { InvalidTokenModal } from "./components/modal/InvalidateTokenModal";
import { isTokenValid } from "./utils";

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { params } = useParams()

  const [tokenValid, setTokenValid] = useState(true);

  useEffect(() => {
    console.log(params)
    const token = localStorage.getItem('token');
    if (!isTokenValid(token)) {
      setTokenValid(false);
    }
  }, [tokenValid]);

  useEffect(() => {
    Aos.init({duration:1000});
  }, [])

  return (
    <div className="app">
      <NavBar/>
      <div className='app-container'>
      {!tokenValid && <InvalidTokenModal /> }
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashtest/>}/>
            {/* <Route path="/mining" element={<Miner/>}/> */}
            <Route path="/controller" element={<Admin/>}/>
            <Route path="/test" element={<Pagetest />} />
            <Route path="spinner" element={<Spinner />} />
            <Route path="/kyc" element={<Kyc />} />
            <Route path="/manage-kyc" element={<KYCManagement />} />
            <Route path="/merchant-action" element={<MerchantAction />} />
            <Route path="/create-merchant" element={<CreateMerchantForm />} />
            <Route path="/accounts" element={<BankAccount />} />
            <Route path="/fiat-withdrawal-action" element={<FiatWithdrawalAction />} />
            <Route path="/fiat-deposit-action" element={<FiatDepositAction />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;