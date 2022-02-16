import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Button, Card, CardActions, CardContent, Checkbox, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import { red, grey} from '@mui/material/colors';


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
function OrderScroll(props){
  /*TODO Funmbi --> implement order scrollable functionality */
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



const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: grey[500],
  padding: theme.spacing(1),
}));
const UpdatedButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  left: 'calc(80% - 10px)',
  backgroundColor: red[500],
}));
export default function Orders() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
      <TableBody>
      {rows.map((row) =>(
        <TableRow>
        <Card>
          <CardContent>
            <Div> Order for Customer {row.first_name} {row.last_name} </Div>
            <FormControl>
                {row.items.map((donut)=>(
                  <FormControlLabel value={donut} control={<Checkbox checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }}/>}
                   label={donut} labelPlacement="start"/>
                ))}
            </FormControl>
          </CardContent>
          <CardActions>
          <UpdatedButton variant="contained" endIcon={<SendIcon />}>Order Packed</UpdatedButton>
          </CardActions>
        </Card>
        </TableRow>
      ))}
      </TableBody>
      </Table>
    </React.Fragment>
  );
}



