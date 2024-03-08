const tables = require("../tables");

const userExistsAndActive = async (req, res, next) => {
  try {
    // on récupère l'email du user à ajouter
    const { email } = req.body;
    // on récupère la réponse du Manager
    const [result] = await tables.user.getUserByEmail(email);
    // on vérifie si le user existe dans la BDD

    if (result.length) {
      // on vérifie si le user est actif
      if (result[0].u_active) {
        // si oui, on récupère son id et on la transmet à la suite du code
        req.body.userIdToAdd = result[0].u_id;
        next();
      } else {
        res.status(401).send("Problème, User désactivé");
      }
    } else {
      res.status(401).send("User n'existe pas");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = userExistsAndActive;
