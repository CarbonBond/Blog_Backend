
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

const { buildSearchObject } = require('./utility')

//Create new Category
let createCategory = async (req, res, next) => {
  
  if(
    typeof req.body.name === 'undefined' 
    ) {
    res.status(406);
    res.send("Server Error");
    return;
  }
  
  const createCategory = await prisma.category.create({
    data: {
      name: req.body.name
    }
  })

  res.status(200);
  res.json(createCategory.category_id)
}

let getAllCategories = async (req, res, next) => {


  try{

    searchObject = req.query;

    if( searchObject.search && typeof searchObject.search.id !== undefined) {
      searchObject.search.category_id =  searchObject.search.id;
      delete  searchObject.search.id;
    }

    if(searchObject.limit && typeof searchObject.where.id !== undefined) {
      searchObject.limit.category_id =  searchObject.limit.id;
      delete  searchObject.limit.id;
    }


    let searchQuery = buildSearchObject(searchObject)

    const allCategories = await prisma.category.findMany(searchQuery)

    res.send(allCategories)
    return;

  }
  catch(err) {

    res.status(500)
    res.send(`Categories not found: ${err}` )
  }
}

let getCategory = async (req, res, next) => {

  try {
    const category = await prisma.category.findUnique({
      where: {
        category_id: parseInt(req.params.id)
      },
      rejectOnNotFound: true

    })
    res.send(category)
    return;

  } catch (err) {
    res.status(404)
    res.send('Category not found')
  }

}


let updateCategory = async (req, res, next) => {


  try {
    const category = await prisma.category.update({
      where: {
        category_id: parseInt(req.params.id)
      },
      data: {
        name: req.body.name,
        category_id: req.body.category_id
      }
    })
  } catch {
    res.status(500)
    res.send('Server Error')
    return;
  }

  res.status(200)
  res.send('updated')
}

let deleteCategory = async (req, res, next) => {
  try {
    const category = await prisma.category.delete({
      where: {
        category_id: parseInt(req.params.id)
      }
    })

    res.status(200)
    res.send('Deleted')

  } catch {
    res.status(404)
    res.send('Category not found')
    return;
  }

}
  
module.exports = { createCategory, getAllCategories, getCategory, deleteCategory, updateCategory};
