const jwt = require("jsonwebtoken");
const config = require("config");
const users = require("../models/users");

module.exports = (req, res, next) =>{
    const token = req.header('x-auth-token');
    if(!token){
        res.status(401).json({
            success:false,
            message:"Access denied ! No token Provided !"
        })
    }
    try{
        const decoded = jwt.verify(token,config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    }
    catch(ex){
        res.status(400).json({
            success:false,
            message:"Invalid Token"
        })
    }
}