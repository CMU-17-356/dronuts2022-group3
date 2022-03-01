import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel
} from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { styled, Theme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Grid from '@mui/material/Grid';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import { createStyles, makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import Title from './Title';

// TODO (rsantoni) : Improve interface with all relevant details

export interface Order {
  id: number;
  first_name: string;
  last_name: string;
  items: string[];
  price: number;
}

// function OrderScroll(props){
//   /*TODO Funmbi --> implement order scrollable functionality */
// }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      fontSize: theme.typography.pxToRem(55),
      fontWeight: theme.typography.fontWeightRegular
    },
    accordionRoot: {
      width: '220px',
      height: '55px',
      flex: '1',
      flexDirection: 'row-reverse',
      alignItems: 'center'
    }
  })
);
// const Div = styled('div')(({ theme }) => ({
//   ...theme.typography.button,
//   padding: theme.spacing(1),
// }));
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
  const classes = useStyles();

  async function fetchOrders() {
    try {
      console.log('fetching');
      const response = await fetch('/orders').then((res) => res.json());
      const orders: Order[] = [];

      await Promise.all(
        response.map(async (order) => {
          let new_items: string[] = [];

          order.items.forEach((item) => {
            new_items.push(item.flavor);
          });

          const customerResponse = await fetch(
            '/customers/' + order.customer
          ).then((res) => res.json());
          console.log(customerResponse);

          let new_order = {
            id: 11,
            first_name: customerResponse.first_name,
            last_name: customerResponse.last_name,
            items: new_items,
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
    <React.Fragment>
      <Title>Recent Orders</Title>
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
                    <InputLabel>Drone {row.id}</InputLabel>
                  </Box>
                  <FormControl>
                    {row.items.map((donut) => (
                      <FormControlLabel
                        value={donut}
                        control={
                          <Checkbox
                            checked={checked[donut]}
                            onChange={handleChange}
                          />
                        }
                        label={donut}
                        labelPlacement="start"
                      />
                    ))}
                  </FormControl>
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
  );
}
