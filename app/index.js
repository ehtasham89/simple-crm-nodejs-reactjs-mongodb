//app init
var init = function(app, port) {
    //default route
     app.get('/', (req, res) => {
        res.json(`App server running on port: ${port}!`)
    });
}

module.exports = init;