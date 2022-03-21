import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface DonutInterface {
  _id: string;
  flavor: string;
  price: number;
}

export function Donut() {
  const { id } = useParams();
  const [donut, setDonut] = React.useState<DonutInterface>({
    _id: 'dummy',
    flavor: 'error',
    price: 69
  });
  async function fetchDonut() {
    try {
      const response = await fetch('/donuts/' + id).then((res) => res.json());
      setDonut(response);
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    fetchDonut();
  }, []);

  const handleChange =
    (prop: keyof DonutInterface) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDonut({ ...donut, [prop]: event.target.value });
    };

  let navigate = useNavigate();

  async function updateDonut() {
    try {
      const response = await fetch('/donuts/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donut)
      }).then((res) => res.json());
    } catch (e) {
      console.error(e);
    }
    navigate('/employee/donuts');
  }

  return (
    <>
      <Typography variant="h2" align="center" color="text.primary" paragraph>
        {donut.flavor}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-flavor">Flavor</InputLabel>
          <OutlinedInput
            id="outlined-adornment-flavor"
            placeholder={donut.flavor}
            onChange={handleChange('flavor')}
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            label="Flavor"
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            placeholder={donut.price.toString()}
            onChange={handleChange('price')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>
        <Button variant="outlined" color="secondary" onClick={updateDonut}>
          Update Donut
        </Button>
      </Box>
    </>
  );
}

export default DonutInterface;
