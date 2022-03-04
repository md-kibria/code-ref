const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('./models/User')

const opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'SECRET'

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (payload, done) => {
        User.findOne({_id: payload._id})
            .then(user => {
                if (!user) {
                    return done(null, false)
                } else {
                    return done(null, user)
                }
            })
            .catch(error => {
                console.log(error)
                return done(error)
            })
    }))
}






/* Async Await */


// External Imports
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

// Interanal Improts
const User = require('../models/User')

// Options
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'SECRET'

module.exports = passport => {
    passport.use(new JwtStrategy(opts, async (payload, done) => {
        try {
            // Find the user with id
            let user = await User.findOne({ _id: payload._id })

            // If user exist
            if (user) {
                return done(null, user)
            } else {
                // If user not exist
                return done(null, false)
            }
        } catch (error) {
            // If error occured
            return done(error, false)
        }
    }))
}