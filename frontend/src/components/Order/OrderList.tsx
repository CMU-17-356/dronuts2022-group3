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
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { donutImages } from '../Dronut/donutImages';
import { OrderInterface } from './Order';

export default function OrderList() {
  const [orders, setOrders] = React.useState<Array<OrderInterface>>([]);
  const [checked, setChecked] = React.useState({});

  function handleCompleteOrder(id) {
    console.log(id);
    const newOrders = orders.filter((item) => item._id !== id);
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
      const orders: OrderInterface[] = [];

      await Promise.all(
        response.map(async (order) => {
          const customerResponse = await fetch(
            '/customers/' + order.customer
          ).then((res) => res.json());
          console.log('items: ');
          console.log(order.items);
          let new_order: OrderInterface = {
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

  return (
    <Grid item xs={12}>
      <Box
        bgcolor="background"
        display="flex"
        sx={{
          pb: 6
        }}
      >
        <Typography variant="h2" align="center" color="text.primary" paragraph>
          Recent Orders
        </Typography>
      </Box>
      <React.Fragment>
        <Table size="medium">
          <TableBody>
            {orders.map((row) => (
              <TableRow key={row._id}>
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
                      <InputLabel>Drone Id : {row.drone._id}</InputLabel>
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
                            <ListItemText primary={donut.flavor} />
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
                    <Grid container>
                      <Button
                        color="secondary"
                        variant="outlined"
                        component={Link}
                        to={row._id.toString()}
                      >
                        View Order
                      </Button>
                    </Grid>
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
                        onClick={() => handleCompleteOrder(row._id)}
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
  );
}
