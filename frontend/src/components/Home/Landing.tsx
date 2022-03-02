import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import * as React from 'react';
import LandingImg from '../../assets/DronutLogo.png';
import { Link } from 'react-router-dom';

const itemData = [
  {
    img: require('../../assets/apple_krumb.jpeg'),
    rows: 2,
    cols: 2,
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
    rows: 2,
    cols: 2,
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
    rows: 2,
    cols: 2,
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

export default function Landing() {
  return (
    <>
      <Box
        bgcolor="background"
        display="flex"
        sx={{
          pt: 8,
          pb: 6
        }}
      >
        <Container maxWidth="lg">
          <Box
            m="auto"
            component="img"
            alt="Dronuts"
            alignItems="center"
            justifyContent="center"
            src={LandingImg}
          />
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Donuts delivered to your doorstep by drones!
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button component={Link} to={'/customer'} variant="contained">
              Order Now
            </Button>
          </Stack>
        </Container>
      </Box>
      <Box
        bgcolor="background"
        display="flex"
        sx={{
          pt: 8,
          pb: 6
        }}
      >
        <Container maxWidth="lg">
          <ImageList variant="quilted" cols={4}>
            {itemData.map((item) => (
              <ImageListItem key={item.img} cols={item.cols} rows={item.rows}>
                <img src={item.img} alt={item.title} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        </Container>
      </Box>
    </>
  );
}
