const bcrypt = require('bcryptjs');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

passport.use(new LocalStrategy( 
    async function (email, password, cb) {
  
    const user = await prisma.user.findUnique({
        where: {
        email: email
        }
    })
  
    if (!user) return cb(null, false, {message: 'Incorrect email or password.'});
    
  
    bcrypt.compare(password, user.password).then(function(matchingPass) {
        if(!matchingPass) return cb(null, false, {message: 'Incorrect email or password.'});
    
        return cb(null, user, {message: 'Logged In Successfully'});
    }).catch((err) => {console.error(err)});
  
    }
  ));
  
  
  passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey : process.env.SECRET
    },
    async function (jwtPayload, cb) {
  
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        try {const user = await prisma.user.findUnique({
            where: {
            user_id: jwtPayload.id
            }
        }) } catch(err) { console.log(err) }
        if (user) return cb(null, user);
  
        return cb(err);
    }
  ));