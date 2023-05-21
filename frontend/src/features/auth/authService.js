import axios from 'axios';

const API_URL = '/api/v1/auth';

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  return response.data;
};

const logout = async () => {
  const response = await axios.get(`${API_URL}/logout`);

  return response.data;
};

const loggedIn = async () => {
  const response = await axios.get(`${API_URL}/loggedIn`);

  return response.data;
};

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);

  return response.data;
};

const authService = {
  login,
  logout,
  loggedIn,
  register,
};

export default authService;
