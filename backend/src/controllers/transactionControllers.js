const tables = require("../tables");

const create = async (req, res) => {
  try {
    // on récupère l'id du user dans le payload du token
    const idUser = req.payload;
    // on récupère l'id du group dans la route paramatrée
    const { id } = req.params;
    // on récupère dans le body de la requête les infos de la transaction
    const { name, sum, date, type, categoryId } = req.body;
    // on stocke la réponse du manager
    const [results] = await tables.transaction.createTransaction(
      idUser,
      name,
      sum,
      date,
      type,
      categoryId,
      id
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

const createWithNewCategory = async (req, res) => {
  try {
    const idUser = req.payload;
    const { id } = req.params;
    const { name, sum, date, type, categoryName, catExists } = req.body;
    const [results] = await tables.transaction.createTransactionWithNewCategory(
      idUser,
      name,
      sum,
      date,
      type,
      categoryName,
      id,
      catExists
    );

    // 2 cas possibles
    // On reçoit un objet si uniquement UPDATE d'une catégorie existante
    // result {}
    // Ou on reçoit un array contenant deux objets si création de catégorie
    // result [ {} {}]

    if (Array.isArray(results)) {
      if (results[0].affectedRows && results[1].affectedRows) {
        res.status(201).send("transation et catégorie created");
      } else {
        res.status(401).send("transaction not created");
      }
    } else if (results.affectedRows) {
      res.status(201).send("transation et catégorie created");
    } else {
      res.status(401).send("transaction not created");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const read = async (req, res) => {
  try {
    // on récupère l'id du group dans la route paramatrée
    const { id } = req.params;
    const [transactions] = await tables.transaction.getTransactionsGroup(id);
    if (transactions.length) {
      res.status(200).json({
        message: "Liste des transactions du groupe récupérée",
        transactions,
      });
    } else {
      res.status(204).json({ message: "Pas de transaction" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const readByUser = async (req, res) => {
  try {
    const idUser = req.payload;
    // on récupère l'id du group dans la route paramatrée
    const { id } = req.params;
    const [transactions] = await tables.transaction.getTransactionsGroupByUser(
      idUser,
      id
    );
    if (transactions.length) {
      res.status(200).json({
        message: "Liste des transactions du groupe récupérée",
        transactions,
      });
    } else {
      res.status(204).json({ message: "Pas de transaction" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    // on récupère l'id de la transaction dans la route paramatrée
    const { id } = req.params;
    const [results] = await tables.transaction.updateTransaction(id, req.body);
    if (results.affectedRows) {
      res.status(200).json({ message: "Transaction mise à jour" });
    } else {
      res.status(401).send("Problème pendant la mise à jour de la transaction");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteTransaction = async (req, res) => {
  try {
    // on récupère l'id de la transaction dans la route paramatrée
    const { id } = req.params;
    const [results] = await tables.transaction.deleteTransaction(id);

    if (results.affectedRows) {
      res.status(200).send("Transaction supprimée");
    } else {
      res.status(401).send("Problème dans la suppression de la transaction");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Contrôle des catégories de transaction

const getCategoriesByGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const [categories] = await tables.transaction.getCatTransactionByGroup(id);

    if (categories.length) {
      res.status(200).json({
        message: "Liste des catégories du groupe récupérée",
        categories,
      });
    } else {
      res.status(204).send("Pas de liste trouvée");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const [result] = await tables.transaction.updateCatTransaction(id, name);
    if (result.affectedRows) {
      res.status(200).send("Catégorie transaction mise à jour");
    } else {
      res.status(204).send("Problème de mise à jour de la catégorie");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const desactivateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await tables.transaction.desactivateCatTransaction(id);

    if (result.affectedRows) {
      res.status(200).send("Catégorie transaction désactivée");
    } else {
      res.status(204).send("Problème de mise à jour de la catégorie");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  create,
  createWithNewCategory,
  read,
  readByUser,
  update,
  deleteTransaction,
  getCategoriesByGroup,
  updateCategory,
  desactivateCategory,
};
