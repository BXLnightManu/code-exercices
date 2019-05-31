const express = require('express');
const app = express();
const url = require('url');
const port = 3000;

app.get('/', (request, response) => {
  response.send('Bienvenue sur Express');
});

app.get('/api/movies', (request, response) => {
    response.send('All films');
});

app.get('/api/movies/:movieId', (request, response) => {
  const movieId = request.params.movieId;
  response.json({ id: movieId});
});

app.get('/api/employee', (request, response) => {
  response.sendStatus(304);
});

app.get('/api/employee', (request, response) => {
  const name = request.query.name;
  response.status(404).send(`Unable to retrieve employee ${name}`);
});

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});