import { Box, Button, Container, CssBaseline, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import DonutInterface from '../Dronut/Donut';
import DonutList from '../Dronut/DonutList';
import { loggedUser } from '../Home/Login';

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
export interface UserCart {
  customerId : string, 
  items: Array<DonutInterface>
}
const customerItems: UserCart = {customerId: "", items: []};
const donuts: Array<DonutInterface> = [];

function Menu() {
  function handleAddItem(item) {
    donuts.push(item);
  }
  function handleCustomerCart(){
    console.log(loggedUser);
    customerItems.customerId = loggedUser[0]._id;
    customerItems.items=donuts;
    //customerItems.push(customerCart);
    console.log(customerItems)
  }

  return (
    <main>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <DonutList onClick={handleAddItem} text="Add to cart" />
      </Container>
      <Button color="secondary" component={Link} to={'/cart'} onClick={handleCustomerCart}>
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

export { customerItems }
