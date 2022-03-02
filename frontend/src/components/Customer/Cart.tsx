import { Button, Card, CardContent, Container, Typography, TextField, 
        Radio, RadioGroup, FormControlLabel, FormControl, FormLabel}
        from '@mui/material';
import {Box, Table, TableBody, TableCell, TableContainer, TableHead,
        TableRow, Paper} 
        from '@mui/material';
import { Link } from 'react-router-dom';
import DonutInterface from '../Dronut/Donut';
import DroneInterface from '../Drone/Drone';
import {items} from '../Customer/CustomerMenu';

export interface Order {
  _id: number;
  first_name: string;
  last_name: string;
  drone: DroneInterface;
  items: Array<DonutInterface>;
  price: number;
}

async function handlePlaceOrder() {  
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
    "status": "Preparing" 
  };
  console.log(newOrder);

  fetch('/orders', {
    method: 'POST',
    body: JSON.stringify(newOrder),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

}

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function subtotal(items: readonly DonutInterface[]) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const TAX_RATE = 0.07;
const invoiceSubtotal = subtotal(items);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

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
  return(
    <TableContainer component={Paper}>
    <Table aria-label="spanning table">
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
      component={Link} 
      to={'/order'} 
      onClick={() => handlePlaceOrder()}
      sx={{mt: 2}}>Place Order</Button>
  </Container>
    );
}

export default function Cart() {
  return (
    <main>
        <CartContent />
        <Copyright />
    </main>
  );
}