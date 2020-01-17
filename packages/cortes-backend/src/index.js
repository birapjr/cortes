import express from 'express';
import processInput from './route/input.js';
import cote from 'cote';

const app = express();
const port = 3000;

const coteClient = new cote.Requester({ name: 'cortes backend requester' });

app.use((req, _, next) => {
  req.coteClient = coteClient;
  next();
})

app.get('/', (req, res) => {
  const msg = { type: 'query', what: 'calling from /'};
    req.coteClient.send(msg, (err, res) => {
      console.log(res);
    });
    processInput('some_path');
    return res.send('Cortes backend int');
});

app.listen(port, () => console.log(`Cortes backend app listening on port ${port}!`));
