import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Button, Card, CardActions, CardContent, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';


// Generate Order Data
function createData(
  id: number,
  first_name: string,
  last_name: string,
  items: string[]
  // shipTo: string,
  // paymentMethod: string,
  // amount: number,
) {
  return { id, first_name,last_name, items };
}

const rows = [
  createData(
    0,
    'John',
    "Smith",
    ['glazed donut', 'crueller','cronut']
  ),
  createData(
    1,
    'Eleanor',
    'McCartney',
    ['glazed donut', 'crueller','cronut']
  ),
  createData(
    2,
    'Jane',
    'Harrison',
    ['glazed donut', 'crueller','cronut']
  ),
  createData(
    3,
    'Paul',
    'Garrett',
    ['glazed donut', 'crueller','cronut']
  ),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}
const UpdatedButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  left: 'calc(80% - 10px)',
  color: theme.palette.getContrastText(red[500]),
}));
export default function Orders() {
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      {rows.map((row) =>(
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div"> Order for Customer {row.first_name} {row.last_name} </Typography>
            <FormControl>
              <RadioGroup aria-labelledby='radio-buttons-group-label' name='radio-buttons-group'>
                {row.items.map((donut)=>(
                  <FormControlLabel value={donut} control={<Radio />} label={donut} labelPlacement="start"/>
                ))}
              </RadioGroup>
            </FormControl>
          </CardContent>
          <CardActions>
          <UpdatedButton variant="contained" endIcon={<SendIcon />} >Order Packed</UpdatedButton>
          </CardActions>
        </Card>
      ))}
      {/* <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </React.Fragment>
  );
}



