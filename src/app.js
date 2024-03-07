const routes = require('./routes')
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: '*',
        credentials: true,
    })
);
app.use(routes);

module.exports = app;