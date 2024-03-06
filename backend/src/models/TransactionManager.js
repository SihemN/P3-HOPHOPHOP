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
}

module.exports = TransactionManager;
