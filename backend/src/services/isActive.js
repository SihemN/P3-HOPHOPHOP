const tables = require("../tables");

const isActive = async (req, res, next) => {
  try {
    // on récupère l'id du user dans le token
    const id = req.payload;
    // on récupère les utilisateurs du group
    const [result] = await tables.user.getUserById(id);
    // some() sert à vérifier si une valeur est vraie dans un tableau d'objet, renvoie un booléen
    const userIsActive = result.some((user) => user.u_active);
    // on vérifie si on reçoit le user
    if (result.length) {
      // on vérifie si le user est actif
      if (userIsActive) {
        next();
      } else {
        res.status(403).send("votre compte est désactivé");
      }
    } else {
      res.status(403).send("pas d'utilisateur");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = isActive;
