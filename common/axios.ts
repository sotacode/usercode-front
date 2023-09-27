import axios from 'axios';

const URL_BASE = 'http://localhost:3001/api'
export const fetchData = async (endpoint: string) => {
  try {
    const response = await axios.get(`${URL_BASE}/${endpoint}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createProduct = async (endpoint: string, formData: FormData) => {
  try {
    formData.append('Content-Type', 'multipart/form-data');

    const response = await axios.post(`http://localhost:3001/api/${endpoint}`, formData);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};