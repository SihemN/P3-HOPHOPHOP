const tables = require("../tables");

const isAdmin = async (req, res, next) => {
  try {
    const id = req.payload;
    const { groupId } = req.body;
    const [group] = await tables.group_table.getUsersofGroup(groupId);
    // some() sert à vérifier si une valeur est vraie dans un tableau d'objet, renvoie un booléen

    const userInGroup = group.some((user) => user.ug_user_id === id);
    const userIsAdmin = group.some((user) => user.ug_user_role);
    // on vérifie si on reçoit les users du group
    if (group.length) {
      // on vérifie si le user fait partie de ce group
      if (userInGroup) {
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

// vérifier si le user est dans la BDD
// vérifier si le user est dans le groupe à supprimer
// vérifier s'il est admin
