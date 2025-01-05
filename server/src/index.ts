import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from server');
})

app.listen(8080, () => {
  console.log('server listening on port 8080');
});