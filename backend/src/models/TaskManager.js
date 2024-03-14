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
      `SELECT ta_name,
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
}

module.exports = TaskManager;
