import { Request, Response } from 'express';
import express from 'express';
import * as path from 'path';

import mockResorts from './mock-data/resorts';
import mockCountries from './mock-data/countries';
type callback = (argument?: any) => void;

function requireHTTPS(req: Request, res: Response, next: callback): void {
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
    return res.redirect('https://' + req.get('host') + req.url);
  }

  next();
}

const app = express();
app.use(requireHTTPS);

const pathToDist = path.join(__dirname, '..', 'dist', 'skiscraper-front');

app.use(express.static(pathToDist));

app.get('/api/resorts', (req: Request, res: Response) => res.send(mockResorts));

app.get('/api/countries', (req: Request, res: Response) =>
  res.send(mockCountries)
);

app.get('/*', (req: Request, res: Response) => {
  res.sendFile('index.html', { root: pathToDist });
});

const port = process.env.PORT || 8080;

console.log(`Listening on port ${port}`);

app.listen(port);
