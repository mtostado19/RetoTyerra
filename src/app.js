const express = require('express');

const cors = require('cors');

const app = express();

app.set('port', process.env.PORT || 4000);
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

//APIS
app.use('/api/usuario', require('./routes/routes_usuario.js'));
app.use('/api/archivo', require('./routes/routes_archivo.js'));

module.exports = app;
