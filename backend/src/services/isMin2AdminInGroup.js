/* eslint-disable camelcase */
const tables = require("../tables");

const isMin2AdminInGroup = async (req, res, next) => {
  try {
    // on récupère l'id du group dans les params
    const { id } = req.params;
    const { newRole, action, ug_user_role } = req.body;
    // on récupère les admins du group
    const [group] = await tables.group_table.getAdminGroup(id);
    // console.log("group", group);
    // on vérifie s'il y a au moins 2 admin dans le group
    // permet au user admin de quitter le groupe, etc.
    if (newRole === "admin") {
      next();
    } else if (group.length >= 2) {
      // res.status(200).json("Il y a au moins 2 admin dans le groupe");
      next();
    } else if (action === "delete" && ug_user_role === "membre") {
      next();
    } else if (action === "delete" && ug_user_role === "admin") {
      res.status(403).json({
        error: "Suppression interdite",
        message:
          "Vous ne pouvez pas vous supprimer du groupe en tant qu'unique administrateur. Veuillez promouvoir un autre membre avant de vous supprimer.",
      });
    } else {
      res
        .status(403)
        .json(
          "Vous êtes le seul admin, passez un autre user admin avant de quitter le groupe ou de changer de statut"
        );
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = isMin2AdminInGroup;
