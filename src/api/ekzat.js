import {api} from './axiosInstance';

const authToken = localStorage.getItem('token');

export const createMerchant = async (merchantData) => {
    console.log("authToken.....",authToken)
  try {
    const response = await api.post('/merchant/apply', merchantData, {
      headers: {
        Authorization: `${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllMerchants = async () => {
  try {
    const response = await api.get('/merchant', {
      headers: {
        Authorization: authToken,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getMerchantById = async (id) => {
  try {
    const response = await api.get(`/merchant/${id}`, {
      headers: {
        Authorization: authToken,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getRandomMerchant = async () => {
  try {
    const response = await api.get('/merchant/generate/account', {
        headers: {
            Authorization: authToken,
        },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

///will handle this later
export const updateMerchant = async (id, updateData) => {
  try {
    const response = await api.put(`/merchant/${id}`, updateData, {
      headers: {
        Authorization: authToken,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteMerchant = async (id) => {
  try {
    const response = await api.delete(`/merchant/${id}`, {
      headers: {
        Authorization: authToken,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const approveMerchant = async (id) => {
  try {
    const response = await api.patch(`/merchant/${id}/approve`, null, {
      headers: {
        Authorization: authToken,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const disapproveMerchant = async (id) => {
  try {
    const response = await api.patch(`/merchant/${id}/cancel`, null, {
      headers: {
        Authorization: authToken,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//////////WITHDRAWAL
export const processHiveWithdrawal = async (withdrawalData) => {
  try {
    const response = await api.post('withdrawals/hive', withdrawalData, {
      headers: {
        Authorization: authToken,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const requestWithdrawalToken = async () => {
  try {
    const response = await api.post('/withdrawals/request-token', {}, {
      headers: {
        Authorization: authToken,
      },
    });    
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

/////////DEPOSIT
export const createNairaDepositRequest = async (depositData) => {
  try {
    const response = await api.post('deposits/naira-deposit', depositData, {
      headers: {
        Authorization: authToken,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

