const express = require('express');
const path = require('path');

const mockResorts = require('./mock-data/resorts');
const mockCountries = require('./mock-data/countries');

function requireHTTPS(req, res, next): void {
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
    return res.redirect('https://' + req.get('host') + req.url);
  }

  next();
}

const app = express();
app.use(requireHTTPS);

const pathToDist = path.join(__dirname, 'dist', 'skiscraper-front');

app.use(express.static(pathToDist));

app.get('/api/resorts', (req, res) => res.json(mockResorts));
app.get('/api/countries', (req, res) => res.json(mockCountries));

app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: pathToDist });
});

const port = process.env.PORT || 8080;

console.log(`Listening on port ${port}`);

app.listen(port);
