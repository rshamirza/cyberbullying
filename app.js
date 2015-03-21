var express = require('express')
var app = express()

var _ = require('lodash')

var cb = require('./data/cb.json')
 
app.use(express.static(__dirname + '/public'));

// Read the file and send to the callback
 // Write the callback function
app.set('view engine', 'jade');

// set where the static contents are (e.g., css, js)
app.use(express.static(__dirname + '/public'));


app.get('/survey/questions', function(req, res) {
    res.render('cbSurvey.jade', {
        cb: cb
    })
})


app.get('/survey/next/:profile_owner_id', function(req, res) {
    
    var item =_.find(cb, { 'profile_owner_id': req.params.profile_owner_id })
    res.render('surveyItem.jade', {
        item: item,
    })
})


var server = app.listen(3000, function() {

    var host = server.address().address
    var port = server.address().port

    console.log('App listening at http://%s:%s', host, port)
})
