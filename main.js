var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send("hell Hackathon");
})

app.listen(3000, function() {
  console.log('Connected, 3000port!!');
});
