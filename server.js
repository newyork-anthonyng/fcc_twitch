'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const request = require('request');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.json({ SUCCESS: true });
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Twitch.tv -- Express server running...');
});
