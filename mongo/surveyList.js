module.exports = function(app) {
    
    app.get('/list/survey', function(req, res) {

            res.render('listSurvey.jade', {
                survey: res
            })
    })
}