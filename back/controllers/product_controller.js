const Product = require("../models/product_model");
const express = require("express");

exports.createProduct = (req,res)=>{

    console.log({ body: req.body});
    console.log({ file: req.file});
    const sauce = JSON.parse(req.body.sauce);
    delete sauce._id;
    console.log(sauce.name);
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

    product.save()
    .then((product)=>  res.status(201).json({message: product}))
    .catch(err=> res.status(400).json({err}))
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
    const id = req.params.id
    const sauce = JSON.parse(req.body.sauce);
    Product.updateOne({_id: id}, {
        name: sauce.name,
        manufacturer: sauce.manufacturer,
        description: sauce.description,
        mainPepper: sauce.mainPepper,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        heat: sauce.heat,
        _id: id})
    .then(()=>res.status(200).json({message: "Produit modifié"}))
    .catch((err)=> res.status(400).json({err}))
}

exports.deleteProduct = (req,res)=>{
    const id = req.params.id;
    Product.deleteOne({_id: id})
    .then(()=>res.status(200).json({message: "Produit supprimer"}))
    .catch((err)=> res.status(400).json({err}))
}
