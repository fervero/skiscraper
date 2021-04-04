import express from 'express';

import { resorts } from './resorts';
import { countries } from './countries';
import { index } from './index';
import { middleware } from './middleware';

const app = express();

for (const fn of middleware) {
  app.use(fn);
}

app.get('/api/resorts', resorts);
app.get('/api/countries', countries);
app.get('/*', index);

const port = process.env.PORT || 8080;

console.log(`Listening on port ${port}`);

app.listen(port);
