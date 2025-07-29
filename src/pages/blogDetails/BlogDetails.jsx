import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';
import {
  Box,
  Button,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Divider
} from '@mui/material';
import {
  AiFillEdit,
  AiFillLike,
  AiFillDelete,
  AiOutlineArrowRight,
  AiOutlineLike
} from 'react-icons/ai';

import { request } from '../../utils/fetchApi';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';

const BlogDetails = () => {
  const [blogDetails, setBlogDetails] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const options = { Authorization: `Bearer ${token}` };
        const data = await request(`/blog/find/${id}`, 'GET', options);
        setBlogDetails(data);
        setIsLiked(data.likes.includes(user._id));
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogDetails();
  }, [id]);

  const handleLikePost = async () => {
    try {
      const options = { Authorization: `Bearer ${token}` };
      await request(`/blog/likeBlog/${id}`, 'PUT', options);
      setIsLiked((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBlog = async () => {
    try {
      const options = { Authorization: `Bearer ${token}` };
      await request(`/blog/deleteBlog/${id}`, 'DELETE', options);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  if (!blogDetails) return null;

  return (
    <>
      <Navbar />
      <Box sx={{ p: 4, maxWidth: '800px', mx: 'auto' }}>
        <Button
          component={RouterLink}
          to="/"
          startIcon={<AiOutlineArrowRight />}
          sx={{ mb: 2 }}
        >
          Go Back
        </Button>

        <Card elevation={3}>
          <CardMedia
            component="img"
            height="400"
            image={`http://localhost:5000/images/${blogDetails?.photo}`}
            alt={blogDetails?.title}
          />
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" fontWeight="bold">
                {blogDetails?.title}
              </Typography>
              {blogDetails?.userId?._id === user._id ? (
                <Stack direction="row" spacing={1}>
                  <IconButton component={RouterLink} to={`/updateBlog/${blogDetails?._id}`}>
                    <AiFillEdit />
                  </IconButton>
                  <IconButton onClick={handleDeleteBlog}>
                    <AiFillDelete />
                  </IconButton>
                </Stack>
              ) : (
                <IconButton onClick={handleLikePost}>
                  {isLiked ? <AiFillLike /> : <AiOutlineLike />}
                </IconButton>
              )}
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Description:</strong> {blogDetails?.desc}
            </Typography>

            <Stack direction="row" spacing={3} sx={{ mb: 2 }}>
              <Typography variant="body2">{blogDetails?.views} views</Typography>
              <Typography variant="body2">{blogDetails?.likes?.length} likes</Typography>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Stack direction="row" spacing={4}>
              <Typography variant="body2">
                <strong>Author:</strong> {blogDetails?.userId?.username}
              </Typography>
              <Typography variant="body2">
                <strong>Created At:</strong> {format(blogDetails?.createdAt)}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </>
  );
};

export default BlogDetails;
