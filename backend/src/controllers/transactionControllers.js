const tables = require("../tables");

const create = async (req, res) => {
  try {
    // on récupère l'id du user dans le payload du token
    const idUser = req.payload;
    // on récupère dans le body de la requête les infos de la transaction
    const { name, sum, date, type, categoryId, groupId } = req.body;
    // on stocke la réponse du manager
    const [results] = await tables.transaction.createTransaction(
      idUser,
      name,
      sum,
      date,
      type,
      categoryId,
      groupId
    );
    // on vérifie si une ligne a été mise à jour dans le tableau results
    if (results.affectedRows) {
      res.status(201).send("transation created");
    } else {
      res.status(401).send("transaction not created");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = { create };
