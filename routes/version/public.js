var express = require('express');
var router = express.Router();

const category = require('../../controller/category')
const post = require('../../controller/post')

// Get all Post
router.get('/post', post.getAllPosts)

// Get one Post
router.get('/post/:id', post.getPost)

// Get all Categories
router.get('/categories', category.getAllCategories)

// Get one Category
router.get('/category/:id', category.getCategory)

module.exports = router;
