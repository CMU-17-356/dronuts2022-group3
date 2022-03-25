import { Box, Card, CardContent, CardMedia, Container, Stepper,
  Step, StepLabel, Typography, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import DonutInterface from '../Dronut/Donut';
import { Order } from './Cart';


export default function TrackOrder() {
  const { id } = useParams();

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
  
  interface Row {
    flavor: string;
    price: number;
  }
  
  function subtotal(items: readonly DonutInterface[]) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }

  const [order, setOrder] = useState<Order>();

  const navigate = useNavigate();

  async function fetchOrder() {
    try {
      const response = await fetch('/orders/' + id).then((res) => res.json());
      setOrder(response);
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    fetchOrder();
    console.log(order);
  }, []);


  // async function getOrder(id: String, orderList: Array<Order>){

  //   // order passed in via link
  //   let order = orderList.find(o => o._id === id);
  //   if(order !== undefined) {
  //     console.log("order: ", order);
  //     return order;
  //   }

    // there is a current order associated with user
    // order = orderList.find(o => (o.customer === currentUser.id && o.status !== "Completed"))
    // if(order !== undefined) {
    //   console.log("order: ", order);
    //   return order;
    // }
  //}

  // useEffect(() => {
  //   const setup = async () => {
  //     let o = await fetchOrder();
  //     setOrder(order);
  //   };
  //   setup();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [params.id]);
  
  // const [rows, setRows] = React.useState<Array<DonutInterface>>([]);
  
  // if(order !== undefined){
  //   setRows(order.items);
  // }

  const invoiceSubtotal = subtotal(order ? order.items ? order.items : [] : []);
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
          </TableHead>
          <TableBody>
            {order ? order.items ? order.items.map((item) => {
              return(<TableRow key={item.flavor}>
                <TableCell>{item.flavor}</TableCell>
                <TableCell align="right">{ccyFormat(item.price)}</TableCell>
              </TableRow>);
             }) : null : null}
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
              <Card id="DeliveryCard"
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

    return (
      <main>
          <DeliveryCard></DeliveryCard>
          <OrderDetailsCard></OrderDetailsCard>
      </main>
    );
}


