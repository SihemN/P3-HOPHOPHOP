const AbstractManager = require("./AbstractManager");

class DocumentManager extends AbstractManager {
  constructor() {
    super({ table: "document" });
  }

  // Créer un document
  createDocument(name, path, isPrivate, catDocId, userId, groupId) {
    return this.database.query(
      `INSERT INTO ${this.table} (d_name, d_path, 
      d_private,
      d_category_document_id,
      d_user_id, 
      d_group_id) VALUES(?,?,?,?,?,?)`,
      [name, path, isPrivate, catDocId, userId, groupId]
    );
  }

  // Récupérer tous les documents d'un dossier
  getDocumentByCat(categoryId) {
    return this.database.query(
      `SELECT d_name, d_id, d_path FROM ${this.table} WHERE d_category_document_id = ? `,
      [categoryId]
    );
  }

  // Modifier un document
  updateDocument(docId, name) {
    return this.database.query(
      `UPDATE ${this.table} SET d_name = ? WHERE d_id = ?`,
      [name, docId]
    );
  }

  // Supprimer un document
  deleteDocument(docId) {
    return this.database.query(`DELETE FROM ${this.table} WHERE d_id = ?`, [
      docId,
    ]);
  }
  // *******CATEGORY DOCUMENT*****//
}

module.exports = DocumentManager;
