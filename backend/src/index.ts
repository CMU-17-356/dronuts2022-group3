import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send('Hello Group 3! -Riccardo Santoni');
});

// app.get('/todos', (req, res) => {
//   res.status(200).send(fakeData);
// });

// app.post('/addTodo', (req, res) => {
//   console.log(req.body);
//   res.status(200).send('New Todo received!');
// });

app.listen(port, () => {
  console.log(`Todo-App listening on localhost:${port}`);
});