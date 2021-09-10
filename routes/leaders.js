const express=require('express');

const bodyParser=require('body-parser');
const leaderRouter=express.Router()
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=> {
    res.end('Getting all leaders');
})
.put((req,res,next)=> {
    res.statusCode=403;
    res.end('PUT operation not suppor ted');
})
.post((req,res,next) => {
    res.end('will add leader '+req.body.name+' desc: '+req.body.description);
})
.delete((req,res,next)=> {
    res.end('Deleting all leaders');
})

module.exports=leaderRouter;