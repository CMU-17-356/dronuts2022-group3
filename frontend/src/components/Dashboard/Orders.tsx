import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActions, CardContent, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, Paper, Typography} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { styled, Theme } from '@mui/material/styles';
import { red, grey} from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { createStyles, makeStyles } from "@mui/styles";




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
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  left: 'calc(80% - 10px)',
  color: theme.palette.text.secondary,
}));
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


const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    heading: {
      fontSize: theme.typography.pxToRem(55),
      fontWeight: theme.typography.fontWeightRegular
    },
    accordionRoot: {
      width: "220px", 
      height: "55px", 
      flex: '1',
      flexDirection: "row-reverse",
      alignItems: "center"
    }
    
  })
);
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
  const [checked, setChecked] = React.useState({});

  const handleChange = (event) => {
    const value = {
      ...checked,
      [event.target.name]: event.target.checked,
    }
    setChecked(value);
  };
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
      <TableBody>
      {rows.map((row) =>(
        <TableRow>
        <Card>
          <CardContent>
            <Div> 
            <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 1,
          m: 1,
          bgcolor: grey[500],
          borderRadius: 1,
        }}
      >
        <InputLabel>Order for Customer {row.first_name} {row.last_name} </InputLabel>
        <InputLabel>Drone {row.id}</InputLabel>
      </Box>
            </Div>
            <FormControl>
                {row.items.map((donut)=>(
                  <FormControlLabel value={donut} control={<Checkbox checked={checked[donut]} onChange={handleChange}/>}
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



