const express=require('express');
const mongoose =require('mongoose');
const bodyParser=require('body-parser');
const authenticate=require('../authenticate');
const leaderRouter=express.Router()
leaderRouter.use(bodyParser.json());
const leaderes =require('../models/leaders')


leaderRouter.route('/')
.get((req,res,next)=> {
    leaderes.find({})
    .then((leaderes) => {
        res.statusCode =200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaderes)
    },(err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser, (req,res,next)=> {
    res.statusCode=403;
    res.end('PUT operation not supported');
})
.post(authenticate.verifyUser, (req,res,next) => {
    leaderes.create(req.body)
    .then((leader) => {
        console.log('leader Created ',leader);
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => {next(err)})
    .catch((err)=> {next(err)});
})
.delete(authenticate.verifyUser, (req,res,next)=> {
    leaderes.remove()
    .then((resp) => {
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) =>next(err))
    .catch((err) => next(err));
})


leaderRouter.route('/:leaderId')
.get((req,res,next)=> {
    leaderes.findById(req.params.leaderId)
    .then((leader) => {
        res.statusCode =200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader)
    },(err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req,res,next)=> {
    res.statusCode=403;
    res.end('POST operation not supported');
})
.put(authenticate.verifyUser, (req,res,next) => {
    leaderes.findByIdAndUpdate(req.params.leaderId, { $set :req.body }, {new: true})
    .then((leader) => {
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => {next(err)})
    .catch((err)=> {next(err)});
})
.delete(authenticate.verifyUser, (req,res,next)=> {
    leaderes.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) =>next(err))
    .catch((err) => next(err));
})

module.exports=leaderRouter;