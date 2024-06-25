const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'].split(" ")[1];
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      return res.status(401).json({ message:"Error verifying token"});
    }
    return next();
  };
  
  module.exports = verifyToken;