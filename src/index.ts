import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

import insertProductsToEs from './handlers/products/insertProductsToEs';

dotenv.config();

const port = process.env.PORT || 4003;
const app = express();

app.use(bodyParser.json());


app.post('/export', insertProductsToEs);

app.listen(port, () => console.log(`server running... ${port}`));
