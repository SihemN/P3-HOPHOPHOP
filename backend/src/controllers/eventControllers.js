const tables = require("../tables");

const create = async (req, res) => {
  try {
    const idUser = req.payload;
    const { id } = req.params;
    const { title, text, dateStart, dateEnd, isPrivate } = req.body;

    let description;
    if (!text) {
      description = null;
    }
    const [result] = await tables.event.createEvent(
      idUser,
      id,
      title,
      description,
      dateStart,
      dateEnd,
      isPrivate
    );
    if (result.affectedRows) {
      res.status(201).send("Event créé avec succès!!");
    } else {
      res.status(401).send("Erreur lors de la création !!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  create,
};
