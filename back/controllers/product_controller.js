const Product = require("../models/product_model");
const express = require("express");

exports.createProduct = (req,res)=>{

     //console.log({ ...req.body._id});
     //console.log({ file: req.file});
    
    const sauce = JSON.parse(req.body.sauce);
    //delete sauce.userId
    console.log("coucou");
    const product = new Product({
        userId: sauce.userId,
        name: sauce.name,
        manufacturer: sauce.manufacturer,
        description: sauce.description,
        mainPepper: sauce.mainPepper,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        heat: sauce.heat,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    })
    console.log("hello");
    product.save()
    .then((prod)=> res.status(201).json({message: prod}))
    .catch(err=> res.status(401).json({err}))



    
}

exports.getAllProduct = ((req,res)=>{
    Product.find()
    //.then((products)=>res.send(products))
    .then((products)=> res.status(200).json(products))
    .catch(err=> res.status(400).json({err}))
})
exports.getOneProduct = ((req,res)=>{
    const id = req.params.id
    Product.findOne({_id: id})
    // .then((products)=>res.send(products))
    .then((product)=> res.status(200).json(product))
    .catch(err=> res.status(400).json({err}))
})

exports.modifyProduct = (req,res)=>{
    

    const ProductObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    const id = req.params.id
    Product.updateOne({_id: id}, {...ProductObject, _id: id})
     .then(()=>res.status(200).json({message: "Produit modifié"}))
     .catch((err)=> res.status(403).json({err}))
}

exports.deleteProduct = (req,res)=>{
    const id = req.params.id;
    Product.deleteOne({_id: id})
    .then(()=>res.status(200).json({message: "Produit supprimer"}))
    .catch((err)=> res.status(403).json({err}))
}

exports.likeProduct = (req,res)=> {
    let like = req.body.like;
    let userId = req.body.userId;
    const id = req.params.id;

    if (like === -1 || like === 0 || like === 1){
        if (like === 1) {
            Product.findById(id)
            .then((product)=>addLike(product, userId, res))
            .catch((err)=> res.status(400).json({err}))
            
            
        }else if (like === -1) {
            Product.findById(id)
            .then((product)=>disLike(product, userId, res))
            .catch((err)=> res.status(400).json({err}))
            
            
        }else if (like === 0) {
            Product.findById(id)
            .then((product)=>removeLike(product, userId, res, like))
            .catch((err)=> res.status(400).json({err}))
            
            
        }
    } else{
        return res.status(400).json({error: "Bad Request"})
    }
}


function addLike(product, userId, res) {
    const userLiked = product.usersLiked
        if (userLiked.includes(userId)) {
            return res.status(401).json({error: "Bad Request"})
        }else{
            userLiked.push(userId)
            ++product.likes;
            product.save()
            .then(()=> res.status(201).json({message: "produit sauvgardé"}))
            .catch(err=> res.status(401).json({err}))

            console.log(product);
        }   
}

function disLike(product, userId, res) {
    const userDisliked = product.usersDisliked
        if (userDisliked.includes(userId)) {
            return res.status(401).json({error: "Bad Request"})
        }else{
            userDisliked.push(userId)
            ++product.dislikes;
            product.save()
            .then(()=> res.status(200).json({message: "produit sauvgardé"}))
            .catch(err=> res.status(400).json({err}))
            
            console.log(product);
        }   
}

function removeLike(product, userId, res, like) {
    const userDisliked = product.usersDisliked
    const userLiked = product.usersLiked

    let likeUpdate = userLiked.includes(userId)? product.likes : product.dislikes
    likeUpdate--
    userLiked.includes(userId)? --product.likes : --product.dislikes

    let arrUserId = [userLiked, userDisliked];
    const filterUserId = arrUserId.filter(user => user !== userId)
    arrUserId = filterUserId
    
    product.save()
            .then(()=> res.status(200).json({message: "produit sauvgardé"}))
            .catch(err=> res.status(400).json({err}))

    console.log(product);

}