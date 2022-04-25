var express = require('express');
var router = express.Router();

const post = require('./post')
const category = require('./category.js')

// Create Post
router.post('/post/new', post.createPost)

// Get all Post
router.get('/posts', post.getAllPosts)

// Get one Post
router.get('/post/:id', post.getPost)

// Update one Post
router.put('/post/:id', post.updatePost)

// Delete one Post
router.delete('/post/:id', post.deletePost)


// Create Category
router.post('/category/new', category.createCategory)

// Get all Categories
router.get('/categories', category.getAllCategories)

// Get one Category
router.get('/category/:id', category.getCategory)

// Update Category 
router.put('/category/:id', category.updateCategory )

// Delete Categoty
router.delete('/category/:id', category.deleteCategory)

// Get User Logged in
router.get('/user', function(req, res, next) {
  res.send(req.user);
});



module.exports = router;
