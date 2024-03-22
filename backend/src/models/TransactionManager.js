const AbstractManager = require("./AbstractManager");

class TransactionManager extends AbstractManager {
  constructor() {
    super({ table: "transaction" });
  }

  // Créer une transaction avec une catégorie existante
  createTransaction(idUser, name, sum, date, type, categoryId, groupId) {
    return this.database.query(
      `INSERT INTO ${this.table} (tr_name, tr_sum, tr_date,
      tr_type,tr_cat_transaction_id,tr_group_id, tr_user_id) VALUES (?,?,?,?,?,?,?) `,
      [name, sum, date, type, categoryId, groupId, idUser]
    );
  }

  // Créer une transaction avec une nouvelle catégorie
  createTransactionWithNewCategory(
    idUser,
    name,
    sum,
    date,
    type,
    categoryName,
    groupId,
    catExists
  ) {
    if (catExists) {
      const activate = true;
      const result = this.database.query(
        `UPDATE category_transaction SET ctra_active = ?
        WHERE ctra_name = ? AND ctra_group_id = ?`,
        [activate, categoryName, groupId]
      );
      return result;
    }

    const result = this.database.query(
      `INSERT INTO category_transaction (ctra_name, ctra_group_id) VALUES(?, ?);
            INSERT INTO ${this.table} (tr_name, tr_sum, tr_date, tr_type, tr_cat_transaction_id, tr_group_id, tr_user_id)
            SELECT ?, ?, ?, ?, LAST_INSERT_ID() AS tr_cat_transaction_id, ?, ?`,
      [categoryName, groupId, name, sum, date, type, groupId, idUser]
    );
    return result;
  }

  // Récupérer toutes les transactions du groupe
  getTransactionsGroup(groupId) {
    return this.database.query(
      `SELECT * from ${this.table} INNER JOIN category_transaction ON transaction.tr_cat_transaction_id = category_transaction.ctra_id WHERE transaction.tr_group_id = ?`,
      [groupId]
    );
  }

  // Récupérer toutes les transactions du groupe par user
  getTransactionsGroupByUser(idUser, groupId) {
    return this.database.query(
      `SELECT * from ${this.table} INNER JOIN category_transaction ON transaction.tr_cat_transaction_id = category_transaction.ctra_id WHERE transaction.tr_group_id = ? AND transaction.tr_user_id = ?`,
      [groupId, idUser]
    );
  }

  // Mettre à jour une transaction
  updateTransaction(transactionId, transactionUpdated) {
    // on récupère les champs renseignés dans req.body
    const keysToUpdate = Object.keys(transactionUpdated);
    // on récupère leurs valeurs
    const valuesToUpdate = Object.values(transactionUpdated);
    // on compile ces champs dans une string en leur ajoutant le préfixe pour coller à notre BDD et à la syntaxe SQL
    const setKeys = keysToUpdate.map((column) => `tr_${column} = ?`).join(", ");
    return this.database.query(
      `UPDATE ${this.table} set ${setKeys} WHERE tr_id = ?`,
      [...valuesToUpdate, transactionId]
    );
  }

  // Supprimer une transaction
  deleteTransaction(transactionId) {
    return this.database.query(`DELETE FROM ${this.table} WHERE tr_id = ?`, [
      transactionId,
    ]);
  }

  // pour les Catégories de Transaction ******************************* //

  // Récupérer les catégories de transaction d'un groupe
  getCatTransactionByGroup(groupId) {
    const isActive = true;
    return this.database.query(
      `SELECT ctra_name, ctra_id FROM category_transaction WHERE ctra_group_id = ? AND ctra_active = ?`,
      [groupId, isActive]
    );
  }

  // Récupérer les catégories de transaction d'un groupe
  // + filtré par le nouveau de catégorie souhaité
  getCatTransactionDesactivatedByGroup(groupId, newName) {
    return this.database.query(
      `SELECT ctra_name, ctra_id FROM category_transaction WHERE ctra_group_id = ? AND ctra_name = ?`,
      [groupId, newName]
    );
  }

  // A ajouter : ne pas pouvoir modifier la catégorie "sans catégorie"
  updateCatTransaction(catTransactionId, catTransactionName) {
    const isActive = true;
    const categoryCannotChange = "Sans catégorie";
    return this.database.query(
      `UPDATE category_transaction SET ctra_name = ? 
    WHERE ctra_id = ? AND ctra_active = ? AND ctra_name != ?`,
      [catTransactionName, catTransactionId, isActive, categoryCannotChange]
    );
  }

  // POUR PLUS TARD

  // si le user veut créer une catégorie au même nom qu'une catégorie désactivée ?

  desactivateCatTransaction(catTransactionId) {
    const isActive = false;
    const categoryCannotChange = "Sans catégorie";
    return this.database.query(
      `UPDATE category_transaction SET ctra_active = ? 
WHERE ctra_id = ? AND ctra_name != ?`,
      [isActive, catTransactionId, categoryCannotChange]
    );
  }
}

module.exports = TransactionManager;
