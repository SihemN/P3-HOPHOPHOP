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

  updateTransaction(transactionUpdated) {
    // on récupère les champs renseignés dans req.body
    const keysTransaction = Object.keys(transactionUpdated);
    // on récupère les champs à mettre à jour
    const keysToUpdate = keysTransaction.slice(1);
    // on récupère leurs valeurs
    const valuesTransaction = Object.values(transactionUpdated);
    // on récupère les valeurs à mettre à jour
    const valuesToUpdate = valuesTransaction.slice(1);
    // on récupère l'id de la transaction à l'index 0
    const transactionId = valuesTransaction[0];
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
}

module.exports = TransactionManager;
