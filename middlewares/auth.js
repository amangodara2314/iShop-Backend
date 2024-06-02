const jwt = require("jsonwebtoken");
const SECRET_KEY = "ishop2314";

function restrictedToLoggedInUserOnly(req, res, next) {
  const token = req.cookies.ishopAdminToken;
  console.log(req.cookies);

  if (!token)
    return res.status(401).send({ msg: "Access denied. No token provided." });

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
