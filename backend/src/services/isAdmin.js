const tables = require("../tables");

const isAdmin = async (req, res, next) => {
  try {
    // on récupère l'id du user dans le token
    const userId = req.payload;
    // on récupère l'id du group dans les params
    const { id } = req.params;
    // on récupère les utilisateurs du group
    const [group] = await tables.group_table.getUsersofGroup(id);
    // some() sert à vérifier si une valeur est vraie dans un tableau d'objet, renvoie un booléen

    const userIsInGroup = group.some((user) => user.ug_user_id === userId);
    const userIsAdmin = group.some((user) => user.ug_user_role === "admin");

    // on vérifie si on reçoit les users du group
    if (group.length) {
      // on vérifie si le user fait partie de ce group
      if (userIsInGroup) {
        // on vérifie si le user est admin dans ce group
        // si oui, on valide et next pour passer au GroupControllers
        if (userIsAdmin) {
          next();
        } else {
          res.status(403).send("vous n'êtes pas admin");
        }
      } else {
        res.status(403).send("vous ne faites pas partie de ce groupe");
      }
    } else {
      res.status(403).send("accès refusé");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = isAdmin;
