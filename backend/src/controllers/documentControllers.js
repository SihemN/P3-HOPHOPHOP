const tables = require("../tables");

// Créer un document

const createDocument = async (req, res) => {
  try {
    const { id, catId } = req.params;
    const userId = req.payload;
    const document = req.file.path;
    const { name, isPrivate } = req.body;
    const [result] = await tables.document.createDocument(
      name,
      document,
      Boolean(isPrivate),
      catId,
      userId,
      id
    );

    if (result.affectedRows) {
      res.status(201).send("Document créé avec succès");
    } else {
      res.status(401).send("Problème pour créer le document");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Récupérer tous les documents d'un dossier
const getDocumentByCat = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await tables.document.getDocumentByCat(id);
    if (result.length) {
      res.status(200).json({ message: "Liste de documents récupérée", result });
    } else {
      res.status(401).send("Problème pour récupérer la liste de document");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Modifier un document
const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const [result] = await tables.document.updateDocument(id, name);
    if (result.affectedRows) {
      res.status(200).send("Document mis à jours");
    } else {
      res.status(401).send("Problème mettre à jours le document");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
// Supprimer un document
const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await tables.document.deleteDocument(id);
    if (result.affectedRows) {
      res.status(200).send("Document supprimé");
    } else {
      res.status(401).send("Problème pour supprimer le document");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createDocument,
  getDocumentByCat,
  updateDocument,
  deleteDocument,
};
