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
      `SELECT d_id, d_name, d_path FROM ${this.table} WHERE d_category_document_id = ? `,
      [categoryId]
    );
  }

  // Récupérer un document par son id
  getDocumentbyId(docId) {
    return this.database.query(
      `SELECT d_id, d_category_document_id d_name, d_path FROM ${this.table} WHERE d_id = ?`,
      [docId]
    );
  }

  // Récupérer les docs privés du User pour la catégorie "Privée"
  getPrivateDocByUserByGroup(userId, categoryId) {
    return this.database.query(
      `SELECT d_id, d_name, d_path FROM ${this.table} WHERE d_category_document_id = ? AND d_user_id = ?`,
      [categoryId, userId]
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

  // Créer une category_document
  createCategory(catName, groupId) {
    return this.database.query(
      `INSERT INTO category_document (cd_name, cd_group_id) VALUES (?, ?)`,
      [catName, groupId]
    );
  }

  // Récupérer les category_documents publiques d'un groupe
  getCategoryByGroup(groupId) {
    return this.database.query(
      `SELECT cd_id, cd_name FROM category_document WHERE cd_group_id = ?`,
      [groupId]
    );
  }

  // Récupérer la category_document privée du User dans le groupe

  // Update une category_document
  updateCategory(name, id) {
    const lockName = "Privé";
    return this.database.query(
      `UPDATE category_document SET cd_name = ? WHERE cd_id = ? AND cd_name != ?`,
      [name, id, lockName]
    );
  }

  // Supprimer une category_document
  deleteCategory(id) {
    const lockName = "Privé";
    return this.database.query(
      `DELETE FROM category_document WHERE cd_id = ? AND cd_name != ?`,
      [id, lockName]
    );
  }
}

module.exports = DocumentManager;
