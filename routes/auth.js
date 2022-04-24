const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");
require('dotenv').config()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/* POST login. */
router.post('/login', async function (req, res, next) {

    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user : user,
                err: err,
                info: info,
            });
        }

        req.login(user, {session: false}, (err) => {
            if (err) res.send(err);
            
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user, process.env.SECRET);
            return res.json({user, token});
        });

    })(req, res);
});

module.exports = router;
