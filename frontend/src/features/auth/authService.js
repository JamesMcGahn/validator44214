import axios from 'axios';

const API_URL = '/api/v1/auth';

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  return response.data;
};

const authService = {
  login,
};

export default authService;
