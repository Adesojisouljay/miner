import { api } from './axiosInstance';

const authToken = localStorage.getItem('token');

export const submitKYC = async (kycData) => {
  try {
    const response = await api.post(
      '/kyc/submit',
      kycData,
      {
        headers: {
          Authorization: authToken,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.success) {
      console.log('KYC submitted successfully:', response.data.message);
      // Handle success (e.g., show a success message, redirect, etc.)
    } else {
      console.error('KYC submission failed:', response.data.message);
      // Handle failure (e.g., show an error message)
    }
  } catch (error) {
    console.error('Error submitting KYC:', error.message);
    // Handle error (e.g., show an error message)
  }
};
