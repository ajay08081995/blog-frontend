// src/pages/Categories.jsx
import React, { useEffect, useState } from 'react'
import { request } from '../../utils/fetchApi'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Grid
} from '@mui/material'
import { MdOutlinePreview } from 'react-icons/md'
import { AiFillLike } from 'react-icons/ai'
import { FiArrowRight } from 'react-icons/fi'
import classes from './categories.module.css'

const Categories = () => {
  const [blogs, setBlogs] = useState([])
  const [filteredBlogs, setFilteredBlogs] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortOrder, setSortOrder] = useState('newest')

  const categories = ['all', 'Food', 'Education', 'Businessmen', 'Positions']

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await request('/blog/getAll', 'GET')
        setBlogs(data)
        setFilteredBlogs(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    let updatedBlogs = [...blogs]

    if (activeCategory !== 'all') {
      updatedBlogs = updatedBlogs.filter(
        (blog) => blog.category.toLowerCase() === activeCategory.toLowerCase()
      )
    }

    updatedBlogs.sort((a, b) => {
      return sortOrder === 'newest'
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    })

    setFilteredBlogs(updatedBlogs)
  }, [activeCategory, sortOrder, blogs])

  return (
    <Box className={classes.container}>
      <Box className={classes.wrapper}>
        <Typography variant="h5" gutterBottom>
          Select a category
        </Typography>

        <Grid container spacing={2} alignItems="center" justifyContent="space-between" mb={2}>
          <Grid item xs={12} md={8}>
            <Box display="flex" gap={1} flexWrap="wrap">
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  clickable
                  color={activeCategory === category ? 'primary' : 'default'}
                  onClick={() => setActiveCategory(category)}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="sort-label">Sort by Date</InputLabel>
              <Select
                labelId="sort-label"
                value={sortOrder}
                label="Sort by Date"
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="oldest">Oldest First</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box className={classes.scrollableBlogList}>
          {filteredBlogs?.length > 0 ? (
            <Grid container spacing={3}>
              {filteredBlogs.map((blog) => (
                <Grid item xs={12} sm={6} md={4} key={blog._id}>
                  <Box className={classes.blog}>
                    <Link to={`/blogDetails/${blog._id}`}>
                      <img
                        src={`http://localhost:5000/images/${blog?.photo}`}
                        alt={blog?.title}
                        className={classes.blogImage}
                      />
                    </Link>
                    <Box className={`${classes.blogData} blogData`}>
                      <Box className={classes.categoryAndMetadata}>
                        <Typography variant="caption" className={classes.category}>
                          {blog?.category}
                        </Typography>
                        <Box className={classes.metadata}>
                          <MdOutlinePreview /> {blog.views} views
                        </Box>
                        <Box className={classes.metadata}>
                          <AiFillLike /> {blog?.likes?.length} likes
                        </Box>
                      </Box>
                      <Typography variant="h6" gutterBottom>
                        {blog?.title}
                      </Typography>
                      <Typography variant="body2" className={classes.blogDesc}>
                        {blog?.desc}
                      </Typography>
                      <Box className={classes.authorAndCreatedAt}>
                        <Typography variant="caption">
                          <strong>Author:</strong> {blog?.userId?.username}
                        </Typography>
                        <Typography variant="caption">
                          <strong>Created:</strong> {format(blog?.createdAt)}
                        </Typography>
                      </Box>
                      <Link to={`/blogDetails/${blog._id}`} className={classes.readMore}>
                        Read More <FiArrowRight />
                      </Link>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="h6" className={classes.noBlogsMessage}>
              No blogs
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Categories
