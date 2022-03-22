import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Snackbar,
  Typography
} from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DonutInterface from '../Dronut/Donut';
import DonutList from '../Dronut/DonutList';

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
const items: Array<DonutInterface> = [];

function Menu() {

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpen(false);
  };
  
  const [donuts, setDonuts] = React.useState<Array<DonutInterface>>([]);
  const [open, setOpen] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState("");

  
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

  function handleAddItem(item) {
    items.push(item);
    setSnackMessage(`Added ${item.flavor} donut to cart!`);
    setOpen(true);
  }

  return (
    <main>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {donuts.map((donut) => (
            <Grid item key={donut._id} xs={12} sm={6} md={4}>
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
                  <Typography id={`${donut.flavor}Card`} gutterBottom variant="h5" component="h2">
                    {donut.flavor}
                  </Typography>
                  <Typography>$ {donut.price}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    color="secondary"
                    onClick={() => handleAddItem(donut)}
                    size="small"
                    id={`${donut.flavor}AddBtn`}
                  >
                    Add to Cart
                  </Button>
                  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert id="addedAlert" onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {snackMessage}
                    </Alert>
                  </Snackbar>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Button
        id="continueToCart"
        color="secondary"
        component={Link}
        to={'/cart'}>
          Continue to Cart
      </Button>
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

export { items };
