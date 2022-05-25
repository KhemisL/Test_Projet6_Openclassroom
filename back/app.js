const express = require("express");
const app = express();
const cors = require("cors")
const path =require("path");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoute = require("./routes/user_route");
const productRoute = require("./routes/product_route");

app.use(cors());
mongoose.connect("mongodb+srv://Khemis:Khemis123@api-sauce.hsmn4.mongodb.net/?retryWrites=true&w=majority")
.then(()=> console.log("connect succes"))
.catch(err=> console.log(err))


app.use(express.json());
app.use(bodyParser.json());


app.use("/images/", express.static(path.join(__dirname, "images")))

app.use("/api/auth/", userRoute );
app.use("/api/sauces/", productRoute );
module.exports = app;