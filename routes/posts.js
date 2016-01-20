var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
function Posts(){
  return knex('posts')
}


router.get('/', function(req, res, next) {
  Posts().select().then(function (posts) {
    res.json({'SUCCESS': posts });
  })
});

router.post('/', function(req, res, next) {
  Posts().insert({
    author:req.body.author,
    body:req.body.body
  }).then(function (posts) {
    res.redirect('/');
  })
});


router.get('/:id', function(req, res, next){
  Posts().where('id', req.params.id).first().then(function(posts){
    res.json({'SUCCESS': posts});
  })
})
router.get('/:id/edit', function(req, res, next){
  Posts().where('id', req.params.id).first().then(function(posts){
    res.json({'SUCCESS': posts});
  })
})

router.post('/:id/delete', function(req, res, next) {
  Posts().where('id', req.params.id).del().then(function(results){
    res.redirect('/')
  })
})

router.post('/:id', function(req, res, next) {
  Posts().where('id', req.params.id).update({
    author:req.body.author,
    body:req.body.body

    }).then(function(result){
    res.redirect('/')
  })
})



module.exports = router;
