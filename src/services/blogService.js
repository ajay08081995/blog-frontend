// src/services/blogService.js
import { request } from '../utils/fetchApi';

export const getBlogById = async (id, token) => {
  const options = { Authorization: `Bearer ${token}` };
  return await request(`/blog/find/${id}`, 'GET', options);
};

export const likeBlog = async (id, token) => {
  const options = { Authorization: `Bearer ${token}` };
  return await request(`/blog/likeBlog/${id}`, 'PUT', options);
};

export const deleteBlog = async (id, token) => {
  const options = { Authorization: `Bearer ${token}` };
  return await request(`/blog/deleteBlog/${id}`, 'DELETE', options);
};
export const updateBlog = async (id, payload, token) => {
    const options = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return await request(`/blog/updateBlog/${id}`, 'PUT', options, payload);
  };