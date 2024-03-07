const AbstractManager = require("./AbstractManager");

class TransactionManager extends AbstractManager {
  constructor() {
    super({ table: "transaction" });
  }

  createTransaction(idUser, name, sum, date, type, categoryId, groupId) {
    return this.database.query(
      `INSERT INTO ${this.table} (tr_name, tr_sum, tr_date,
      tr_type,tr_cat_transaction_id,tr_group_id, tr_user_id) VALUES (?,?,?,?,?,?,?) `,
      [name, sum, date, type, categoryId, groupId, idUser]
    );
  }

  createTransactionWithNewCategory(
    idUser,
    name,
    sum,
    date,
    type,
    categoryName,
    groupId
  ) {
    return this.database.query(
      `INSERT INTO category_transaction (ctra_name) VALUES(?);
      INSERT INTO ${this.table} (tr_name, tr_sum, tr_date, tr_type, tr_cat_transaction_id, tr_group_id, tr_user_id)
      SELECT ?, ?, ?, ?, LAST_INSERT_ID() AS tr_cat_transaction_id, ?, ?`,
      [categoryName, name, sum, date, type, groupId, idUser]
    );
  }

  // INSERT INTO category_transaction (ctra_name) VALUES(?);

  // INSERT INTO transaction (tr_name, tr_sum, tr_date, tr_type, tr_cat_transaction_id, tr_group_id, tr_user_id)
  // SELECT ?, ?, ?, ?, LAST_INSERT_ID() AS tr_cat_transaction_id, ?, ?;

  getTransactionsGroup(groupId) {
    return this.database.query(
      `SELECT * from ${this.table} INNER JOIN category_transaction ON transaction.tr_cat_transaction_id = category_transaction.ctra_id WHERE transaction.tr_group_id = ?`,
      [groupId]
    );
  }

  getTransactionsGroupByUser(idUser, groupId) {
    return this.database.query(
      `SELECT * from ${this.table} INNER JOIN category_transaction ON transaction.tr_cat_transaction_id = category_transaction.ctra_id WHERE transaction.tr_group_id = ? AND transaction.tr_user_id = ?`,
      [groupId, idUser]
    );
  }

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

  deleteTransaction(transactionId) {
    return this.database.query(`DELETE FROM ${this.table} WHERE tr_id = ?`, [
      transactionId,
    ]);
  }

  // pour les Catégories de Transaction

  getCatTransactionByGroup(groupId) {
    const isActive = true;
    return this.database.query(
      `SELECT ctra.ctra_name, ctra.ctra_id from ${this.table} AS t INNER JOIN category_transaction AS ctra ON t.tr_cat_transaction_id = ctra.ctra_id
    INNER JOIN group_table AS g ON g.g_id = t.tr_group_id
    WHERE t.tr_group_id = ? AND ctra.ctra_active = ?
    `,
      [groupId, isActive]
    );
  }
}

module.exports = TransactionManager;
