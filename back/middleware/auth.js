const jwt = require("jsonwebtoken");


module.exports = (req,res, next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodeToken = jwt.verify(token,process.env.ACCES_TOKEN_SECRET);
        const userId = decodeToken.userId;
        if(req.body.userId && req.body.userId !== userId){
            throw "UserId non valable"
        }else{
            next()
        }
        
    }catch (err){
        res.status(401).json({error: err | "Requete non authentifiée"})
    }
}