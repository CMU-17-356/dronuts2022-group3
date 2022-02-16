import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Card, CardContent, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { DonutSmall } from '@mui/icons-material';


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


function donut(id: (id: any, donut: any) => void, donut: any) {
  throw new Error('Function not implemented.');
}

function donut_id(donut_id: any, donut: (id: (id: any, donut: any) => void, donut: any) => void) {
  throw new Error('Function not implemented.');
}

