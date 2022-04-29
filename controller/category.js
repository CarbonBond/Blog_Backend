
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

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
  
    let searchQuery = {}


    if( req.query !== {} ) { 

      if(typeof req.query.search !== 'undefined') {
        searchQuery.where = {};
        for (const property in req.query.search) {
          if(property === "id") {
            searchQuery.where['category_id'] = parseInt(req.query.search[property])
            
          } else {
            searchQuery.where[property] = {
              contains: req.query.search[property]
            }
          }
        }
      } 

      if(typeof req.query.limit !== 'undefined') {
        searchQuery.select = {};
        if(typeof req.query.limit === 'object') {
          for (const item of req.query.limit) {
            searchQuery.select[item] = true
          }
        } else {
          searchQuery.select[req.query.limit] = true
        }
      }
    }
        

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
