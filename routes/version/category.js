
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
<<<<<<< HEAD
  res.send("Created Category")
=======
  res.json(createCategory.category_id)
>>>>>>> category_crud
}

let getAllCategories = async (req, res, next) => {
  const allCategories = await prisma.category.findMany()

  if(allCategories) {
    res.send(allCategories)
    return;
  }
  
  res.status(500)
  res.send('Categories not found')
}

let getCategory = async (req, res, next) => {
  const category = await prisma.category.findUnique({
    where: {
      category_id: parseInt(req.params.id)
    }
  })
  if(category) {
    res.send(category)
    return;
  }

  res.status(404)
  res.send('Category not found')
}


let updateCategory = async (req, res, next) => {


  try {
    const category = await prisma.category.update({
      where: {
        category_id: parseInt(req.params.id)
      },
      data: {
        name: req.body.name,
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
  } catch {
    res.status(404)
    res.send('Category not found')
    return;
  }

  res.status(200)
  res.send('Deleted')
}
  
module.exports = { createCategory, getAllCategories, getCategory, deleteCategory, updateCategory};
