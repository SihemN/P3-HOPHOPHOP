const tables = require("../tables");

const isMin2AdminInGroup = async (req, res, next) => {
  try {
    // on récupère l'id du group dans les params
    const { id } = req.params;
    // on récupère les admins du group
    const [group] = await tables.group_table.getAdminGroup(id);

    // on vérifie s'il y a au moins 2 admin dans le group
    // permet au user admin de quitter le groupe, etc.
    if (group.length >= 2) {
      res.status(200).send("Il y a au moins 2 admin dans le groupe");
      next();
    } else {
      res
        .status(403)
        .send(
          "Vous êtes le seul admin, passez un autre user admin avant de quitter le groupe"
        );
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = isMin2AdminInGroup;
