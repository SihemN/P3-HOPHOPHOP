// Import access to database tables

const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const tables = require("../tables");

require("dotenv").config();

const read = async (req, res) => {
  try {
    const [users] = await tables.user.getAllUsers();
    if (users.length) {
      res.status(200).json({
        message: "liste des users",
        users,
      });
    } else {
      res.status(204).json({
        message: "pas de users",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// login user
const readByEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).json({ message: "remplir vos champs !" });
    } else {
      const [user] = await tables.user.getUserByEmail(email);
      if (user.length) {
        // on vérifie si le user a un compte actif
        if (user[0].u_active) {
          // on vérifie le mot de passe rentré par le user avec le mot de passe haché de la BDD
          const isVerify = await argon2.verify(
            user[0].u_hashedPassword,
            password
          );
          // si c'est ok, on crée un token avec une expiration définie
          if (typeof isVerify === "boolean" && isVerify) {
            const token = jwt.sign(
              { payload: user[0].u_id },
              process.env.SECRET_KEY_JWT,
              {
                expiresIn: "24h",
              }
            );
            // on envoie le token
            res.status(200).send(token);
          } else {
            res.status(401).send("vérifier vos données");
          }
        } else {
          res.status(401).send("votre compte est désactivé");
        }
      } else {
        res.status(401).send("adresse mail n'existe pas");
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    // on initialise la variable avatar
    let avatar;
    // si l'upload d'un avatar est null, undefined...
    // on la déclare à null (valeur acceptée dans notre BDD)
    if (!req.file) {
      avatar = null;
    } else {
      // si req.file.path existe, on l'assigne en avatar
      avatar = req.file.path;
    }
    // on récupère les infos du nouveau User et le nom de son Groupe dans la requête
    const { name, email, hashedPassword, nameGroup } = req.body;
    const role = "admin";
    // On stocke les noms des catégories par défaut à créer dans la requête SQL
    const catTransactionName = "Sans catégorie";
    const catDocName = "Privé";
    const catTaskName = "Ma to do list";
    const catContactName = "Sans catégorie";

    const [results] = await tables.user.addUserWithGroup(
      name,
      email,
      hashedPassword,
      avatar,
      nameGroup,
      role,
      catTransactionName,
      catDocName,
      catTaskName,
      catContactName
    );
    console.info("result", results);

    // on vérifie la réponse (on reçoit un objet par requête SQL)
    // affectedRows : pour les requêtes qui créent ou modifient ou suppriment une ligne (=affectent une ligne)
    // pour les requêtes de type SELECT ou SET, ça n'affecte pas la BDD (pas de modif). On vérifie si le statut du serveur = 10 (signifie que la requête a fonctionné)

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
      res.status(201).send("Created");
    } else if (req.file) {
      fs.unlinkSync(req.file.path);

      res.status(401).send("Error during the creation");
    } else {
      res.status(401).send("Error during the creation");
    }
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).send(error);
  }
};

const logout = async (req, res) => {
  try {
    const id = req.payload;
    const token = jwt.sign({ payload: id }, process.env.SECRET_KEY_JWT, {
      expiresIn: "0h",
    });
    res.status(200).json({
      message: "Déconnecté",
      token,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const readById = async (req, res) => {
  try {
    const id = req.payload;
    const [user] = await tables.user.getUserById(id);
    if (user.length) {
      res.status(200).json({ message: "Connecté", user: user[0] });
    } else {
      res.status(401).send("Vérifiez vos données");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateWithoutUpload = async (req, res) => {
  try {
    const id = req.payload; // Assumant que req.payload contient l'ID de l'utilisateur

    // Appeler la méthode updateUserWithoutPassword avec les données mises à jour
    const [results] = await tables.user.updateUserWithoutPassword(id, req.body);
    console.info("results", results);
    // Vérifier le résultat de la mise à jour et envoyer la réponse appropriée
    if (results.affectedRows) {
      res
        .status(200)
        .json({ message: "Votre compte a été mis à jour avec succès" });
    } else {
      res.status(401).send("Problème lors de la mise à jour de votre compte");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateAvatar = async (req, res) => {
  try {
    const id = req.payload; // Assumant que req.payload contient l'ID de l'utilisateur

    let avatarPath; // Déclarer la variable avatarPath

    // Vérifier si un fichier a été téléchargé
    if (req.file) {
      avatarPath = req.file.path; // Définir le chemin de l'avatar
      const [result] = await tables.user.updateUserUpload(
        id,
        { avatar: avatarPath } // Inclure avatarPath
      );
      // si avatar mis à jour
      if (result.affectedRows) {
        res
          .status(200)
          .json({ message: "Votre compte a été mis à jour avec succès" });
      } else {
        res.status(401).send("Problème lors de la mise à jour de votre compte");
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { hashedPassword } = req.body;
    const id = req.payload;
    const [result] = await tables.user.updateUserOnlyPassword(
      id,
      hashedPassword
    );
    if (result.affectedRows) {
      res.status(200).json({ message: "votre demande a été prise en compte" });
    } else {
      res.status(401).send("problème");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const desactivateUser = async (req, res) => {
  try {
    const id = req.payload;
    const active = false;
    const [result] = await tables.user.desactivateUser(id, active);
    if (result.affectedRows) {
      res.status(200).json({
        message: "La désactivation du compte a été prise en compte",
      });
    } else {
      res.status(401).send("problème");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.payload;
    const [result] = await tables.user.deleteUser(id);
    if (result.affectedRows) {
      res.status(200).json({
        message: " La suppression du compte a été prise en compte",
      });
    } else {
      res.status(401).send("problème");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  read,
  create,
  readByEmail,
  logout,
  readById,
  updateWithoutUpload,
  updatePassword,
  deleteUser,
  updateAvatar,
  desactivateUser,
};
