import { Button, Card, CardContent, Container, Typography, TextField, 
        Radio, RadioGroup, FormControlLabel, FormControl, FormLabel}
        from '@mui/material';
import {Box, Table, TableBody, TableCell, TableContainer, TableHead,
        TableRow, Paper} 
        from '@mui/material';
import { Link } from 'react-router-dom';
import DonutInterface from '../Dronut/Donut';
import DroneInterface from '../Drone/Drone';
import { customerItems } from '../Customer/CustomerMenu';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



export interface Order {
  _id: string;
  first_name: string;
  last_name: string;
  drone: DroneInterface;
  items: Array<DonutInterface>;
  price: number;
}
export default function Cart() {
  function subtotal(items: readonly DonutInterface[]) {
    console.log("items: ", items);
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }
  const TAX_RATE = 0.07;
  
  function calculatePaymentDetails(items) {
    const invoiceSubtotal = subtotal(customerItems.items);
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;
    return [invoiceSubtotal, invoiceTaxes, invoiceTotal];
  }

  let [submitted, setSubmitted] = useState<boolean>(false);

  const [id, setID] = useState("623d350aff5d5564185ce960");
  const navigate = useNavigate();
  
  
  function getID() {
    fetch('/orders').then((resp) => {
      return resp.json() as Promise<Array<Order>>;
    }).then((response: Array<Order>) => {
      const ids = response.map((order: Order) => order._id);
      console.log(ids);
      console.log(ids[0]);
      setID(ids[0]);
      console.log("id:", id);
    });
  }
  
  useEffect(() => {if (submitted) {
    getID();
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [submitted]);

  function submitOrder() {  
    // const response = await fetch('/customers/'+customerItems.customerId).then((res) => res.json());
    const [invoiceSubtotal, invoiceTaxes, invoiceTotal] = calculatePaymentDetails(customerItems.items);
    // console.log(response);
    // const newOrder = {
    //   "customer": customerItems.customerId, 
    //   "drone": {"battery_life": 10, "critical": false}, 
    //   "location": {
    //     "street_address": response.addresses[0].street_address ,
    //     "city": response.addresses[0].city,
    //     "state": response.addresses[0].state,
    //     "zipcode": response.addresses[0].zipcode
    // }, 
    //   "items": customerItems.items,
    //   "total": invoiceTotal, 
    //   "status": "Preparing" 
    // };
    
    const newOrder = {
      "customer": "623cc0716c8375d16ebc1afe", 
      "drone": {"battery_life": 10, "critical": false}, 
      "location": {
        "street_address": "error" ,
        "city": "error",
        "state": "error",
        "zipcode": "error"
    }, 
      "items": customerItems.items,
      "total": invoiceTotal, 
      "status": "Preparing" 
    };
    console.log("newOrder: ",newOrder);
  
    fetch('/orders', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newOrder)
    }).then((resp) => {
      // alert('Order submitted!');
      let path = '/trackorder/' + id.toString();
      navigate(path);
    }, (err) => {
      alert('Unexpected error submitting order.');
    });
  
  }

  useEffect(() => {
    if (submitted) {
      submitOrder();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}


function OrderedItems() {
  console.log(customerItems);
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
      <TableContainer component={Paper}>
      <Table id="order-items-table" sx={{ minWidth: 650 }} >
        <TableHead>
          <TableRow>
            <TableCell>Donut</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customerItems.items.map((item) => (
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
  const [invoiceSubtotal, invoiceTaxes, invoiceTotal] = calculatePaymentDetails(customerItems.items);
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
      <Button id="continueToTrackOrder"
      variant="contained" 
      color="secondary" 
      onClick={() => setSubmitted(true)}
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