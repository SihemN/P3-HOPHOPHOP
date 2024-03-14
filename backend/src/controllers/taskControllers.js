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
      res.status(201).send("Task créée avec succès !");
    } else {
      res.status(401).send("Problème dans la création de la tâche");
    }
  } catch (error) {
    res.status(500).send(error);
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
    } else {
      res.status(401).send("pas de liste");
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

module.exports = { create, getByCategory, deleteTask, updateTask };
