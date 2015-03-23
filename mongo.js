var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// dburl to a mongodb server hosted in the cloud (i.e., mongolab)
var dburl = 'mongodb://cyberbullying:1234@ds041140.mongolab.com:41140/cyberbullying';
var survey = require('./data/survey.json');

// get db
var db = require('monk')(dburl);

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// set the database
app.db = db;

// use jade as the view engine
app.set('view engine', 'jade');


app.get('/surveys', function (req, res) {
    res.redirect('survey/0')
});

app.get('/survey/:index', function(req, res) {
    var index = parseInt(req.params.index);
    if (index >= 0 && index < survey.length)
    {
        var item = survey[req.params.index];
        res.render('listSurvey.jade', {
            item: item,
            next: parseInt(req.params.index) + 1
        })
    } else {
        res.redirect('/surveys')
    }
});


app.get('/list/overview', function(req, res) {
    res.render('surveyOverview.jade')
});


app.get('/list/results', function(req, res) {
    var result = app.db.get('responses');

    result.find({},{}, function(err, res1) {
        res.render('surveyResults.jade', {
            surveyRes: res1
        })
    })

});

app.post('/results', function (req, res) {
    var responsesCollection = db.get('responses');
    responsesCollection.insert(req.body);
    res.send('done');
});

// set where the static contents are (e.g., css, js)
app.use(express.static(__dirname + '/public'));

var server = app.listen(app.get('port'), function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port)
});