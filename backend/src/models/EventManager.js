const AbstractManager = require("./AbstractManager");

class EventManager extends AbstractManager {
  constructor() {
    super({ table: "event" });
  }

  // créer un évenement
  createEvent(idUser, idGroup, title, text, dateStart, dateEnd, isPrivate) {
    return this.database.query(
      `INSERT INTO ${this.table} (e_title, e_text, e_date_start, e_date_end, e_private, e_user_id, e_group_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, text, dateStart, dateEnd, isPrivate, idUser, idGroup]
    );
  }

  // récupérer les événements d'un groupe
  getByGroup(groupId, userId) {
    const falsy = false;
    const truly = true;
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE (e_group_id = ? AND e_private = ?) OR (e_group_id = ? AND e_private = true AND e_user_id = ?)`,
      [groupId, falsy, groupId, truly, userId]
    );
  }

  getById(eventId) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE e_id = ?`, [
      eventId,
    ]);
  }

  updateEvent(eventId, eventUpdated) {
    // on récupère les champs renseignés dans req.body
    const keysToUpdate = Object.keys(eventUpdated);
    // on récupère leurs valeurs
    const valuesToUpdate = Object.values(eventUpdated);
    // on compile ces champs dans une string en leur ajoutant le préfixe pour coller à notre BDD et à la syntaxe SQL
    const setKeys = keysToUpdate.map((column) => `e_${column} = ?`).join(", ");
    return this.database.query(
      `UPDATE ${this.table} set ${setKeys} WHERE e_id = ?`,
      [...valuesToUpdate, eventId]
    );
  }

  deleteEvent(eventId) {
    return this.database.query(`DELETE FROM ${this.table} WHERE e_id = ?`, [
      eventId,
    ]);
  }
}

module.exports = EventManager;
