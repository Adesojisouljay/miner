import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loginUser } from '../api/auth';
import { loginStart, loginSuccess, loginFailure } from '../redux/userReducer';
import { isTokenValid } from '../utils';
import { Loader } from '../components/loader/Loader';
import cat from "../assets/document_shape.webp"
import eth from "../assets/eth-icon.webp"
import './login.css'; 

const Login = () => {
  const [password, setPassword] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const global = useSelector(state => state)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (isTokenValid(token) && global.ekzaUser.user) {
      navigate("/dashboard")
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const userData = {
        password,
        identifier
      };
      
      dispatch(loginStart());

      const response = await loginUser(userData);
      console.log(response)
      if (response && response?.data?.success) {
        dispatch(loginSuccess(response.data));

        window.location.href = '/dashboard';
        setLoading(false)

      } else {
        setError(response?.data?.error);
        dispatch(loginFailure('Invalid email or password'));
        setLoading(false)
      }
    } catch (error) {
      console.error('Error logging in:', error);

      setError(error || error.error);
      setLoading(false)
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
            type={"email" | "text"}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
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
        <button style={{cursor: loading && "not-allowed"}} className="btn-login" disabled={loading} type="submit">Login</button>
      </form>
      <div className='reg-link'>
        <span>Dont't have an account? <Link className="reg-link-reg" to="/register">Register</Link></span>
      </div>
      {loading && 
      <Loader/>
      }
    </div>
      </div>
      
    </div>
    
  );
};

export default Login;
