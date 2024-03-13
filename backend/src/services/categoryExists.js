const tables = require("../tables");

const categoryExists = async (req, res, next) => {
  try {
    // on récupère l'id du groupe
    const { id } = req.params;
    // on récupère le nom de la nouvelle catégorie souhaitée
    const { categoryName } = req.body;
    // on fait un GET catégories du group en filtrant avec ce nouveau nom souhaité + catégorie désactivée
    const [result] =
      await tables.transaction.getCatTransactionDesactivatedByGroup(
        id,
        categoryName
      );

    // si on reçoit un résultat : catégorie déjà existante = TRUE
    if (result.length) {
      req.body.catExists = true;
      next();
    } else if (result.length === 0) {
      // si pas de résultat : aucun homonyme = FALSE
      req.body.catExists = false;
      next();
    } else {
      res.status(401).send("Problème");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = categoryExists;

// on récupère le nom de la nouvelle catégorie souhaitée
// on fait un GET catégories du group en filtrant avec ce nouveau nom souhaité + catégorie désactivée
// si on reçoit un résultat : catégorie déjà existante = TRUE
// si pas de résultat : aucun homonyme = FALSE
