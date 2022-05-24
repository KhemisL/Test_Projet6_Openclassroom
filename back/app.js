const express = require("express");
const app = express();
const cors = require("cors")
const mongoose = require("mongoose");
const userRoute = require("./routes/user_route");
app.use(cors());
mongoose.connect("mongodb+srv://Khemis:Khemis123@api-sauce.hsmn4.mongodb.net/?retryWrites=true&w=majority")
.then(()=> console.log("connect succes"))
.catch(err=> console.log(err))


app.use(express.json());



app.use("/api/auth/", userRoute);
module.exports = app;