import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  InputLabel
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Theme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { createStyles, makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import DonutInterface from '../Donuts/Donut';
import { donutImages } from '../Donuts/donutImages';

// TODO (rsantoni) : Improve interface with all relevant details

export interface Order {
  id: number;
  first_name: string;
  last_name: string;
  items: Array<DonutInterface>;
  price: number;
}

// function OrderScroll(props){
//   /*TODO Funmbi --> implement order scrollable functionality */
// }

export default function Orders() {
  const [orders, setOrders] = React.useState<Array<Order>>([]);
  const [checked, setChecked] = React.useState({});

  function handleCompleteOrder(id) {
    console.log(id);
    const newOrders = orders.filter((item) => item.id !== id);
    // const oldOrder = orders.filter((item) => item.id == id);
    // const orderlength = oldOrder[0].items.length;
    // console.log(oldOrder[0].items);
    // for(var i = 0; i < orderlength; i++ ){
    //   console.log("donut state");
    //   const donut = oldOrder[0].items[i];
    //   console.log(donut.checked);
    // }
    setOrders(newOrders);
  }

  const handleChange = (event) => {
    const value = {
      ...checked,
      [event.target.name]: event.target.checked
    };
    setChecked(value);
  };

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
            id: order._id,
            first_name: customerResponse.first_name,
            last_name: customerResponse.last_name,
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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid item xs={12}>
        <Box
          bgcolor="background"
          display="flex"
          sx={{
            pb: 6
          }}
        >
          <Typography
            variant="h2"
            align="center"
            color="text.primary"
            paragraph
          >
            Recent Orders
          </Typography>
        </Box>
        <React.Fragment>
          <Table size="medium">
            <TableBody>
              {orders.map((row) => (
                <TableRow key={row.id}>
                  <Card>
                    <CardContent>
                      <Box
                        bgcolor="info.main"
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          p: 1,
                          m: 1,
                          borderRadius: 1
                        }}
                      >
                        <InputLabel>
                          Order for {row.first_name} {row.last_name}{' '}
                        </InputLabel>
                        <InputLabel>Drone Id : {row.id}</InputLabel>
                      </Box>
                      <Grid lg={12} md={8} sm={12}>
                        <List>
                          {row.items.map((donut) => (
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar
                                  alt={donut.flavor}
                                  src={donutImages[donut.flavor]}
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primary={donut.flavor}
                                secondary={'Secondary text'}
                              />
                              <ListItemText
                                style={{
                                  display: 'flex',
                                  justifyContent: 'flex-end'
                                }}
                                primary={'$' + donut.price}
                              />
                            </ListItem>
                          ))}
                          <ListItem>
                            <ListItemIcon></ListItemIcon>
                            <ListItemText primary="Total Price" />
                            <ListItemText
                              style={{
                                display: 'flex',
                                justifyContent: 'flex-end'
                              }}
                              primary={
                                '$' +
                                row.items.reduce(
                                  (sum, donut) => sum + donut.price,
                                  0
                                )
                              }
                            />
                          </ListItem>
                        </List>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <Grid container justifyContent="flex-end">
                        <Button
                          color="secondary"
                          sx={{
                            position: 'relative',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end'
                          }}
                          variant="contained"
                          endIcon={<SendIcon />}
                          onClick={() => handleCompleteOrder(row.id)}
                        >
                          Order Packed
                        </Button>
                      </Grid>
                    </CardActions>
                  </Card>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
      </Grid>
    </Container>
  );
}
