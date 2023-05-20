import axios from 'axios';

const API_URL = '/api/v1/edi/x12/';

const readFile = async (file, token) => {
  //   const config = {
  //     headers: { Authorization: `Bearer ${token}` },
  //   };
  const response = await axios.post(`${API_URL}translate`, file);

  return response.data?.data[0];
};
const validateEdi = async (payload, token) => {
  //   const config = {
  //     headers: { Authorization: `Bearer ${token}` },
  //   };
  const response = await axios.post(`${API_URL}validate`, payload);

  return response.data?.data;
};

const ediService = {
  readFile,
  validateEdi,
};

export default ediService;
