import { api } from "./axiosInstance";
const API_URL = '/merchant';

export const createMerchant = async (merchantData) => {
  try {
    const response = await api.post(`${API_URL}/apply`, merchantData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllMerchants = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getMerchantById = async (id) => {
  try {
    const response = await api.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateMerchant = async (id, merchantData) => {
  try {
    const response = await api.put(`${API_URL}/${id}`, merchantData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteMerchant = async (id) => {
  try {
    const response = await api.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const approveMerchant = async (id) => {
  try {
    const response = await api.patch(`${API_URL}/${id}/approve`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const disapproveMerchant = async (id) => {
  try {
    const response = await api.patch(`${API_URL}/${id}/cancel`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getRandomMerchant = async () => {
  try {
    const response = await api.get(`${API_URL}/generate/account`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
