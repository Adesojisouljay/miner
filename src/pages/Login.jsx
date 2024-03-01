import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loginUser } from '../api/auth';
import { loginStart, loginSuccess, loginFailure } from '../redux/userReducer';
import { Loader } from '../components/loader/Loader';
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
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
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
        <button type="submit">Login</button>
      </form>
      {global.apexMiner.isLoading && 
      <Loader/>
      }
    </div>
  );
};

export default Login;
