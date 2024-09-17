import { api } from './axiosInstance';
import { updateUser } from "../redux/userReducer";

const authToken = localStorage.getItem('token');

export const getUserProfile = async (dispatch) => {
  try {
    const config = {
        headers: {
          Authorization: `${authToken}`,
        },
      };

    const response = await api.get('/auth/profile', config);
    console.log(response)
    if (response.data.success) {
      dispatch(updateUser({ user: response.data.user }));
      return response; 
    } else {
      console.error('Failed to fetch profile:', response.data.message);

      return null;
    }
  } catch (error) {
    console.error('Error fetching profile:', error);

    return null;
  }
};

export const getGeneralProfile = async (identifier) => {
  try {
    const response = await api.get(`/auth/receiver-profile/${identifier}`);
    
    if (response.data.success) {
      return response.data.user;
    } else {
      return null;
    }
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching receiver' };
  }
};
