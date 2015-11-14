var passport = require('passport'),
    mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    User = mongoose.model('User');

module.exports = function () {
    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({username:username}).exec(function(err, user) {
                if (err) { return done(err); }
                if(user && user.authenticate(password)) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Incorrect username / password'});
                }
            })
        }
    ));

    passport.serializeUser(function(user, done) {
        if(user) {
            done(null, user._id);
        }
    });
//only the user ID is serialized to the session,
// keeping the amount of data stored within the session small.
// When subsequent requests are received,
// this ID is used to find the user, which will be restored to req.user.
    passport.deserializeUser(function(id, done) {
        User.findOne({_id:id}).exec(function(err, user) {
            if(user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    })

}