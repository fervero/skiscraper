import express from 'express';

import { resortsEndpoint } from './endpoints/resortsEndpoint';
import { countriesEndpoint } from './endpoints/countriesEndpoint';
import { indexEndpoint } from './endpoints/indexEndpoint';
import { middleware } from './middleware';
import { connect } from './sql-driver';

console.log('HELLO, WORLD!');

const app = express();

for (const fn of middleware) {
  app.use(fn);
}

console.log('Attempting connection to database');

connect()
  .then(() => console.log('Connected to database'))
  .catch(console.error);

app.get('/api/resorts', resortsEndpoint);
app.get('/api/countries', countriesEndpoint);
app.get('/*', indexEndpoint);

const port = process.env.PORT || 8080;

console.log(`Listening on port ${port}`);

app.listen(port);
