import express from 'express';

const app = express()
const port = 3000;

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', { title: 'cortes-interface', message: 'Cortes Interface' });
});

app.get('/createProject', (req, res) => {
  res.render('createProject');
});

app.get('/listProjects', (req, res) => {
  res.render('listProjects');
});

app.listen(port, () => console.log(`cortes-interface app listening on port ${port}!`))