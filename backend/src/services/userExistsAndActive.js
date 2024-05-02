const tables = require("../tables");

const userExistsAndActive = async (req, res, next) => {
  try {
    // on récupère l'email du user à ajouter
    const { userEmail } = req.body;
    // on récupère l'id du groupe dans params
    const { id } = req.params;
    // on récupère la réponse du Manager
    const [result] = await tables.user.getUserByEmailWithoutHashedPassword(
      userEmail
    );
    const userIsAlreadyInGroup = result.some(
      (element) => element.ug_group_id === parseInt(id, 10)
    );
    // on vérifie si le user existe dans la BDD
    if (result.length) {
      // on vérifie si le user est actif
      if (result[0].u_active) {
        // on vérifie si le user ne fait pas déjà partie du groupe
        if (userIsAlreadyInGroup === false) {
          // on récupère son id et on la transmet à la suite du code
          req.body.userIdToSet = result[0].u_id;
          next();
        } else {
          res.status(401).json("User déjà dans le groupe");
        }
      } else {
        res.status(401).json("Problème, User désactivé");
      }
    } else {
      res.status(401).json("User n'existe pas");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = userExistsAndActive;
