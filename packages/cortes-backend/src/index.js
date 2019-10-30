const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Cortes backend int'));

app.listen(port, () => console.log(`Cortes backend app listening on port ${port}!`));
