const tables = require("../tables");

const create = async (req, res) => {
  try {
    const userId = req.payload;
    const { id } = req.params;
    const { message } = req.body;
    let note;
    if (!message) {
      note = null;
    } else {
      note = message;
    }
    const [result] = await tables.remind_event.createRemindEvent(
      note,
      id,
      userId
    );

    if (result.affectedRows) {
      res.status(201).send("Votre rappel a été créé");
    } else {
      res.status(401).send("Erreur lors de la création du rappel! ");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const readById = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await tables.remind_event.getRemindEventById(id);

    if (result.length) {
      res.status(200).json({ message: "Reminder récupéré", result });
    } else {
      res.status(401).send("Problème pour get le reminder");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const readByEventId = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await tables.remind_event.getRemindByEventId(id);
    if (result.length) {
      res
        .status(200)
        .json({ message: "Liste des reminders de l'event récupérée", result });
    } else {
      res.status(401).send("Problème pour récupérer les reminders");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await tables.remind_event.updateReminder(id, req.body);

    if (result.affectedRows) {
      res.status(200).send("Rappel mis à jour");
    } else {
      res.status(401).send("Erreur dans l'update du rappel!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await tables.remind_event.deleteReminder(id);
    if (result.affectedRows) {
      res.status(200).send("Reminder supprimé");
    } else {
      res.status(401).send("Erreur dans la suppression du rappel!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { create, readById, update, readByEventId, deleteReminder };
