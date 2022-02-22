import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send('Hello Group 3! - Riccardo Santoni');
});

app.listen(port, () => {
  console.log(`Dronuts listening on localhost:${port}`);
});