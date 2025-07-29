// src/services/authService.js
import { request } from '../utils/fetchApi';

export const loginUser = async (email, password) => {
  const options = {
    'Content-Type': 'application/json',
  };
  return await request('/auth/login', 'POST', options, { email, password });
};

export const registerUser = async (username, email, password) => {
    const options = {
      'Content-Type': 'application/json',
    };
    return await request('/auth/register', 'POST', options, {
      username,
      email,
      password,
    });
  };