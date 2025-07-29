import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { request } from '../../utils/fetchApi'

import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  IconButton,
  Stack,
} from '@mui/material'

import classes from './create.module.css'  // Your CSS file import

const Create = () => {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [img, setImg] = useState(null)
  const [category, setCategory] = useState("")
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)

  // const categories = [
  //   'nature',
  //   'music',
  //   'travel',
  //   'design',
  //   'programming',
  //   'fun',
  //   'fashion'
  // ]

  const categories = [
    'nature',
    'music',
    'travel',
    'design',
    'programming',
    'fun',
    'fashion'
  ]


  const onChangeFile = (e) => {
    setImg(e.target.files[0])
  }

  const handleCloseImg = () => {
    setImg(null)
  }

  const handleCreateBlog = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()

      let filename = null
      if (img) {
        filename = crypto.randomUUID() + img.name
        formData.append("filename", filename)
        formData.append("image", img)

        await fetch(`http://localhost:5000/upload`, {
          method: "POST",
          body: formData
        })
      } else {
        return
      }

      const options = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }

      const body = {
        title,
        desc,
        category,
        photo: filename
      }

      const data = await request('/blog', "POST", options, body)
      navigate(`/blogDetails/${data._id}`)

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <Typography variant="h4" component="h2" className={classes.title}>
            Create Blog
          </Typography>

          <form onSubmit={handleCreateBlog} encType="multipart/form-data">
            <Box className={classes.inputWrapper}>
              <label htmlFor="title">Title: </label>
              <TextField
                id="title"
                variant="outlined"
                placeholder="Title..."
                className={classes.input}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth={false} // to respect your width control
              />
            </Box>

            <Box className={classes.inputWrapper}>
              <label htmlFor="desc">Description: </label>
              <TextField
                id="desc"
                variant="outlined"
                placeholder="Description..."
                className={classes.input}
                onChange={(e) => setDesc(e.target.value)}
                fullWidth={false}
              />
            </Box>

            <Box className={classes.inputWrapperSelect}>
              <label htmlFor="category">Category: </label>
              <Select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={classes.inputWrapperSelect}
                displayEmpty
                sx={{ width: '67.5%' }} // mimic your CSS select width
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat} sx={{ textTransform: 'capitalize' }}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Box className={classes.inputWrapperImg}>
              <label htmlFor="image" className={classes.labelFileInput}>
                Image: <span>Upload here</span>
              </label>
              <input
                id="image"
                type="file"
                className={classes.input}
                onChange={onChangeFile}
                style={{ display: 'none' }}
              />
              {img && (
                <p className={classes.imageName}>
                  {img.name}
                  <AiOutlineCloseCircle className={classes.closeIcon} onClick={handleCloseImg} />
                </p>
              )}
            </Box>

            <Box className={classes.buttonWrapper}>
              <Button
                variant="contained"
                className={classes.submitBtn}
                type="submit"
              >
                Submit form
              </Button>
            </Box>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Create
