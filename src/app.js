require('dotenv').config();
const express = require('express');
const app = express();

app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );

/** rutas  */
app.use( require('./routes/routes') );


/** esportar el modulo app, para poderlo usar donde sea XD */
module.exports = app;