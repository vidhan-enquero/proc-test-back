const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    // const isCustomAuth = token.length < 500;

    // let verified;

    // if (token && isCustomAuth) {
    //   verified = jwt.verify(token, process.env.JWT_SECRET);
    //   req.user = verified;
    // } else {
    //   verified = jwt.decode(token);
    //   req.user = verified?.sub;
    // }
    req.body.accessToken = token;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = verifyToken;