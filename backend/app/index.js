const createError = require('http-errors')

//middlewares
const { verifyAccessToken } = require('./helpers/jwt_helper')
const AuthRoute = require('./Auth/Auth.route')
const UserRoute = require('./User/User.route')
const LeadsRoute = require('./Leads/Leads.route')

require('./helpers/init_mongodb')
require('./helpers/init_redis')

//app init
var init = function(app, port) {
    //default route
    app.get('/', (req, res) => {
        res.json(`App server running on port: ${port}!`)
    });
      
    //login | logout | JWT routes
    app.use('/api/auth', AuthRoute);

    //========= Protected Routes with JWT Middleware (jwtProtected) =========\\
    //user routes
    app.use('/api/user', verifyAccessToken('supper_admin'), UserRoute);
    
    //leads routes
    app.use('/api/leads', verifyAccessToken('staff'), LeadsRoute);
    
    //handle not found error, 404
    app.use(async (req, res, next) => {
        next(createError.NotFound())
    })
    
    //handle server side error, 500
    app.use((err, req, res, next) => {
        console.error(err);
        
        res.status(err.status || 500)
        res.send({
            error: {
            status: err.status || 500,
            message: err.message,
            },
        })
    })
}

module.exports = init;
