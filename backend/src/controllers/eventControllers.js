const tables = require("../tables");

const create = async (req, res) => {
  try {
    const idUser = req.payload;
    const { id } = req.params;
    const { title, text, dateStart, dateEnd, private: isPrivate } = req.body;

    let description;
    if (!text) {
      description = null;
    } else {
      description = text;
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
      res.status(201).json("événement créé");
    } else {
      res.status(401).json("Erreur lors de la création");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getEventByGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.payload;

    const [result] = await tables.event.getByGroup(id, userId);

    if (result.length) {
      res
        .status(200)
        .json({ message: "Liste des events récupérée avec succès!!", result });
    } else if (result.length === 0) {
      res
        .status(200)
        .json({ message: "Vous n'avez pas encore d'événements", result });
    } else {
      res.status(401).json("Erreur lors de la récupération de la liste !!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await tables.event.getById(id);

    if (result.length) {
      res.status(200).json({ message: "Event récupéré avec succès!!", result });
    } else {
      res.status(401).json("Erreur lors de la récupération de l'event !!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await tables.event.updateEvent(id, req.body);
    if (result.affectedRows) {
      res.status(200).json("événement mis à jour");
    } else {
      res.status(401).json("Erreur pour mettre à jour l'événement");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await tables.event.deleteEvent(id);
    if (result.affectedRows) {
      res.status(200).json("événement supprimé");
    } else {
      res.status(401).json("Erreur lors de la suppression de l'événement !");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  create,
  getEventByGroup,
  getEventById,
  updateEvent,
  deleteEvent,
};
