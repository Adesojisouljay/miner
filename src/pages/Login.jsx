import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loginUser } from '../api/auth';
import { loginStart, loginSuccess, loginFailure } from '../redux/userReducer';
import { Loader } from '../components/loader/Loader';
import cat from "../assets/document_shape.webp"
import eth from "../assets/eth-icon.webp"
import './login.css'; 

const Login = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const global = useSelector(state => state)

  useEffect(() => {
    if(global.apexMiner.user)
    navigate("/mining")
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        password,
        email
      };
      
      dispatch(loginStart());

      const response = await loginUser(userData);
      if (response && response?.data?.success) {

        dispatch(loginSuccess(response.data));
        console.log('User logged in:', response.data.user);

        navigate('/mining');
      } else {
        setError('Invalid email or password');
        dispatch(loginFailure('Invalid email or password'));
      }
    } catch (error) {
      console.error('Error logging in:', error);

      setError('An error occurred. Please try again later.');
      dispatch(loginFailure('An error occurred. Please try again later.'));
    }
  };

  return (
    <div className="login-wrap">
      <img className="img-1" src={eth} alt="" />
      <img className="img-2" src={cat} alt="" />
      <div className="login-wrap2">
        <div className="login-container">
         <h2>Login</h2>
         <form onSubmit={handleSubmit}>
        <div className="login-form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="login-form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button className="btn-login"  disabled={global.apexMiner?.isLoading} type="submit">Login</button>
      </form>
      <div className='reg-link'>
        <span>Dont't have an account? <Link className="reg-link-reg" to="/register">Register</Link></span>
      </div>
      {global.apexMiner.isLoading && 
      <Loader/>
      }
    </div>
      </div>
      
    </div>
    
  );
};

export default Login;
