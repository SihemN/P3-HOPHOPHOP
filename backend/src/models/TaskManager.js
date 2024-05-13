const AbstractManager = require("./AbstractManager");

class TaskManager extends AbstractManager {
  constructor() {
    super({ table: "task" });
  }

  // Créer une task
  createTask(name, done, catTaskId, userId, groupId) {
    return this.database.query(
      `INSERT INTO ${this.table} (ta_name,
      ta_done,
      ta_cat_task_id,
      ta_user_id,
      ta_group_id) VALUES(?,?,?,?,?)`,
      [name, done, catTaskId, userId, groupId]
    );
  }

  // Récupérer les tasks d'une to do list (category_task)
  getTasksOfCategoryTask(catTaskId) {
    return this.database.query(
      `SELECT  ta_id, ta_name,
      ta_done FROM ${this.table} WHERE ta_cat_task_id = ?`,
      [catTaskId]
    );
  }

  // Supprimer une task
  deleteTask(taskId) {
    return this.database.query(`DELETE FROM ${this.table} WHERE ta_id = ?`, [
      taskId,
    ]);
  }

  // Update une task
  updateTask(taskId, taskUpdated) {
    // on récupère les champs renseignés dans req.body
    const keysToUpdate = Object.keys(taskUpdated);
    // on récupère leurs valeurs
    const valuesToUpdate = Object.values(taskUpdated);
    // on compile ces champs dans une string en leur ajoutant le préfixe pour coller à notre BDD et à la syntaxe SQL
    const setKeys = keysToUpdate.map((column) => `ta_${column} = ?`).join(", ");
    return this.database.query(
      `UPDATE ${this.table} set ${setKeys} WHERE ta_id = ?`,
      [...valuesToUpdate, taskId]
    );
  }

  // *******************POUR LES CATEGORIES TASKS************************///

  // créer une catégorie tasks
  createCategory(name, isPrivate, userId, groupId) {
    return this.database.query(
      `INSERT INTO category_task (cta_name, cta_private, cta_user_id, cta_group_id) VALUES (?, ?, ?, ?)`,
      [name, isPrivate, userId, groupId]
    );
  }

  // Récupérer les tasks list publiques par groupe
  getPublicCatByGroup(groupId) {
    const isPrivate = false;
    return this.database.query(
      `SELECT cta_name, cta_id FROM category_task WHERE cta_group_id = ? AND cta_private = ?`,
      [groupId, isPrivate]
    );
  }

  // Récupérer les tasks list privées du user dans le groupe
  getPrivateCatByUserByGroup(userId, groupId) {
    const isPrivate = true;
    return this.database.query(
      `SELECT cta_name FROM category_task WHERE cta_group_id = ? AND cta_private = ? AND cta_user_id = ?`,
      [groupId, isPrivate, userId]
    );
  }

  // Modifier une to do list
  updateCategory(name, id) {
    return this.database.query(
      `UPDATE category_task SET cta_name = ? WHERE cta_id = ?`,
      [name, id]
    );
  }
  // Supprimer une to do list

  deleteCategory(id) {
    return this.database.query(`DELETE FROM category_task WHERE cta_id = ?`, [
      id,
    ]);
  }
}

module.exports = TaskManager;
