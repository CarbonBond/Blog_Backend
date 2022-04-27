var md = require('markdown-it')();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

//Create new post
let createPost = async (req, res, next) => {

  try {

    mdResult = md.render( req.body.content )

    const createPost = await prisma.post.create({
      data: {
        content: mdResult,
        published: req.body.isPublic,
        title: req.body.content,
        published: req.body.published,
        author: {
          connect: { user_id:req.user.user_id }
        },
        categories: {
          connect: req.body.categories
        }
      }
  
    })
  
    res.status(200);
    res.json(createPost.post_id)
    return
  } catch (err) {
    res.send(err)
  }
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

let getUnpublishedPost = async (req, res, next) => {

  try {

    const post = await prisma.post.findUnique({
      where: {
        post_id: parseInt(req.params.id)
      }, 
      rejectOnNotFound: true
    })

    res.send(post)
    return;
    
  } catch (err) {
    res.status(500)
    res.send(err)
  }

}


let getPost = async (req, res, next) => {

  try {

    const post = await prisma.post.findUnique({
      where: {
        post_id: parseInt(req.params.id)
      }, 
      rejectOnNotFound: true
    })

    if (!post.published) {
      res.status(501)
      res.send('Post not published')
      return
    }
    res.send(post)
    return;
    
  } catch (err) {
    res.status(404)
    res.send(`Post not found`)
  }

}


let updatePost = async (req, res, next) => {


  try {

    mdResult = md.render( req.body.content )

    const post = await prisma.post.update({
      where: {
        post_id: parseInt(req.params.id)
      },
      data: {
        content: mdResult,
        published: req.body.published,
        title: req.body.title,
        categories: {
          connect: req.body.categories
        }
      }
    })
  } catch (err) {
    res.status(404)
    res.send(err)
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
  
module.exports = { createPost, getAllPosts, getPost, deletePost, updatePost, getUnpublishedPost};
