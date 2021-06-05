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
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/', (req ,res) => {
  const time = new Date()
  res.json({
    'unix': Date.parse(time),
    'utc': time.toUTCString()
  })
})

//const matchDate = new RegExp('([0-9][0-9][0-9][0-9])-((0?[1-9])|(1[0-2]))-(0[1-9]$|1[0-9]$|2[0-9]$|3[0-1]$)')

app.get('/api/:date', (req, res) => {
  let { date } = req.params
  let UnixUtcTime = new Date(Number(date))
  
  if(UnixUtcTime == 'Invalid Date'){
    UnixUtcTime = new Date(date)
    date = Date.parse(date)
  }

  res.status(200).json({
    'unix': Number(date),
    'utc': UnixUtcTime.toUTCString()
  })
})

app.listen(process.env.PORT || 8080, ()=> console.log(`listening on ${process.env.PORT}`))