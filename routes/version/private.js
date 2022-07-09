var express = require('express');
var router = express.Router();

const post = require('../../controller/post')
const category = require('../../controller/category.js')


// Get all Post
router.get('/post/', post.getAllPosts)

// Get one Post
router.get('/post/:id', post.getPost)

// Get Markdown Post
router.get('/post/:id/md', post.getMarkDownPost)


// Create Post
router.post('/post/new', post.createPost)

// Update one Post
router.put('/post/:id', post.updatePost)

// Delete one Post
router.delete('/post/:id', post.deletePost)

// Get all Categories
router.get('/categories', category.getAllCategories)

// Get one Category
router.get('/category/:id', category.getCategory)

// Create Category
router.post('/category/new', category.createCategory)

// Update Category 
router.put('/category/:id', category.updateCategory )

// Delete Categoty
router.delete('/category/:id', category.deleteCategory)




module.exports = router;
