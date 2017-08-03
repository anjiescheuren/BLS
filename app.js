var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'home'});
// var credentials = require('./credentials.js');
var request = require('request');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.use(express.static('public'));

app.get('/',function(req,res){
  var context = {};
  request('https://api.bls.gov/publicAPI/v2/timeseries/data/CXUFOODHOMELB1104M/?registrationkey=93473584286844d3a1de874ae04afda5&startyear=2015&endyear=2015' , handleGet);

  function handleGet(err, response, body){
    if(!err && response.statusCode < 400){
      context.bls = body;
      body=JSON.parse(body);
      res.send("The year is " + body.Results.series[0].data[0].year + ". The value is " + body.Results.series[0].data[0].value + ".");
    } else {
      console.log(err);
      console.log(response.statusCode);
    }
  }

});

app.get('/',function(req,res){
  var context = {};
  request({
        "url":"http://api.bls.gov/publicAPI/v2/timeseries/data/",
        "method":"POST",
        "headers":{
          "Content-Type":"application/json"
        },
        "body":{"seriesid":["CXUFOODHOMELB1104M", "CXUAPPARELLB0216M" ],
        "registrationkey":"93473584286844d3a1de874ae04afda5"}
      }, handlePost)

  function handlePost(err, response, body){
    if(!err && response.statusCode < 400){
      context.bls = body;
      // res.send(body);
  res.render('home', context);
    } else {
      console.log(err);
      console.log(response.statusCode);
    }
  }
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
