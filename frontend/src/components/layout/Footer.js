import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ py: 3, backgroundColor: '#C4C4C4' }}
    >
      <Container maxWidth="xl" sx={{ textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Labs action - Controle de Estoque Interno - {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
}
