import { 
  Box, 
  Card, 
  CardContent, 
  CardMedia, 
  Container, 
  Stepper,
  Step, 
  StepLabel, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper} from '@mui/material';
import React, { useEffect } from 'react';
import DroneInterface from '../Drone/Drone';
import DonutInterface from '../Drone/Drone';

const steps = [
  'Prepare Order',
  'Drone Packed',
  'Drone on the way',
  'Delivered!'
];

function ProgressStepper() {
  return (
    <Box sx={{ m: 'auto 0', width: '100%' , py: 5}}>
      <Stepper activeStep={1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
    
  );
}

const TAX_RATE = 0.07;

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty: number, unit: number) {
  return qty * unit;
}

function createRow(desc: string, qty: number, unit: number) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

interface Row {
  desc: string;
  qty: number;
  unit: number;
  price: number;
}

function subtotal(items: readonly Row[]) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Boston Kreme', 1, 3.49),
  createRow('Glazed', 4, 2.99),
  createRow('Apple Krumb', 2, 3.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export interface Order {
  _id: number;
  first_name: string;
  last_name: string;
  drone: DroneInterface;
  items: Array<DonutInterface>;
  price: number;
}

// function OrderScroll(props){
//   /*TODO Funmbi --> implement order scrollable functionality */
// }



function OrderItemsTable(orders) {
  const order = orders[0];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.desc}>
              <TableCell>{row.desc}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{ccyFormat(row.price)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Fees & Estimated Tax</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function DeliveryCard() {
    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            <Card 
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} 
            >
            <CardContent sx={{px: 5, py:5}}>
            <CardMedia
                component="img"
                image="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg"
                alt="map"
                />
                <ProgressStepper></ProgressStepper>
                <Typography gutterBottom variant="h5" component="h2">
                    Delivery Time: 5 min
                </Typography>
                </CardContent>
            </Card>
        </Container>
    );
}

function OrderDetailsCard(orders){
    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            <Card 
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} 
            >
            <CardContent sx={{px: 5, py:5}}>
            <Typography gutterBottom variant="h5" component="h2">
                Order Details
            </Typography>
            <OrderItemsTable>(orders)</OrderItemsTable>
            </CardContent>
            </Card>
        </Container>
    );
}

export default function TrackOrder() {
  const [orders, setOrders] = React.useState<Array<Order>>([]);
  const [checked, setChecked] = React.useState({});

  async function fetchOrders() {
    try {
      const response = await fetch('/orders').then((res) => res.json());
      const orders: Order[] = [];

      await Promise.all(
        response.map(async (order) => {
          const customerResponse = await fetch(
            '/customers/' + order.customer
          ).then((res) => res.json());
          console.log('items: ');
          console.log(order.items);
          let new_order: Order = {
            _id: order._id,
            first_name: customerResponse.first_name,
            last_name: customerResponse.last_name,
            drone: order.drone,
            items: order.items,
            price: order.price
          };

          orders.push(new_order);
        })
      );

      setOrders(orders);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);
  console.log(orders);

    return (
      <main>
          <DeliveryCard></DeliveryCard>
          <OrderDetailsCard>(orders)</OrderDetailsCard>
      </main>
    );
}


