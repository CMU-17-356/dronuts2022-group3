import express, { Application } from 'express';
import bodyParser from 'body-parser';
import Routes from './routes';
import mongoose from 'mongoose';

const app: Application = express();
const routes: Routes = new Routes(app);
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send('Hello Group 3! - Riccardo Santoni');
});

mongoose.connect('mongodb://localhost:27017/dronuts', {}, () => {
  console.log('connected to mongodb database')
});

app.listen(port, () => {
  console.log(`Dronuts listening on localhost:${port}`);
});