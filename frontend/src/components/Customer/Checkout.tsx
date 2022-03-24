import { Button, Card, CardContent, Container, Typography, TextField, 
        Radio, RadioGroup, FormControlLabel, FormControl, FormLabel}
        from '@mui/material';
import {Box, Table, TableBody, TableCell, TableContainer, TableHead,
        TableRow, Paper} 
        from '@mui/material';
import { Link } from 'react-router-dom';
import DonutInterface from '../Dronut/Donut';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Cart(orderItems) {
  let navigate = useNavigate();  
  const { pathname } = useLocation();

  const items: Array<DonutInterface> = orderItems.items;
  const [orderId, setOrderId] = React.useState(0);

  async function handlePlaceOrder() {  
    const [invoiceSubtotal, invoiceTaxes, invoiceTotal] = calculatePaymentDetails()
    const newOrder = {
      "customer": "621ebac6b299fa068acf30fe", 
      "drone": {"battery_life": 10, "critical": false}, 
      "location": {
        "street_address": "5318 beeler street",
        "city": "Pittsburgh",
        "state": "PA",
        "zipcode": "15217"
    }, 
      "items": items,
      "total": invoiceTotal, 
      "status": "Accepted" 
    };
    console.log(newOrder);
  
    const response = fetch('/orders', {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(result => handleRedirect(result));

    function handleRedirect(result) {
      console.log("result: ", result);
      console.log("result id: ", result._id);
      navigate(pathname + "/" + result._id);
    } 
  }
  
  function ccyFormat(num: number) {
    return `${num.toFixed(2)}`;
  }
  
  const TAX_RATE = 0.07;
  
  function calculatePaymentDetails() {
    const invoiceSubtotal = items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;
    return [invoiceSubtotal, invoiceTaxes, invoiceTotal];
  }
  
  function OrderedItems() {
    return (
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Donut</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.flavor}
                </TableCell>
                <TableCell align="right">{item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
          <Button variant="contained" component={Link} to={'/customer'} sx={{margin: 2}}>Add Items</Button> 
        </Paper>
      </Box>
    );
   }
  
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
  
  function DeliveryOptions(){
      return(
        <FormControl sx={{py: 3}}>
            <FormLabel id="demo-row-radio-buttons-group-label">Delivery Options</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              defaultValue="now"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="now" control={<Radio />} label="Order Now" />
              <FormControlLabel value="schedule" control={<Radio />} label="Schedule Ahead" />
            </RadioGroup>
          </FormControl>
      );
    }
  
  function PaymentDetails(){
    const [invoiceSubtotal, invoiceTaxes, invoiceTotal] = calculatePaymentDetails();
    return(
      <TableContainer component={Paper}>
      <Table aria-label="spanning table"  id="payment-details-table">
      <Typography gutterBottom variant="h6" sx={{margin: 2}}>
                  Payment Details
              </Typography>
        <TableBody>
          <TableRow>
            <TableCell>Subtotal</TableCell>
            <TableCell >{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Fees & Estimated Tax</TableCell>
            <TableCell >{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell >{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    );
  }
  
  function CartContent(){
      return(
        <Container sx={{ py: 8 }} maxWidth="md">
        <Card 
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} 
        >
        <CardContent sx={{px: 5, py:5}}>
        <Typography gutterBottom variant="h5" component="h2">
            Delivery Details
        </Typography>
          <TextField fullWidth id="address" label="Address" variant="filled" />
          <DeliveryOptions />
          <OrderedItems />
          <PaymentDetails />
        </CardContent>
        </Card>
        <Button 
        variant="contained" 
        color="secondary" 
        onClick={() => handlePlaceOrder()}
        sx={{mt: 2}}>Place Order</Button>
    </Container>
      );
  }

  

  return (
    <main>
        <CartContent />
        <Copyright />
    </main>
  );
}