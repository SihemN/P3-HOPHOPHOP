/* eslint-disable camelcase */
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

// Récupérer tous les contacts d'un groupe
const getContactByGroup = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("id", id);
    const [results] = await tables.contact.getContactByGroup(id);
    // console.log("results", results);
    if (results.length) {
      res.status(200).json({
        message: "Liste des contacts du groupe récupérée !",
        results,
      });
    } else if (results.length === 0) {
      res.status(200).json({ message: "Pas de contacts", results });
    } else {
      res.status(401).json("Problème pour récupérer les contacts");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Récupérer un contact
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await tables.contact.getContactById(id);

    if (result.length) {
      res.status(200).json({
        message: "Contact récupéré avec susccès !",
        result,
      });
    } else if (result.length === 0) {
      res.status(401).send("Pas de contact");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Modifier un contact
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await tables.contact.updateContact(id, req.body);
    if (result.affectedRows) {
      res.status(200).send("Contact mis à jour avec succès !");
    } else {
      res.status(401).send("Problème de mise à jour du contact");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Supprimer un contact
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await tables.contact.deleteContact(id);
    if (result.affectedRows) {
      res.status(200).send("Contact supprimé !");
    } else {
      res.status(401).send("Problème pour supprimer le contact");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Créer une catégorie
const createCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const [result] = await tables.contact.createCategory(name, id);
    if (result.affectedRows) {
      res.status(201).json({ message: "Catégorie créée avec succès !" });
    } else {
      res.status(401).send("Problème pour créer la catégorie");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Récupérer les catégories du groupe
const getCategoriesByGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await tables.contact.getCategoriesByGroup(id);
    if (results.length) {
      res.status(200).json({
        message: "Liste des catégories récupérée avec succès !",
        results,
      });
    } else {
      res.status(401).send("Pas de liste");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Modifier une catégorie
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { cc_name } = req.body;
    const [result] = await tables.contact.updateCategory(cc_name, id);
    if (result.affectedRows) {
      res.status(200).json({ message: "Catégorie mise à jour avec succès !" });
    } else {
      res.status(404).json({ message: "Catégorie non trouvée" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Supprimer une catégorie
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await tables.contact.deleteCategory(id);
    if (result.affectedRows) {
      res.status(200).send("Catégorie supprimée avec succès !");
    } else {
      res.status(401).send("Problème pour supprimer la catégorie");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createContact,
  getContactByGroup,
  getContactById,
  updateContact,
  deleteContact,
  createCategory,
  getCategoriesByGroup,
  updateCategory,
  deleteCategory,
};
