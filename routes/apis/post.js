//Code by Antolina Gonzalez

//rutas API
const express = require('express');
const router = express.Router();
const fs = require('fs');
const Post = require('../../modules/Post');
const path = require('path');

//obtener dataser blogPost.json
var rawdata = fs.readFileSync(path.join(__dirname, 'blogPost.json'));
var data = JSON.parse(rawdata);

//Generar datos 

router.get('/generateSampleData', async (req, res) => {
    for( dato in data){
        try{
            const title = data[dato]['title'];
            const text = data[dato]['text'];
            //console.log(title);
            //console.log(text);
            var newPost = new Post({
                title: title,
                text: text
            });
            await newPost.save()
        } 
        catch(err)
        {
            console.log(err)
        };
    }
    res.json({message:"success"})
}); 

//update a post
router.post('/:id', (req, res, next) =>{
    let id = req.params.id;
    Post.findById(id)
        .then(post => {
            post.title = req.body.title;
            post.text = req.body.text;
            post.save()
                .then(post => {
                     res.send({
                        message: 'Post updated',
                        status: 'success', 
                        post: post
                        })
                    
        })
                .catch(err => console.log(err))
    })
         .catch(err => console.log(err))

});

//Get all the posts 
router.get('/', (req,res, next) =>{
    Post.find({}).sort({updatedAt:-1})
    .then((posts) => {
        res.json(posts);
        
    })
    .catch(err => console.log(err))
});

//Get a single post
router.get('/:id', (req,res, next) =>{
    let id = req.params.id;
    Post.findById(id)
        .then((posts) => {
            res.json(posts);
            })
         .catch(err => console.log(err))
});

//create a post 
router.post('/', (req,res, next) => {
    const title = req.body.title;
    const text = req.body.text;
    newPost = new Post({
        title: title,
        text: text
    });
    newPost.save()
    .then(post => {
        res.json(post);
    })
    .catch(err => console.log(err));
});

//delete all the posts
router.delete('/', (req,res, next) =>{
        Post.deleteMany({})
          .then(data => {
            res.send({
              message: `${data.deletedCount}  Deleted successfully!`
            });
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while removing all"
            });
          });
      });

//delete a post 
router.delete('/:id', (req,res,next) => {
    let id = req.params.id;
    Post.findById(id)
        .then(post => {
            post.delete()
                .then(post => {
                     res.send({
                        message: 'Post deleted',
                        status: 'success', 
                        post: post
                        })
        })
                .catch(err => console.log(err))
    })
         .catch(err => console.log(err))
})

module.exports = router;
