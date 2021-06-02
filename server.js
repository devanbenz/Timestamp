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

app.get('/api/:date', (req, res) => {
  const { date } = req.params
  const uxTime = new Date(Number(date)).toUTCString()
  const utcTime = new Date(date).toUTCString()
  //const time = Date.parse(date)
  // if(!time && valid == true){
  //   res.json({
  //     'unix':date*1,
  //     'utc': new Date(Number(date)).toUTCString()
  //   })
  // }
  // else{
  //   res.json({
  //     'unix':time, 
  //     'utc': new Date(date).toUTCString()
  //   })
  // }
  res.json({'unix': uxTime, 'utc': utcTime})
})

// app.get('/api/:date?', (req, res) => {
//   res.json({query: req.query, params: req})
// })


app.listen(process.env.PORT , ()=> console.log(`listening on ${process.env.PORT}`))