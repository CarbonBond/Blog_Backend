
URI's

No login Required:

/api/v/1/public/    
    post      | GET    | Returns all Published Posts
        /:id  | GET    | Returns a specific published Post 
   
    categories| GET    | Returns all categories
        /:id  | GET    | Returns a specific category

Login Rquired:

/api/v/1/
    post       | GET    | Returns all Posts
        /:id   | GET    | Return a specific post
        /:id   | POST   | Creates a post (See New Post Obj)
        /:id   | PUT    | Updates a post
        /:id   | DELETE | Deletes a post
    
    categories | GET    | Returns all categories
        /:id   | ...    | Same as post

/auth/
    login      | POST   | Logs in user 
    user       | GET    | Gets logged in user

NewPost Obj:
    
{
    "title": "STRING", 
    "content": "STRING", 
    "isPublic": BOOL, 
    "categories": [ 
        {"category_id": ID_NUM}, 
        {"category_id": ID_NUM}
    ] 
}



