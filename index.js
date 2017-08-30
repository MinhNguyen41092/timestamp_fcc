"use strict"

const express = require('express');
const path = require('path');
const moment = require('moment');
const app = express();
// __dirname: native Node variable which contains the path of the current folder.
app.use(express.static(path.join(__dirname, 'public')));
app.route('/').get((req, res) => {
  res.sendFile(process.cwd() + '/public/index.html');
});

app.get('/:query', (req, res) => {
  const date = req.params.query;
  let processedDate = {
    "unix": null,
    "natural": null
  }
  if(isNaN(date) && moment(date, "MMMM D, YYYY").isValid()) {
    processedDate.unix = moment(date, "MMMM D, YYYY").format("X");
    processedDate.natural = date;
  } else if(date >= 0) {
    processedDate.unix = date;
    processedDate.natural = moment.unix(date).format("MMMM D, YYYY")
  } else {
    processedDate = {"error": "invalid input"};
  }
  res.send(processedDate);
});
// process.env.PORT: heroku port
app.listen(process.env.PORT || 3000);
