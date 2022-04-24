const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
require('dotenv').config()


passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, 
    async function (email, password, cb) {

//this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
    
    const user = await prisma.user.findUnique({
        where: {
        email: email
        }
    })
    
    if (!user) return cb(null, false, {message: 'Incorrect email or password.'});
    

    bcrypt.compare(password, user.password).then(function(matchingPass) {
        if(!matchingPass) return cb(null, false, {message: 'Incorrect email or password.'});
    
        return cb(null, user, {message: 'Logged In Successfully'});
    });

    return cb(err);
}));


passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.SECRET
},
async function (jwtPayload, cb) {

    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    const user = await prisma.user.findUnique({
        where: {
        user_id: jwtPayload.id
        }
    })
    if (user) return cb(null, user);

    return cb(err);
}
));