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
  //   getUserById,
  //   getUserByEmail,
  //   addUser,
  //   updateUserWithoutPassword,
  //   updateUserOnlyPassword,
  //   deleteUser
}

module.exports = UserManager;
