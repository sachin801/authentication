const express=require('express');

const bodyParser=require('body-parser');
const promotionRouter=express.Router()
promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})  
.get((req,res,next)=> {
    res.end('Getting promotions for you');
})
.put((req,res,next)=> {
    res.statusCode=403;
    res.end('PUT operation not supported');
})
.post((req,res,next) => {
    res.end('will add promotion '+req.body.name+' desc: '+req.body.description);
})
.delete((req,res,next)=> {
    res.end('Deleting all promotions');
})

module.exports=promotionRouter;