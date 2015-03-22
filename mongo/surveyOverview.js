module.exports = function(app) {
    
    app.get('/list/overview', function(req, res) {

            res.render('surveyOverview.jade', {
                survey: res
            })
    })
}