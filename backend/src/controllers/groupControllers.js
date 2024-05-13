const tables = require("../tables");

require("dotenv").config();

// créer un groupe
const create = async (req, res) => {
  try {
    // on récupère l'id du user dans le payload du token
    const id = req.payload;
    // on récupère le nom choisi par le user pour le nouveau groupe
    const { name } = req.body;
    const role = "admin";
    const catTransactionName = "Sans catégorie";
    const catDocName = "Privé";
    const catTaskName = "Ma to do list";
    const catContactName = "Sans catégorie";
    // on stock la réponse du manager
    const [results] = await tables.group_table.createGroup(
      name,
      id,
      role,
      catTransactionName,
      catDocName,
      catTaskName,
      catContactName
    );
    console.info("results", results);
    // la réponse nous renvoie un tableau avec 2 objets, un objet concernant la création du nouveau group et un objet concernant les ajouts dans user_group
    // on vérifie donc la mise à jour dans les 2 objets

    // Vérifions le tableau results
    let resultsIsValid = true;

    // si aucune ligne n'est affectée OU si une requête n'a pas fonctionné (donc différente de 10)
    // alors results n'est pas valide
    for (let i = 0; i < results.length; i += 1) {
      if (results[i].affectedRows === 0 && results[i].serverStatus !== 10) {
        resultsIsValid = false;
        // break nous sort de la boucle une fois la condition vérifiée
        // Nous évite de parcourir tout le tableau si pas nécessaire
        break;
      }
    }
    if (resultsIsValid) {
      res.status(201).json("Group created");
    } else {
      res.status(401).send("Error during the group's creation");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
// get les groups du user
const read = async (req, res) => {
  try {
    // on récupère l'id du user dans le payload du token
    const id = req.payload;
    // on récupère la réponse du manager
    const [results] = await tables.group_table.getGroupsOfUser(id);
    // on vérifie si on reçoit bien un tableau avec des données
    if (results.length) {
      res.status(200).json({
        message: "Liste des groupes de l'utilisateur récupérée",
        results,
      });
    } else {
      res.status(401).send("Erreur pour récupérer les données");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// get les users d'un group
const readUsersOfGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await tables.group_table.getUsersofGroup(id);
    if (results.length) {
      res.status(201).json({
        message: "Liste des utilisateurs du groupe récupérée",
        results,
      });
    } else {
      res.status(401).json("Erreur pour récupérer les données");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Mettre à jour le nom du groupe
const update = async (req, res) => {
  try {
    // on récupère l'id du groupe dans la route paramétrée
    const { id } = req.params;
    const { name } = req.body;
    const [results] = await tables.group_table.updateGroup(id, name);
    if (results.affectedRows) {
      res.status(201).send("Le nom a été modifié");
    } else {
      res.status(401).send("Erreur modification!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteGroup = async (req, res) => {
  try {
    // on récupère l'id du group à supprimer dans la route paramétrée
    const { id } = req.params;
    // on envoit au manager l'id du group et on stocke la réponse
    const [result] = await tables.group_table.deleteGroup(id);

    // si la suppression a fonctionné, une ligne a été affectée
    if (result.affectedRows) {
      res.status(201).json("Le groupe a été supprimé");
    } else {
      res.status(401).json("Erreur, le groupe n'a pas été supprimé");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Ajouter un user au groupe
const addUserInGroup = async (req, res) => {
  try {
    const { userIdToSet } = req.body;
    const { id } = req.params;
    const role = "membre";
    const [results] = await tables.group_table.addUserInGroup(
      userIdToSet,
      id,
      role
    );

    if (results.affectedRows) {
      res.status(201).json("User ajouté au groupe");
    } else {
      res.status(401).json({ message: "Erreur pour ajouter le user" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Modifier rôle d'un User du groupe
const updateRoleUser = async (req, res) => {
  try {
    // on récupère l'id du groupe et l'id du user à update dans params
    const { id, idUser } = req.params;
    // on récupère de la requête le changement de rôle
    const { newRole } = req.body;
    // on stocke la réponse de la BDD
    const [results] = await tables.group_table.updateRoleUser(
      idUser,
      id,
      newRole
    );
    if (results.affectedRows) {
      res.status(201).json("Rôle du User mis à jour");
    } else {
      res.status(401).json("Erreur dans la mise à jour du rôle du User");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Supprimer un User du groupe
const deleteUserInGroup = async (req, res) => {
  try {
    // on récupère l'id du groupe et l'id du user dans params
    const { id, idUser } = req.params;

    const [results] = await tables.group_table.deleteUserFromGroup(idUser, id);
    if (results.affectedRows) {
      res.status(201).send("User supprimé du groupe");
    } else {
      res.status(401).send("Erreur pour supprimer le user");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// ***** MESSAGERIE INSTANTANEE *** //

// Créer un message
const createMessage = async (req, res) => {
  try {
    const userId = req.payload;
    const { id } = req.params;
    const { message, role } = req.body;
    const [result] = await tables.group_table.createMessage(
      message,
      id,
      userId,
      role
    );
    if (result.affectedRows) {
      res.status(201).json("message créé avec succès");
    } else {
      res.status(401).json("problème pour créer le message");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
// Récupérer les messages du groupe
const getMessagesByGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const [messages] = await tables.group_table.getMessagesByGroup(id);

    if (messages.length) {
      res
        .status(200)
        .json({ message: "liste des messages récupérée", messages });
    } else if (messages.length > 0) {
      res.status(200).json("Aucun message à afficher");
    } else {
      res.status(401).json("pas de liste");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  create,
  read,
  update,
  deleteGroup,
  addUserInGroup,
  updateRoleUser,
  deleteUserInGroup,
  readUsersOfGroup,
  createMessage,
  getMessagesByGroup,
};
