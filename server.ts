const express = require('express');
const path = require('path');

function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
    return res.redirect('https://' + req.get('host') + req.url);
  }

  next();
}

const app = express();
app.use(requireHTTPS);

const pathToDist = path.join(__dirname, 'dist', 'heroku1');

app.use(express.static(pathToDist));

app.get('/*', (req, res) => {
  res.sendFile('index.html', {root: pathToDist});
});

const port = process.env.PORT || 8080;

console.log(`Listening on port ${port}`);

app.listen(port);
