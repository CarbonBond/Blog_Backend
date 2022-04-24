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


  if(
    typeof req.body.title === 'undefined' 
    && typeof req.body.content === 'undefined'
    && typeof req.body.isPublic === 'undefined'
    && typeof req.body.categories === 'undefined'
    ) {
    res.status(406);
    res.send("Server Error");
    return;
  }
  
  const createPost = await prisma.user.update({
    where: {
      user_id: req.user.user_id
    },
    data: {
      posts: {
        create: {
          content: req.body.title,
          published: req.body.isPublic,
          title: req.body.content,
          categories: {
            connect: req.body.categories
          }
        }
      }
    }

  })

  res.status(200);
  res.send(createPost)
  return;

});

module.exports = router;
