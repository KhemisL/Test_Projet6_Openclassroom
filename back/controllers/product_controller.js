const Product = require("../models/product_model");
const express = require("express");

exports.createProduct = (req,res)=>{

     console.log({ ...req.body._id});
     //console.log({ file: req.file});
    
    const sauce = JSON.parse(req.body.sauce);
    delete req.body._id
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
      let dislikes = req.body.dislikes;
      const id = req.params.id;
      const userId = req.body.userId;
    if(like === 1){
        Product.updateOne({_id: id},{
            likes: 1,
            usersLiked: [userId]
        })
        .then(()=>res.status(200).json({message: "Like Ajouté"}))
        .catch((err)=> res.status(400).json({err}))
    }else if(like === 0){
        Product.updateOne({_id: id},{
            likes: 0,
            
        })
        .then(()=>res.status(200).json({message: "Annulation like dislike"}))
        .catch((err)=> res.status(400).json({err}))
    }else if(like === -1){
        Product.updateOne({_id: id},{
            dislikes: 1,
            usersDisliked: [userId]
        })
        .then(()=>res.status(200).json({message: "Dislike Ajouté"}))
        .catch((err)=> res.status(400).json({err}))
    }
     
}
