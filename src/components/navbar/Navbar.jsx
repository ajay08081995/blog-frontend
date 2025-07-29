import React from 'react'
import classes from './navbar.module.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import womanImg from '../../assets/woman.jpg'
import { Box, Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/authSlice'

const Navbar = () => {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.removeItem('persist:root')
    sessionStorage.clear() 
  
    // Dispatch Redux logout
    dispatch(logout())
  
    // Redirect to login
    navigate('/login')
  }
  return (
    <Box className={classes.container}>
      <Box className={classes.wrapper}>
        <ul className={classes.center}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/create"
            className={classes.listItem}
          >
            Create
          </Button>
        </ul>

        <Box className={classes.right}>
          

          <img
            src={womanImg}
            alt="Profile"
            className={classes.img}
          />


          {user && (
            <Button
            onClick={handleLogout}
            variant="outlined"
            color="secondary"
            size="small"
            className={classes.logoutButton}
            style={{ marginRight: '10px' }}
          >
            Logout
          </Button>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar
