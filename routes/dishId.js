const express=require('express');
const bodyParser=require('body-parser');

const dishIdRouter=express.Router();

dishIdRouter.use(bodyParser.json());

dishIdRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=> {
    res.end('Getting your dish ');
})
.put((req,res,next)=> {
    res.end('Udating your dish : '+req.body.name +' desc: '+req.body.description);
})
.post((req,res,next) => {
    res.end('POST operation not supported');
})
.delete((req,res,next) => {
    res.end('Deleting the dish')
})

module.exports= dishIdRouter;