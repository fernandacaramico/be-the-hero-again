const express = require('express'); // pacote, sem /
const cors = require('cors');
const routes = require('./routes') //  ./ porque é arquivo irmão

const app = express();

app.use(cors());

/*
Se em producao:

app.use(cors({
  origin: "http://meuapp.com"
})); 
*/

app.use(express.json());

app.use(routes); // arqui estava o app.get

app.listen(3333);