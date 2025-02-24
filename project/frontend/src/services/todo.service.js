/* eslint-disable no-unused-vars */

import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000/api/v1/todo";

export const getTodos = async () => {
  console.log(`Vite backend URL is ${BACKEND_URL}`);
  try {
    const response = await axios.get(BACKEND_URL);
    if (response.status === 200) {
      return response.data;
    }
    return new Promise((resolve, reject) => {
      return resolve([]);
    });
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const createTodo = async (payload) => {
  try {
    const response = await axios.post(BACKEND_URL, payload);
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.error(error.message);
  }
};
