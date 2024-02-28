const AbstractManager = require("./AbstractManager");

class GroupManager extends AbstractManager {
  constructor() {
    super({ table: "group_table" });
  }

  createGroup(idUser, nameGroup) {
    // Première étape de la requête : on crée un nouveau group avec le nom choisi par le user
    // Deuxième étape : on ajoute dans la table d'association user_group l'id du user et l'id du nouveau group
    const result = this.database.query(
      `INSERT INTO ${this.table} (g_name) VALUES (?);
     INSERT INTO user_group (ug_user_id, ug_group_id)
     SELECT ?, LAST_INSERT_ID() AS group_id`,
      [nameGroup, idUser]
    );
    return result;
  }

  getGroupsOfUser(userId) {
    return this.database.query(
      `SELECT group_table.g_name, user_group.ug_user_id, user_group.ug_group_id   
      FROM user_group     
    JOIN user ON user_group.ug_user_id = user.u_id
    JOIN group_table ON user_group.ug_group_id = group_table.g_id
    WHERE user.u_id = ?`,
      [userId]
    );
  }

  updateGroup(groupId, groupName) {
    return this.database.query(
      `UPDATE ${this.table} SET g_name = ? WHERE g_id = ?`,
      [groupName, groupId]
    );
  }
}

module.exports = GroupManager;
