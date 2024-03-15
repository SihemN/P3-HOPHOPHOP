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

  // /contacts/:id                             Récupérer un contact
  // /contacts/groups/:id                      Récupérer tous les contacts
  // /contacts/:id                             Modifier un contact
  // /contacts/:id                             Supprimer un contact
}

module.exports = ContactManager;
