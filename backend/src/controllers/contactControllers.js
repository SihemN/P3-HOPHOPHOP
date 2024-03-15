const tables = require("../tables");

// Créer un contact
const createContact = async (req, res) => {
  try {
    const userId = req.payload;
    const { id, catId } = req.params;
    const { name, email, phone, address } = req.body;
    const [result] = await tables.contact.createContact(
      name,
      email,
      phone,
      address,
      catId,
      userId,
      id
    );
    if (result.affectedRows) {
      res.status(201).send("Contact créé avec succès!");
    } else {
      res.status(401).send("Problème lors de la création du contact");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { createContact };
// Récupérer un contact
// Récupérer tous les contacts
// Modifier un contact
// Supprimer un contact
