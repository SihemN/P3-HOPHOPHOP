const AbstractManager = require("./AbstractManager");

class ContactManager extends AbstractManager {
  constructor() {
    super({ table: "contact" });
  }

  // Créer un contact
  createContact(name, email, phone, address, catId, userId, groupId) {
    return this.database.query(
      `INSERT INTO ${this.table} (c_name, c_email, c_phone, c_address, c_cat_contact_id, c_user_id, c_group_id) VALUES (?, ?, ?, ?, ?,?,?)`,
      [name, email, phone, address, catId, userId, groupId]
    );
  }

  // Récupérer les contacts d'un groupe
  getContactByGroup(groupId) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE c_group_id = ?`,
      [groupId]
    );
  }

  // Récupérer un contact par id
  getContactById(contactId) {
    return this.database.query(
      `SELECT c_id, c_name, c_email, c_phone, c_address, c_cat_contact_id, cc.cc_name FROM ${this.table} INNER JOIN category_contact as cc ON c_cat_contact_id = cc.cc_id WHERE c_id = ?`,
      [contactId]
    );
  }

  // Modifier un contact
  updateContact(contactId, contactUpdated) {
    // on récupère les champs renseignés dans req.body
    const keysToUpdate = Object.keys(contactUpdated);
    // on récupère leurs valeurs
    const valuesToUpdate = Object.values(contactUpdated);
    // on compile ces champs dans une string en leur ajoutant le préfixe pour coller à notre BDD et à la syntaxe SQL
    const setKeys = keysToUpdate.map((column) => `c_${column} = ?`).join(", ");
    return this.database.query(
      `UPDATE ${this.table} SET ${setKeys} WHERE c_id = ?`,
      [...valuesToUpdate, contactId]
    );
  }

  // Supprimer un contact
  deleteContact(contactId) {
    return this.database.query(`DELETE FROM ${this.table} WHERE c_id = ?`, [
      contactId,
    ]);
  }

  // ***********Pour les category_contact*************** //

  // Créer une catégorie
  createCategory(catName, groupId) {
    return this.database.query(
      `INSERT INTO category_contact (cc_name, cc_group_id) VALUES (?, ?)`,
      [catName, groupId]
    );
  }

  // Récupérer les catégories du groupe
  getCategoriesByGroup(groupId) {
    return this.database.query(
      `SELECT cc_id, cc_name FROM category_contact WHERE cc_group_id = ?`,
      [groupId]
    );
  }

  // Modifier une catégorie
  updateCategory(catName, catId) {
    return this.database.query(
      `UPDATE category_contact SET cc_name = ? WHERE cc_id = ?`,
      [catName, catId]
    );
  }

  // Supprimer une catégorie
  deleteCategory(catId) {
    return this.database.query(`DELETE FROM category_contact WHERE cc_id = ?`, [
      catId,
    ]);
  }
}

module.exports = ContactManager;
