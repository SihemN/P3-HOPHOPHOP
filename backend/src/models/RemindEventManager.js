const AbstractManager = require("./AbstractManager");

class RemindEventManager extends AbstractManager {
  constructor() {
    super({ table: "remind_event" });
  }

  // créer un reminder
  createRemindEvent(message, eventId, userId) {
    return this.database.query(
      `INSERT INTO ${this.table} (re_message, re_event_id, re_user_id) VALUES (?, ?, ?)`,
      [message, eventId, userId]
    );
  }

  // Récupérer un reminder par son id
  getRemindEventById(reminderId) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE re_id = ?`, [
      reminderId,
    ]);
  }

  // Récupérer les reminders par event Id
  getRemindByEventId(eventId) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE re_event_id = ?`,
      [eventId]
    );
  }

  // Update un reminder
  updateReminder(reminderId, reminderUpdated) {
    // on récupère les champs renseignés dans req.body
    const keysToUpdate = Object.keys(reminderUpdated);
    // on récupère leurs valeurs
    const valuesToUpdate = Object.values(reminderUpdated);
    // on compile ces champs dans une string en leur ajoutant le préfixe pour coller à notre BDD et à la syntaxe SQL
    const setKeys = keysToUpdate.map((column) => `re_${column} = ?`).join(", ");
    return this.database.query(
      `UPDATE ${this.table} set ${setKeys} WHERE re_id = ?`,
      [...valuesToUpdate, reminderId]
    );
  }

  // Delete un reminder par id
  deleteReminder(reminderId) {
    return this.database.query(`DELETE FROM ${this.table} WHERE re_id = ?`, [
      reminderId,
    ]);
  }
}
module.exports = RemindEventManager;
