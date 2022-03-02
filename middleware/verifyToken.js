const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["authorization"];
    if(!token){
     return res.status(403).send("A token is required for authentication");
    }
    try{
        const decode = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = decode;
    }catch(err){
        return res.status(401).send("Invalid Token");
    }
 next();
}


module.exports = verifyToken;