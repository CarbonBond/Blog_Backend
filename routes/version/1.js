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

// Get User Logged in
router.get('/user', function(req, res, next) {
  res.send(req.user);
});



router.post('/newpost', async function(req, res, next) {

  res.send(req.user)
  const createPost = await prisma.user.update({
    where: {
      user_id: req.user.user_id
    },
    data: {
      posts: {
        create: {
          content: "This is the first post",
          published: true,
          title: "This is the title",
        }
      }
    }

  })

});

module.exports = router;
