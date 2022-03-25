import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Snackbar,
  Typography
} from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DonutInterface from '../Dronut/Donut';
import DonutList from '../Dronut/DonutList';
import { loggedUser } from '../Home/Login';
import { newUser }from '../Customer/CustomerSignUp';

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

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpen(false);
  };
  
  const [open, setOpen] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState("");

  function handleAddItem(item) {
    console.log(item);
    customerItems.items.push(item);
    setSnackMessage(`Added ${item.flavor} donut to cart!`);
    setOpen(true);
  }

  async function handleCustomerCart(){
    console.log("logged User: ",loggedUser);

    if(loggedUser.email === ""){
      const response = await fetch('/customers').then((res) => res.json());
      console.log("get response: ", response)
      await Promise.all(
        response.map(async (customer)=>{
          if (customer.email == newUser.email && customer.password == newUser.password){
              console.log("customer: ", customer);
              newUser._id = customer._id;
            }
          })
        );
      customerItems.customerId = newUser._id;
    }else{
      customerItems.customerId = loggedUser._id;
    }
    console.log(customerItems)
  }

  return (
    <main>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <DonutList onClick={handleAddItem} text="Add to cart" />
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert id="addedAlert" onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {snackMessage}
        </Alert>
      </Snackbar>
      <Button id="continueToCart"
        color="secondary" component={Link} to={'/cart'} onClick={handleCustomerCart}>
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
