const jwt = require("jsonwebtoken");
const SECRET_KEY = "ishop2314";

function restrictedToLoggedInUserOnly(req, res, next) {
  const authHeader = req.headers["authorization"];
  let token;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else {
    res.status(401).send("Unauthorized");
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send({ msg: "Invalid token." });
  }
}

function createToken(user) {
  return jwt.sign({ user }, SECRET_KEY);
}

module.exports = { restrictedToLoggedInUserOnly, createToken };
