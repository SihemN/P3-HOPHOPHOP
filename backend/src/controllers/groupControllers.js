const tables = require("../tables");

require("dotenv").config();

// créer un groupe

const create = async (req, res) => {
  try {
    // on récupère l'id du user dans le payload du token
    const id = req.payload;
    console.info("id", id);
    const { name } = req.body;
    console.info("name", name);

    const [results] = await tables.group_table.createGroup(id, name);
    console.info("results", results);
    if (results.affectedRows) {
      res.status(201).send("Group created");
    } else {
      res.status(401).send("Error during the group's creation");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  create,
};
