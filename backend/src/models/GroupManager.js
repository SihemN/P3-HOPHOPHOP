const AbstractManager = require("./AbstractManager");

class GroupManager extends AbstractManager {
  constructor() {
    super({ table: "group_table" });
  }

  createGroup(
    nameGroup,
    idUser,
    role,
    catTransactionName,
    catDocName,
    catTaskName,
    catContactName
  ) {
    return this.database.query(
      `INSERT INTO ${this.table} (g_name) VALUES (?);
      SET @groupId = LAST_INSERT_ID();
      INSERT INTO user_group (ug_user_id, ug_group_id, ug_user_role)
      SELECT ?, @groupId, ?;
      INSERT INTO category_transaction (ctra_name, ctra_group_id)
      SELECT ?, @groupId;
      INSERT INTO category_document (cd_name, cd_group_id)
      SELECT ?, @groupId;
      INSERT INTO category_task (cta_name, cta_user_id, cta_group_id)
      SELECT ?, ?, @groupId;
      INSERT INTO category_contact (cc_name, cc_group_id)
      SELECT ?, @groupId;`,
      [
        nameGroup,
        idUser,
        role,
        catTransactionName,
        catDocName,
        catTaskName,
        idUser,
        catContactName,
      ]
    );
  }

  getGroupsOfUser(userId) {
    return this.database.query(
      `SELECT group_table.g_name, user_group.ug_user_id, user_group.ug_group_id, user_group.ug_message   
      FROM user_group     
      JOIN user ON user_group.ug_user_id = user.u_id
      JOIN group_table ON user_group.ug_group_id = group_table.g_id
      WHERE user.u_id = ? AND ug_message IS NULL
      ORDER BY user_group.ug_group_id;`,

      [userId]
    );
  }

  getUsersofGroup(groupId) {
    const isActive = true;
    return this.database.query(
      `SELECT u.u_name, ug.ug_user_id, ug.ug_user_role, ug.ug_group_id, g.g_name
      FROM user_group AS ug
      JOIN user AS u ON ug.ug_user_id = u.u_id
      JOIN group_table AS g ON ug.ug_group_id = g.g_id
      WHERE ug.ug_group_id = ? AND u.u_active = ? AND ug.ug_message IS NULL`,
      [groupId, isActive]
    );
  }

  getAdminGroup(groupId) {
    const isActive = true;
    const admin = "admin";
    return this.database.query(
      `SELECT ug.ug_user_role, ug.ug_user_id 
      FROM user_group AS ug
      JOIN user AS u ON ug.ug_user_id = u.u_id
      WHERE ug_group_id = ? AND u.u_active = ? AND ug.ug_user_role = ?`,
      [groupId, isActive, admin]
    );
  }

  getUserInGroupById(userId, groupId) {
    return this.database.query(
      `SELECT u.u_active, ug.ug_user_id FROM user_group AS ug
      INNER JOIN user AS u ON u.u_id = ug.ug_user_id
      WHERE ug.ug_user_id = ? AND ug.ug_group_id = ?`,
      [userId, groupId]
    );
  }

  updateGroup(groupId, groupName) {
    return this.database.query(
      `UPDATE ${this.table} SET g_name = ? WHERE g_id = ?`,
      [groupName, groupId]
    );
  }

  deleteGroup(groupId) {
    return this.database.query(
      `DELETE FROM ${this.table} 
      WHERE g_id = ?`,
      [groupId]
    );
  }

  addUserInGroup(userId, groupId, role) {
    return this.database.query(
      `INSERT INTO user_group (ug_user_id, ug_group_id, ug_user_role)
      VALUES (?, ?, ?)`,
      [userId, groupId, role]
    );
  }

  updateRoleUser(userId, groupId, role) {
    const isActive = true;
    return this.database.query(
      `UPDATE user_group AS ug 
      INNER JOIN user AS u ON ug.ug_user_id = u.u_id
      SET ug.ug_user_role = ?
      WHERE ug.ug_user_id = ? AND ug.ug_group_id = ? AND u.u_active = ?`,
      [role, userId, groupId, isActive]
    );
  }

  deleteUserFromGroup(userId, groupId) {
    return this.database.query(
      `DELETE FROM user_group
      WHERE ug_user_id = ? AND ug_group_id = ?`,
      [userId, groupId]
    );
  }

  // ***** MESSAGERIE INSTANTANEE *** //

  // Créer un message

  createMessage(message, groupId, userId, userRole) {
    return this.database.query(
      `INSERT INTO user_group (ug_user_id, ug_user_role, ug_group_id, ug_message) VALUES (?, ?, ?, ?)`,
      [userId, userRole, groupId, message]
    );
  }

  // Récupérer les messages du groupe
  getMessagesByGroup(groupId) {
    return this.database.query(
      `SELECT ug_id, ug_user_id, u.u_name, ug_message
        FROM user_group
        INNER JOIN user AS u ON ug_user_id = u.u_id
        WHERE ug_group_id = ?`,
      [groupId]
    );
  }
}

module.exports = GroupManager;
