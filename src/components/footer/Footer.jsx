// src/components/footer/Footer.jsx
import React from 'react';
import { Box, Typography, Link, Stack } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        height: '200px',
        bgcolor: 'grey.200',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '85%',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* About the App */}
        <Stack spacing={1} sx={{ maxWidth: 425 }}>
          <Typography variant="h6" sx={{ mb: 2, ml: -0.5 }}>
            About the App
          </Typography>
          <Typography sx={{ fontSize: 15, color: '#555' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quo voluptatum, ullam quam perspiciatis deleniti obcaecati architecto,
            sed minus culpa autem suscipit rem vero voluptas alias animi. Iure, eaque dicta!
          </Typography>
        </Stack>

        {/* Contacts */}
        <Stack spacing={1}>
          <Typography variant="h6" sx={{ mb: 2, ml: -0.5 }}>
            Contacts
          </Typography>
          <Typography>Name: Ajay Kumavat</Typography>
          <Typography>Phone: +91 8380988087</Typography>
          <Typography>
            GitHub:{' '}
            <Link href="https://github.com/ajay08081995" target="_blank" rel="noopener">
              github.com/ajay08081995
            </Link>
          </Typography>
        </Stack>

        {/* Location */}
        <Stack spacing={1}>
          <Typography variant="h6" sx={{ mb: 2, ml: -0.5 }}>
            Location
          </Typography>
          <Typography>Continent: Asia</Typography>
          <Typography>Country: India</Typography>
          <Typography>Current Location: Pune</Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
