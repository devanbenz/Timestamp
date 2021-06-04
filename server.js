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

const matchDate = new RegExp('([0-9][0-9][0-9][0-9])-((0?[1-9])|(1[0-2]))-(0[1-9]$|1[0-9]$|2[0-9]$|3[0-1]$)')

app.get('/api/:date', (req, res) => {
  const { date } = req.params
  const utcTime = new Date(date).toUTCString()

  if(matchDate.test(date)) {
    res.status(200).json({'unix': Date.parse(date),'utc': utcTime})
  
  }else if(Number(date) >= 0){
    const unixUtcTime = new Date(Number(date)).toUTCString()
    res.status(200).json({'unix': Number(date), 'utc': unixUtcTime})
  
  }else{
    res.status({error: 'Invalid Date'})
  }
})

app.listen(process.env.PORT || 8080, ()=> console.log(`listening on ${process.env.PORT}`))