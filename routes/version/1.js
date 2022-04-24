var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

/* GET users listing. */
router.get('/users', async function(req, res, next) {
  
  const allUsers = await prisma.user.findMany({
    select: {
      name: true,
      posts: true
    }
  })

  res.json(allUsers)
});

router.post('/newpost', async function(req, res, next) {

  

});

module.exports = router;
