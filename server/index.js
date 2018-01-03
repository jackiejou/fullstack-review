const express = require('express');
let app = express();
const db = require('../database/index.js');
const getRepo = require('../helpers/github.js').getReposByUsername;
const bodyParser = require('body-parser');
const cool = require('cool-ascii-faces');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/repos', function (req, res) {
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  getRepo(req.body['username'], (results) => {
    db.save(JSON.parse(results));
    res.redirect('/repos');
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.get((data) => {
    res.json(data);
  });
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

let port = process.env.PORT;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
