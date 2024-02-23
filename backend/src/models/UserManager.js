const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  getAllUsers() {
    return this.database.query(`select * from ${this.table}`);
  }

  addUser(name, email, hashedPassword, avatar, admin) {
    return this.database.query(
      `INSERT INTO ${this.table} (u_name, u_email, u_hashedPassword, u_avatar, u_admin)
      VALUES (?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, avatar, admin]
    );
  }

  getUserByEmail(email) {
    return this.database.query(
      `select * from ${this.table} where u_email = ?`,
      [email]
    );
  }

  getUserById(id) {
    return this.database.query(
      `select u_name, u_email, u_hashedPassword, u_avatar, u_admin from ${this.table} where u_id = ?`,
      [id]
    );
  }

  updateUserWithoutPassword(id, userWithoutPassword) {
    const columns = Object.keys(userWithoutPassword);
    const valuesColumns = Object.values(userWithoutPassword);
    const newColumns = columns.map((column) => `u_${column}`);
    const values = newColumns.map((column) => `${column} = ?`).join(", ");

    return this.database.query(
      `update ${this.table} set ${values} where u_id = ?`,
      [...valuesColumns, id]
    );
  }

  // updateUserOnlyPassword() {

  // }
  //   deleteUser
}

module.exports = UserManager;
