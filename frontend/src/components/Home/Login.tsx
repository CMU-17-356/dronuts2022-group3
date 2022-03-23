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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DronutIcon from '../../assets/dronut.png'
import { Label } from '@mui/icons-material';
import Alert from '@mui/material/Alert';
import { useEffect } from 'react';


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

function ErrorAlert(props) {
    return <Alert elevation={6} variant="filled" {...props} />;
  }
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

export interface customerInfo {
  _id: string, 
  email: string, 
  password: string
}
const loggedUser: customerInfo = {_id: "", email: "", password: ""};
export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, setUser] = React.useState<customerInfo>({
    _id: " ",
    email: " ",
    password: " "
  })

  const handleChange =
    (prop: keyof customerInfo) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUser({ ...user, [prop]: event.target.value });
    };


  async function handleSubmit(){
  try{
    const response = await fetch('/customers').then((res) => res.json());
    await Promise.all(
        response.map(async (customer)=>{
          if (customer.email == user.email && customer.password == user.password){
            console.log("customer: ", customer);
            loggedUser._id = customer._id;
            loggedUser.email = customer.emial;
            loggedUser.password = customer.password;
            console.log(loggedUser);
          }
        })
      )}
      catch(e){
        console.log(e);
      }
  }


  return (
    <ThemeProvider theme={theme}>
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
        <Grid container style={{
            display:"flex",
            justifyContent: "center"}} 
            component={Paper} square >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar alt="Dronut" src={DronutIcon}/>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate  sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange("email")}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange("password")}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                component={Link}
                to={'/customer'} 
                fullWidth
                variant="contained"
                onClick={() =>handleSubmit()}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                   <Link to={{pathname:"#"}}>Forgot Password?</Link>
                </Grid>
                <Grid item>
                <Link to={{pathname:"#"}}>Don't have an account? Sign Up!</Link>
                </Grid>
              </Grid>
            </Box>
            
          </Box>
        </Grid>
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
      
    </ThemeProvider>
  );
}

export { loggedUser }