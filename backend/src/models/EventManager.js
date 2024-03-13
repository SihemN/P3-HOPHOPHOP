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
}

module.exports = EventManager;
