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
}

module.exports = TransactionManager;

/*
on reçoit l'objet req.body 

{
  "groupId":1,
  "transactionId":2,
  "name"
  ....
}

object.keys :

[
  "groupId",
  "transactionId",
  "*****",
  "*****",
]

const groupId = array[0];
const transactionId = array[1];

.splice coupe le tableau après l'élément indiqué
pour récupérer les champs à update

[
  "*****",
  "******"
]

*/

/*
updateTransaction(userId, transactionUpdated) {
  // Retrieve the keys (columns to be updated) from the transactionUpdated object
  const columns = Object.keys(transactionUpdated);

  // Retrieve the values corresponding to the keys from the transactionUpdated object
  const values = Object.values(transactionUpdated);

  // Generate the part of the SQL statement that sets the new values for the columns
  // This will create a string like "u_name = ?, u_email = ?, ..."
  const setClause = columns.map(column => `u_${column} = ?`).join(", ");

  // Add the userId to the array of values to be used in the query's parameterized execution
  // Assuming the userId is used to identify which transactions to update
  values.push(userId);

  // Construct the SQL query string
  // Assuming tr_u_id is the column to match the userId against
  const queryString = `UPDATE ${this.table} SET ${setClause} WHERE tr_u_id = ?`;

  // Execute the database query with the constructed query string and the values array
  return this.database.query(queryString, values);
}

*/
