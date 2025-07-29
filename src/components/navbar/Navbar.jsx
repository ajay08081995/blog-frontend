import React from 'react';
import { Box, Button } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import womanImg from '../../assets/woman.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import classes from './navbar.module.css';

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('persist:root');
        sessionStorage.clear();
        dispatch(logout());
        navigate('/login');
    };

    // Check if current route is the create page
    const isCreatePage = location.pathname === '/create';

    return (
        <Box className={classes.container}>
            <Box className={classes.wrapper}>
                {/* Left section - Home button */}
                <Box className={classes.left}>
                    <Button
                        component={Link}
                        to="/"
                        className={`${classes.listItem} ${classes.creativeButton}`}
                    >
                        Home
                    </Button>
                </Box>

                {/* Center section - Create button (hidden on create page) */}
                {!isCreatePage && (
                    <Box className={classes.center}>
                        <Button
                            component={Link}
                            to="/create"
                            className={`${classes.listItem} ${classes.creativeButton}`}
                        >
                            Create Blog Post
                        </Button>
                    </Box>
                )}

                {/* Right section - Profile and Logout */}
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
                            color="error"
                            className={classes.listItem}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 'bold',
                                minWidth: 120,
                                borderWidth: 2,
                                '&:hover': {
                                    borderWidth: 2,
                                    backgroundColor: 'rgba(244, 67, 54, 0.08)'
                                }
                            }}
                        >
                            Logout
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Navbar;