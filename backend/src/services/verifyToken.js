require("dotenv").config();

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    // on récupère le token dans le header de la requête
    const headers = req.get("Authorization");
    // console.info("verifyToken, headers", headers);
    // on récupère une string contenant le type et le token
    // on utilise .split pour transformer en array avec espace comme séparateur
    // on obtient un array contenant 2 éléments ["type", "token"]
    const [type, token] = headers.split(" ");
    // on vérifie le type du token
    if (type === "Bearer") {
      // on vérifie le payload du token et la clé secrète
      const { payload } = jwt.verify(token, process.env.SECRET_KEY_JWT);
      // on met à jour le payload
      req.payload = payload;
      next();
    }
  } catch (error) {
    // console.info("verifyToken error", error);
    res.status(500).send(error);
  }
};

module.exports = verifyToken;
