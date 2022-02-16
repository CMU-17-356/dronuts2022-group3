import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import RestaurantMenuTwoToneIcon from '@mui/icons-material/RestaurantMenuTwoTone';import Card from '@mui/material/Card';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';


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

function OrderItemsTable() {
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
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
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


function OrderDetailsCard(){
    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            <Card 
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} 
            >
            <CardContent sx={{px: 5, py:5}}>
            <Typography gutterBottom variant="h5" component="h2">
                Order Details
            </Typography>
            <OrderItemsTable></OrderItemsTable>
            </CardContent>
            </Card>
        </Container>
    );
}

const theme = createTheme();

export default function TrackOrder() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
              <Toolbar>
                <RestaurantMenuTwoToneIcon sx={{ mr: 2 }} />
                <Typography variant="h6" color="inherit" noWrap>
                Dronuts Track My Order 
                </Typography>
              </Toolbar>
            </AppBar>
            <main>
                <DeliveryCard></DeliveryCard>
                <OrderDetailsCard></OrderDetailsCard>
            </main>
        </ThemeProvider>
    );
}


