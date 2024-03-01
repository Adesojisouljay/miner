import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:2000/api',
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    console.log(response)
    if (response.data.success) {
      console.log('User registered successfully');

    } else {
      console.error('Failed to register user:', response.data.message);

    }
    return response;
  } catch (error) {
    console.error('Error registering user:', error);
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post('/auth/login', userData);
    console.log(response)
    if (response.data.success) {
      console.log('User logged in successfully');

      localStorage.setItem('token', response.data.token);
      return response; 
    } else {
      console.error('Failed to login:', response.data.message);

      return null;
    }
  } catch (error) {
    console.error('Error logging in:', error);

    return null;
  }
};
