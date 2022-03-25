import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@mui/material';
import React, { useEffect } from 'react';
import DonutInterface from '../Dronut/Donut';
import { donutImages } from '../Dronut/donutImages';

interface DonutListProps {
  onClick: (donut: DonutInterface) => void;
  text: string;
}

export default function DonutList(props: DonutListProps) {
  const [donuts, setDonuts] = React.useState<Array<DonutInterface>>([]);
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
    <Grid container spacing={4}>
      {donuts.map((donut) => (
        <Grid item key={donut._id} xs={12} sm={6} md={4}>
          <Card id={`${donut.flavor}Card`}
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
                id={`${donut.flavor}AddBtn`}
                color="secondary"
                onClick={() => props.onClick(donut)}
                size="small"
              >
                {props.text}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
