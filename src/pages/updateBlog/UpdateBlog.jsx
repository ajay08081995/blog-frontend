// src/pages/UpdateBlog.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import { getBlogById, updateBlog } from '../../services/blogService';
import classes from './updateBlog.module.css';

import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper
} from '@mui/material';

const UpdateBlog = () => {
  const [blogDetails, setBlogDetails] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id } = useParams();

  const categories = [
    'nature',
    'music',
    'travel',
    'design',
    'programming',
    'fun',
    'fashion'
  ];

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const data = await getBlogById(id, token);
        setBlogDetails(data);
        setTitle(data.title);
        setDesc(data.desc);
        setCategory(data.category);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogDetails();
  }, [id, token]);

  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    try {
      await updateBlog(id, { title, desc, category }, token);
      navigate(`/blogDetails/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <Box className={classes.container}>
        <Paper elevation={3} className={classes.wrapper}>
          <Typography variant="h4" gutterBottom>
            Update Blog
          </Typography>
          <form onSubmit={handleUpdateBlog}>
            <Box mb={2}>
              <TextField
                label="Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <Select
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                displayEmpty
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Button variant="contained" color="primary" type="submit">
              Update
            </Button>
          </form>
        </Paper>
      </Box>
      <Footer />
    </>
  );
};

export default UpdateBlog;
