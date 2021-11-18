// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


app.get('/api/:dateString?', (req, res) => {
  const dateString = req.params.dateString;
  let date;
  // if dateString is empty it should be the same to new Date() and return the current time stamp
  if (!dateString) {
    date = new Date();
  } else {
    // if dateString is not an integer convert it
    // if dateString is not empty
    if (!isNaN(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
    }
  }

// api returns error if the date is invalid
if (date.toString() === "Invalid Date") {
  res.json({ error: date.toString() });
} else {
  // if the date is valid the api returns the date in the JSON with the format of the example output
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
}
});