import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Container from '@mui/material/Container';
import { createTheme, makeStyles, ThemeProvider } from '@mui/material/styles';
import DronutIcon from '../../assets/dronut.png'
import { ElectricScooterOutlined, Label } from '@mui/icons-material';
import LocationInterface from './Location';


const itemData = [
    {
      img: require('../../assets/apple_krumb.jpeg'),
      rows: 1,
      cols: 1,
      title: 'Apple Krumb'
    },
    {
      img: require('../../assets/bavarian_kreme.jpeg'),
      rows: 1,
      cols: 1,
      title: 'Bavarian Kreme'
    },
    {
      img: require('../../assets/blueberry.jpeg'),
      rows: 1,
      cols: 1,
      title: 'Blueberry'
    },
    {
      img: require('../../assets/boston_kreme.jpeg'),
      rows: 1,
      cols: 1,
      title: 'Boston Kreme'
    },
    {
      img: require('../../assets/chocolate_frosted.jpeg'),
      rows: 1,
      cols: 1,
      title: 'Chocolate Frosted'
    },
    {
      img: require('../../assets/chocolate_glaze.jpeg'),
      rows: 1,
      cols: 1,
      title: 'Chocolate Glaze'
    },
    {
      img: require('../../assets/marble_frosted.jpeg'),
      rows: 1,
      cols: 1,
      title: 'Marble Frosted'
    },
    {
      img: require('../../assets/cinnamon_sugar.jpeg'),
      rows: 1,
      cols: 1,
      title: 'Cinnamon Sugar'
    },
    {
      img: require('../../assets/old_fashioned.jpeg'),
      rows: 1,
      cols: 1,
      title: 'Old Fashioned'
    },
    {
      img: require('../../assets/original_glaze.jpeg'),
      rows: 1,
      cols: 1,
      title: 'Original Glaze'
    },
    {
      img: require('../../assets/powdered_sugar.jpeg'),
      rows: 1,
      cols: 1,
      title: 'Powdered Sugar'
    },
    {
      img: require('../../assets/cruller.jpeg'),
      rows: 1,
      cols: 1,
      title: 'Cruller'
    },
    {
      img: require('../../assets/sour_cream.jpeg'),
      rows: 1,
      cols: 1,
      title: 'Sour Cream'
    },
    {
      img: require('../../assets/strawberry_frosted.jpeg'),
      rows: 1,
      cols: 1,
      title: 'Strawberry Frosted'
    },
    {
      img: require('../../assets/vanilla_frosted.jpeg'),
      rows: 1,
      cols: 1,
      title: 'Vanilla Frosted'
    },
    {
      img: require('../../assets/coconut.jpeg'),
      rows: 1,
      cols: 1,
      title: 'Coconut'
    },
    {
      img: require('../../assets/jelly.jpeg'),
      rows: 1,
      cols: 1,
      title: 'Jelly'
    },
    {
      img: require('../../assets/chocolate_kreme.jpeg'),
      rows: 1,
      cols: 1,
      title: 'Chocolate Kreme'
    }
  ];
function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" to="https://mui.com/">
          Dronuts Group 3
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
const theme = createTheme();

export interface newCustomer {
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string, 
    password: string,
    address: Array<LocationInterface>
}



export function CustomerSignUp() {
    
    const [customerId, setCustomerId] = React.useState(0);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastname, setLastName] = React.useState("");
    const [street, setStreet] = React.useState("");
    const [state, setState] = React.useState("");
    const [city, setCity] = React.useState("");
    const [zipcode, setZipcode] = React.useState("");
    const [phone, setPhoneNumber] = React.useState("");

    async function handleSubmit(){
        
        const customer = {
            "first_name": firstName,
            "last_name": lastname,
            "email": email,
            "password": password,
            "phone_number": phone,
            "addresses": {
                "street_address": street,
                "city": city,
                "state": state,
                "zipcode": zipcode,
            }
        };
        const response = fetch('/customers', {
            method: 'POST',
            body: JSON.stringify(customer),
            headers: {"Content-Type": "application/json"}
        });

        const json = (await response).json().then(function(result){
            console.log("result: ",result._id);
            const { customerId} =  result._id;
            setCustomerId(customerId);
        });
        console.log(customerId);

    }
    
    return(
        <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Box
        bgcolor="background"
        display="flex"
        sx={{
          pt: 8,
          pb: 6
        }}
        >
        <Container maxWidth="xl">
          <ImageList variant="quilted" cols={18}>
            {itemData.map((item) => (
              <ImageListItem key={item.img} cols={item.cols} rows={item.rows}>
                <img src={item.img} alt={item.title} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        </Container>
      </Box>
      <Container maxWidth = "xs">
      <Avatar alt="Dronut" src={DronutIcon}/>
          <Typography component="h1" variant="h5">Sign Up</Typography>
          <Box component="form" noValidate>
              <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                    autoComplete='given-name'
                    name='firstName'
                    required
                    fullWidth
                    id='firstName'
                    label='First Name'
                    onChange={e=>setFirstName(e.target.value)}/>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                    autoComplete='family-name'
                    name='lastName'
                    required
                    fullWidth
                    id='LastName'
                    label='Last Name'
                    onChange={e=>setLastName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} >
                    <TextField 
                    autoComplete='new-password'
                    name='password'
                    required
                    fullWidth
                    type="password"
                    id='password'
                    label='Password'
                    onChange={e=>setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} >
                    <TextField 
                    autoComplete='email'
                    name='email'
                    required
                    fullWidth
                    id='email'
                    label='Email'
                    onChange={e=>setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} >
                    <TextField 
                    autoComplete='phone'
                    name='phoone'
                    required
                    fullWidth
                    id='phone'
                    label='Phone Number'
                    onChange={e=>setPhoneNumber(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} >
                    <TextField 
                    autoComplete='street-name'
                    name='street'
                    required
                    fullWidth
                    id='street'
                    label='Street Address'
                    onChange={e=>setStreet(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} >
                    <TextField 
                    autoComplete='city'
                    name='city'
                    required
                    fullWidth
                    id='city'
                    label='City'
                    onChange={e=>setCity(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} >
                    <TextField 
                    autoComplete='state'
                    name='state'
                    required
                    fullWidth
                    id='state'
                    label='State'
                    onChange={e=>setState(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} >
                    <TextField 
                    autoComplete='zipcode'
                    name='zipcode'
                    required
                    fullWidth
                    id='zipcode'
                    label='Zipcode'
                    onChange={e=>setZipcode(e.target.value)}
                    />
                  </Grid>
              </Grid>
              <Grid>
              <Button
              type='submit'
              fullWidth
              variant='contained'
              component={Link}
              to={'/customer'}
              onClick={() => handleSubmit()}
              >
                  Sign Up
              </Button>
              </Grid>
          </Box>


      </Container>
      <Container maxWidth="xl">
          <ImageList variant="quilted" cols={18}>
            {itemData.map((item) => (
              <ImageListItem key={item.img} cols={item.cols} rows={item.rows}>
                <img src={item.img} alt={item.title} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        </Container>
        <Copyright/>
      </Grid>
    );
}

// console.log("customer id: ", customerId);
// export {customerId}