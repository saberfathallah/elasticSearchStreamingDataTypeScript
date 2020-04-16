import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();

app.use(bodyParser.json());


app.get('/export', async (req, res) => {
  res.json({ saber: 'saber' });
});

app.listen(4007, () => console.log('server running... 4007'));
