
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var credentials = require('./credentials.js');
var request = require('request');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.use(express.static('public'));

app.get('/',function(req,res){
  var context = {};
  request('https://api.bls.gov/publicAPI/v2/timeseries/data/CXUFOODHOMELB1104M' , handleGet);

  function handleGet(err, response, body){
    if(!err && response.statusCode < 400){
      context.bls = body;
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
