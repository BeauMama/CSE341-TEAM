const express = require('express');
const bodyParser = require('body-parser')
const mongodb = require("./db/connect");
const MongoClient = require('mongodb').MongoClient;
const professionalRoute = require('./routes/professional')

const port = process.env.PORT || 8080;
const app = express();

app.get('/api/data', (req, res) => {
  res.json(data);
});

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/professional', professionalRoute);


mongodb.initDb((err, mongodb ) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});