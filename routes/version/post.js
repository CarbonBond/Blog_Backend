
var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

//Create new post
let createPost = async (req, res, next) => {
  
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
}

let getAllPosts = async (req, res, next) => {
  const allPosts = await prisma.post.findMany()

  if(allPosts) {
    res.send(allPosts)
    return;
  }
  
  res.status(500)
  res.send('Posts not found')
}

let getPost = async (req, res, next) => {
  const post = await prisma.post.findUnique({
    where: {
      post_id: parseInt(req.params.id)
    }
  })
  if(post) {
    res.send(post)
    return;
  }

  res.status(404)
  res.send('Post not found')
}


let updatePost = async (req, res, next) => {

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

  try {
    const post = await prisma.post.update({
      where: {
        post_id: parseInt(req.params.id)
      },
      data: {
        content: req.body.title,
        published: req.body.isPublic,
        title: req.body.content,
        categories: {
          connect: req.body.categories
        }
      }
    })
  } catch {
    res.status(404)
    res.send('Post not found')
    return;
  }

  res.status(200)
  res.send('updated')
}

let deletePost = async (req, res, next) => {
  try {
    const post = await prisma.post.delete({
      where: {
        post_id: parseInt(req.params.id)
      }
    })
  } catch {
    res.status(404)
    res.send('Post not found')
    return;
  }

  res.status(200)
  res.send('Deleted')
}
  
module.exports = { createPost, getAllPosts, getPost, deletePost, updatePost};
