const AbstractManager = require("./AbstractManager");

class GroupManager extends AbstractManager {
  constructor() {
    super({ table: "group_table" });
  }

  createGroup(idUser, nameGroup) {
    console.info("idUser", idUser);
    console.info("nameGroup", nameGroup);
    return this.database.query(
      `
INSERT INTO ${this.table} (g_name)
VALUES (?)
SET @group_created_id = LAST_INSERT_ID()
INSERT INTO user_group (ug_user_id, ug_group_id)
VALUES (?, @group_created_id);
`,
      [nameGroup, idUser]
    );
  }
}

// createGroup(idUser, nameGroup) {
//     // console.info("idUser", idUser);
//     // console.info("nameGroup", nameGroup);

//     // Première query
//     // On crée un groupe dans groupe_table
//     return this.database.query(
//       `
// INSERT INTO ${this.table} (g_name) VALUES (?)`,
// [nameGroup] );

// On récupère l'id du dernier groupe créé

// Deuxième query
// On injecte dans user_group l'id du nouveau groupe
// avec l'id du user qui l'a créé

// }

module.exports = GroupManager;
