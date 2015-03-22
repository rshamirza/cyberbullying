var express = require('express');
var Qs = require('qs');
var app = express();

// dburl to a mongodb server hosted in the cloud (i.e., mongolab)
var dburl = 'mongodb://cyberbullying:1234@ds041140.mongolab.com:41140/cyberbullying';
var survey = require('./data/survey.json');

// get db
var db = require('monk')(dburl);
// set the database
app.db = db;

// use jade as the view engine
app.set('view engine', 'jade');


app.get('/list/survey', function(req, res) {
    res.render('listSurvey.jade', {
        survey: survey
    })
});

app.get('/list/overview', function(req, res) {
    res.render('surveyOverview.jade', {
        survey: survey
    })
});

app.post('/results/:params', function (req, res) {
    var responsesCollection = db.get('responses');
    var paramsObject = Qs.parse(req.params.params);
    responsesCollection.insert(paramsObject);
});

// set where the static contents are (e.g., css, js)
app.use(express.static(__dirname + '/public'));



var server = app.listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port)
});