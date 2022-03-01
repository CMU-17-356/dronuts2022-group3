import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Toolbar,
  Typography
} from '@mui/material';
import RestaurantMenuTwoToneIcon from '@mui/icons-material/RestaurantMenuTwoTone';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';

const donutImages = {
  'Apple Krumb': require('../../assets/apple_krumb.jpeg'),
  'Bavarian Kreme': require('../../assets/bavarian_kreme.jpeg'),
  Blueberry: require('../../assets/blueberry.jpeg'),
  'Boston Kreme': require('../../assets/boston_kreme.jpeg'),
  'Chocolate Frosted': require('../../assets/chocolate_frosted.jpeg'),
  'Chocolate Glaze': require('../../assets/chocolate_glaze.jpeg'),
  'Cinnamon Sugar': require('../../assets/cinnamon_sugar.jpeg'),
  'Marble Frosted': require('../../assets/marble_frosted.jpeg'),
  'Old Fashioned': require('../../assets/old_fashioned.jpeg'),
  'Original Glaze': require('../../assets/original_glaze.jpeg'),
  'Powdered Sugar': require('../../assets/powdered_sugar.jpeg'),
  'Sour Cream': require('../../assets/sour_cream.jpeg'),
  'Strawberry Frosted': require('../../assets/strawberry_frosted.jpeg'),
  'Vanilla Frosted': require('../../assets/vanilla_frosted.jpeg'),
  Coconut: require('../../assets/coconut.jpeg'),
  Cruller: require('../../assets/cruller.jpeg'),
  Jelly: require('../../assets/jelly.jpeg'),
  'Chocolate Kreme': require('../../assets/chocolate_kreme.jpeg')
};

export interface Donut {
  id: string;
  flavor: string;
  price: number;
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

function Menu() {
  const [donuts, setDonuts] = React.useState<Array<Donut>>([]);

  async function fetchDonuts() {
    try {
      const response = await fetch('/donuts').then((res) => res.json());
      setDonuts(response);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchDonuts();
  }, []);

  return (
    <main>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {donuts.map((donut) => (
            <Grid item key={donut.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <CardMedia
                  component="img"
                  image={donutImages[donut.flavor]} // require image
                  alt="donut"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {donut.flavor}
                  </Typography>
                  <Typography>$ {donut.price}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    color="secondary"
                    component={Link}
                    to={'/cart'}
                    size="small"
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}

export default function CustomerMenu() {
  return (
    <>
      <CssBaseline />
      <Menu />
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Dronuts Group 3 2022
        </Typography>
        <Copyright />
      </Box>
    </>
  );
}
