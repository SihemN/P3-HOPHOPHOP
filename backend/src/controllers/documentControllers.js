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

// Récupérer un document par son id
const getDocumentbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await tables.document.getDocumentbyId(id);
    if (result.length) {
      res.status(200).json({ message: "Document récupéré", result });
    } else {
      res.status(401).send("Problème pour récupérer le document");
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

// Récupérer les docs privés du User pour la catégorie "Privée" dans le groupe
const getPrivateDocByUserByGroup = async (req, res) => {
  try {
    const userId = req.payload;
    const { id } = req.params;
    const [results] = await tables.document.getPrivateDocByUserByGroup(
      userId,
      id
    );
    if (results.length) {
      res
        .status(200)
        .json({ message: "Liste des docs privés du User récupérée", results });
    } else {
      res.status(401).send("Problème pour récupérer la liste de documents");
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
// Créer une category_document
const createCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const [result] = await tables.document.createCategory(name, id);
    if (result.affectedRows) {
      res.status(201).send("catégorie créée avec succès");
    } else {
      res.status(401).send("Problème pour créer la catégorie");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update une category_document
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const [result] = await tables.document.updateCategory(name, id);

    if (result.affectedRows) {
      res.status(200).send("catégorie mise à jour avec succès");
    } else {
      res.status(401).send("Problème pour mettre à jour la catégorie");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Récupérer les category_document du groupe
const getCategoriesByGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await tables.document.getCategoryByGroup(id);
    if (results.length) {
      res
        .status(200)
        .json({ messsage: "Liste des catégories récupérée !", results });
    } else {
      res.status(401).send("Problème pour récupérer la liste des catégories");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Supprimer une category_document
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await tables.document.deleteCategory(id);

    if (result.affectedRows) {
      res.status(200).send("catégorie supprimée avec succès");
    } else {
      res.status(401).send("Problème pour supprimer la catégorie");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createDocument,
  getDocumentbyId,
  getDocumentByCat,
  getPrivateDocByUserByGroup,
  updateDocument,
  deleteDocument,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoriesByGroup,
};
