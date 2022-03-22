import { Card, CardContent, InputLabel } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DroneInterface from '../Drone/Drone';
import DonutInterface from '../Dronut/Donut';
import { donutImages } from '../Dronut/donutImages';
import Table from '@mui/material/Table';

export interface OrderInterface {
  _id: string;
  first_name: string;
  last_name: string;
  drone: DroneInterface;
  items: Array<DonutInterface>;
  price: number;
}

export default function Order() {
  const { id } = useParams();
  const [order, setOrder] = React.useState<OrderInterface>();
  async function fetchOrder() {
    try {
      const response = await fetch('/orders/' + id).then((res) => res.json());

      const customerResponse = await fetch(
        '/customers/' + response.customer
      ).then((res) => res.json());

      let new_order: OrderInterface = {
        _id: response._id,
        first_name: customerResponse.first_name,
        last_name: customerResponse.last_name,
        drone: response.drone,
        items: response.items,
        price: response.price
      };

      setOrder(new_order);
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <>
      <Typography variant="h2" align="center" color="text.primary" paragraph>
        Order for customer {order?.first_name} {order?.last_name}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <Table size="medium">
          <TableBody>
            <TableRow key={order?._id}>
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
                      Order for {order?.first_name} {order?.last_name}{' '}
                    </InputLabel>
                    <InputLabel>Drone Id : {order?.drone._id}</InputLabel>
                  </Box>
                  <Grid lg={12} md={8} sm={12}>
                    <List>
                      {order?.items.map((donut) => (
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
                            order?.items.reduce(
                              (sum, donut) => sum + donut.price,
                              0
                            )
                          }
                        />
                      </ListItem>
                    </List>
                  </Grid>
                </CardContent>
              </Card>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </>
  );
}
