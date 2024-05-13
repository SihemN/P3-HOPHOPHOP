const tables = require("../tables");

const create = async (req, res) => {
  try {
    // on récupère l'id du User dans le token
    const userId = req.payload;
    // on récupère groupId et catTaskId dans req.params
    const { groupId, catTaskId } = req.params;
    // on récupère name et done dans req.body
    const { name, done } = req.body;
    // on envoie les données au Manager et on stocke la réponse de la BDD
    const [result] = await tables.task.createTask(
      name,
      done,
      catTaskId,
      userId,
      groupId
    );

    if (result.affectedRows) {
      res.status(201).json({ message: "Task créée avec succès !" });
    } else {
      res.status(401).send("Problème dans la création de la tâche");
    }
  } catch (error) {
    res.status(500).send(error);
    console.info("error", error);
  }
};

// Récupérer les tasks d'une to do list (category_task)
const getByCategory = async (req, res) => {
  try {
    // Récupérer l'id de la categorie dans params
    const { id } = req.params;
    const [result] = await tables.task.getTasksOfCategoryTask(id);

    if (result.length) {
      res
        .status(200)
        .json({ message: "liste des taches récupéré avec succès", result });
    } else if (result.length === 0) {
      res.status(200).json({ message: "pas de task", result });
    } else {
      res.status(401).json("Problème pour récupérer les données");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Supprimer une task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await tables.task.deleteTask(id);
    if (result.affectedRows) {
      res.status(200).send("La tâche a été supprimée avec succès!!");
    } else {
      res.status(401).send("la suppression a échoué!!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update une task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await tables.task.updateTask(id, req.body);
    if (result.affectedRows) {
      res.status(200).send("La mise à jour a été effectuée");
    } else {
      res.status(401).send("la mise à jour a échoué!!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Créer une to do list (category task)
const createCategory = async (req, res) => {
  try {
    const userId = req.payload;
    const { id } = req.params;
    const { name, isPrivate } = req.body;
    const [result] = await tables.task.createCategory(
      name,
      isPrivate,
      userId,
      id
    );

    if (result.affectedRows) {
      const { insertId } = result;
      res
        .status(201)
        .json({ message: "La catégorie task a été créée", insertId });
    } else {
      res.status(401).json("la création de la catégorie task a échoué!!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Récupérer les tasks list publiques par groupe
const getPublicCatByGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await tables.task.getPublicCatByGroup(id);

    if (result.length) {
      res.status(200).json({
        message: "Liste de catégorie récupérée",
        result,
      });
    } else if (result.length === 0) {
      res.status(200).json({ message: "Pas de catégorie", result });
    } else {
      res.status(401).json("Problème de récupération de catégorie");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Récupérer les tasks list privées du user dans le groupe
const getPrivateCatByUserByGroup = async (req, res) => {
  try {
    const userId = req.payload;
    const { id } = req.params;
    const [result] = await tables.task.getPrivateCatByUserByGroup(userId, id);
    if (result.length) {
      res.status(200).json({
        message: "Liste de catégorie privée récupérée",
        result,
      });
    } else {
      res.status(401).send("Pas de catégorie");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update une to do list
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;
    const [result] = await tables.task.updateCategory(categoryName, id);
    if (result.affectedRows) {
      res.status(200).send("mise à jour faite avec succès");
    } else {
      res.status(401).send("problème de mise à jour");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Supprimer une to do list
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await tables.task.deleteCategory(id);
    if (result.affectedRows) {
      res.status(200).send("to do list supprimée avec succès");
    } else {
      res.status(401).send("problème de suppression");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  create,
  getByCategory,
  deleteTask,
  updateTask,
  createCategory,
  getPublicCatByGroup,
  getPrivateCatByUserByGroup,
  updateCategory,
  deleteCategory,
};
