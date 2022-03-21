import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Typography
} from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DonutInterface from '../Dronut/Donut';
import { donutImages } from '../Dronut/donutImages';
import DonutList from '../Dronut/DonutList';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="https://mui.com/">
        Dronuts Group 3
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const items: Array<DonutInterface> = [];

function Menu() {
  function handleAddItem(item) {
    items.push(item);
  }

  return (
    <main>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <DonutList onClick={handleAddItem} text="Add to cart" />
      </Container>
      <Button color="secondary" component={Link} to={'/cart'}>
        Continue to Cart
      </Button>
    </main>
  );
}

export default function CustomerMenu() {
  return (
    <>
      <CssBaseline />
      <Menu />
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Dronuts Group 3 2022
        </Typography>
        <Copyright />
      </Box>
    </>
  );
}

export { items };
