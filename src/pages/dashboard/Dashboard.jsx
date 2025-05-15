import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <Container>
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;