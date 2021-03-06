const mongoose  = require("mongoose")


const ProductSchema = mongoose.Schema({
    userId: {type: String, unique: true},
    name: {type: String},
    manufacturer: {type: String},
    description: {type: String},
    mainPepper: {type: String},
    imageUrl: {type: String},
    heat: {type: Number},
    likes: {type: Number},
    dislikes: {type: Number},
    usersLiked: [String],
    usersDisliked: [String]
})


module.exports = mongoose.model("Product", ProductSchema)