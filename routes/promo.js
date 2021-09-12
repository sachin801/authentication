const express=require('express');
const mongoose =require('mongoose');
const authenticate=require('../authenticate');
const bodyParser=require('body-parser');
const promoRouter=express.Router()
promoRouter.use(bodyParser.json());
const promoes =require('../models/promos')


promoRouter.route('/')
.get((req,res,next)=> {
    promoes.find({})
    .then((promoes) => {
        res.statusCode =200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promoes)
    },(err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser, (req,res,next)=> {
    res.statusCode=403;
    res.end('PUT operation not supported');
})
.post(authenticate.verifyUser, (req,res,next) => {
    promoes.create(req.body)
    .then((promo) => {
        console.log('promo Created ',promo);
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => {next(err)})
    .catch((err)=> {next(err)});
})
.delete(authenticate.verifyUser, (req,res,next)=> {
    promoes.remove()
    .then((resp) => {
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) =>next(err))
    .catch((err) => next(err));
})


promoRouter.route('/:promoId')
.get((req,res,next)=> {
    promoes.findById(req.params.promoId)
    .then((promo) => {
        res.statusCode =200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo)
    },(err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req,res,next)=> {
    res.statusCode=403;
    res.end('POST operation not supported');
})
.put(authenticate.verifyUser, (req,res,next) => {
    promoes.findByIdAndUpdate(req.params.promoId, { $set :req.body }, {new: true})
    .then((promo) => {
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => {next(err)})
    .catch((err)=> {next(err)});
})
.delete(authenticate.verifyUser, (req,res,next)=> {
    promoes.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) =>next(err))
    .catch((err) => next(err));
})

module.exports=promoRouter;