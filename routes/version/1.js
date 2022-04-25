var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const app = require('../../app');

const post = require('./post')

// Get all Post
router.get('/posts', post.getAllPosts)

// Get one Post
router.get('/post/:id', post.getPost)

// Update one Post
router.put('/post/:id', post.updatePost)

// Delete one Post
router.delete('/post/:id', post.deletePost)

// Create Post
router.post('/post/new', post.createPost)
// Delete Posts


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



module.exports = router;
