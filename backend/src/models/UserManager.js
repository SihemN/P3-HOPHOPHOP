const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  getAllUsers() {
    return this.database.query(`select * from ${this.table}`);
  }

  addUser(name, email, hashedPassword, avatar) {
    return this.database.query(
      `INSERT INTO ${this.table} (u_name, u_email, u_hashedPassword, u_avatar)
      VALUES (?, ?, ?, ?)`,
      [name, email, hashedPassword, avatar]
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
      `select u_name, u_email, u_avatar from ${this.table} where u_id = ?`,
      [id]
    );
  }

  updateUserWithoutPassword(id, userWithoutPassword) {
    // Object.keys prend pour paramètre un objet. Retourne un array avec les propriétés de l'objet
    // exemple : objet { "a", "b", "c"}, renvoie ["a", "b", "c"]
    // ici on récupère les propriétés que le user veut modifier (ex : name, email, etc.)
    const columns = Object.keys(userWithoutPassword);
    // idem mais on récupère uniquement les valeurs (ex : "Toto")
    const valuesColumns = Object.values(userWithoutPassword);
    // on crée une string avec les propriétés pour l'injecter dans la requête SQL
    // join transforme un array en string
    const values = columns.map((column) => `u_${column} = ?`).join(", ");
    return this.database.query(
      `update ${this.table} set ${values} where u_id = ?`,
      [...valuesColumns, id]
    );
  }

  updateUserUpload(id, avatar) {
    const column = Object.keys(avatar);
    const valueColumn = Object.values(avatar);
    return this.database.query(
      `update ${this.table} set u_${column} = ? where u_id = ?`,
      [...valueColumn, id]
    );
  }

  updateUserOnlyPassword(id, hashedPassword) {
    return this.database.query(
      `UPDATE ${this.table} set u_hashedPassword = ? where u_id=?`,
      [hashedPassword, id]
    );
  }

  deleteUser(id) {
    return this.database.query(`delete from ${this.table} where u_id = ?`, [
      id,
    ]);
  }
}

module.exports = UserManager;
