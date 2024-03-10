const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/userControllers");

const groupControllers = require("./controllers/groupControllers");

const transactionControllers = require("./controllers/transactionControllers");

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
const hashPassword = require("./services/hashedPassword");
const verifyToken = require("./services/verifyToken");
const hashPasswordWithoutUpload = require("./services/hashedPasswordWithoutUpload");
const upload = require("./services/upload");
const isAdmin = require("./services/isAdmin");
const userExistsAndActive = require("./services/userExistsAndActive");

// Route to get a list of items
router.get("/items", itemControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);

/* *************************************************************************
   USER ENTITY
*************************************************************************** */

// Route to get a list of users
router.get("/users", verifyToken, userControllers.read);
// Route to create a user and his group
router.post("/users", upload, hashPassword, userControllers.create);
// Créer un user et l'ajouter dans un groupe par lien d'invitation
// router.post(
//   "/users/group/:id",
//   upload,
//   hashPassword,
//   userControllers.createFromInvite
// );
// Authentification
router.post("/login", userControllers.readByEmail);
// logout
router.post("/logout", userControllers.logout);
// read user by id
router.get("/me", verifyToken, userControllers.readById);
// update user without password with upload
router.patch(
  "/users/update-upload",
  verifyToken,
  upload,
  userControllers.updateAvatar
);
// update user without password and without upload
router.patch("/users/update", verifyToken, userControllers.updateWithoutUpload);
// update user password
router.patch(
  "/users/update-password",
  verifyToken,
  hashPasswordWithoutUpload,
  userControllers.updatePassword
);

// désactiver son compte
router.patch(
  "/users/desactivate",
  verifyToken,
  userControllers.desactivateUser
);

// delete user
router.delete("/users", verifyToken, userControllers.deleteUser);

/* *************************************************************************
   GROUP ENTITY
*************************************************************************** */
// créer un groupe
router.post("/groups", verifyToken, groupControllers.create);
// récupérer les groupes du user
router.get("/groups/users", verifyToken, groupControllers.read);
// récupérer les users d'un groupe
router.get("/groups/:id/users", verifyToken, groupControllers.readUsersOfGroup);
// modifier le nom du groupe
router.patch("/groups/update/:id", verifyToken, groupControllers.update);
// suppprimer un groupe
router.delete(
  "/groups/:id",
  verifyToken,
  isAdmin,
  groupControllers.deleteGroup
);

// Ajouter un user dans le groupe
router.post(
  "/groups/:id/users",
  verifyToken,
  isAdmin,
  userExistsAndActive,
  groupControllers.addUserInGroup
);

// Modifier le rôle du user dans le groupe
router.patch(
  "/groups/:id/users/:idUser",
  verifyToken,
  isAdmin,
  groupControllers.updateRoleUser
);

// Supprimer un user du groupe
router.delete(
  "/groups/:id/users/:idUser",
  verifyToken,
  isAdmin,
  groupControllers.deleteUserInGroup
);
/* *************************************************************************
   TRANSACTION ENTITY
*************************************************************************** */
// Créer une transaction dans un groupe
router.post(
  "/transactions/groups/:id",
  verifyToken,
  transactionControllers.create
);

// Créer une transaction avec une nouvelle catégorie dans un groupe
router.post(
  "/transactions/groups/:id/categories",
  verifyToken,
  transactionControllers.createWithNewCategory
);
// Récupérer toutes les transactions d'un groupe
router.get(
  "/transactions/groups/:id",
  verifyToken,
  transactionControllers.read
);

// Récupérer les transactions d'un groupe par user
router.get(
  "/transactions/groups/:id/users",
  verifyToken,
  transactionControllers.readByUser
);

// Modifier une transaction
router.patch("/transactions/:id", verifyToken, transactionControllers.update);

// Supprimer une transaction
router.delete(
  "/transactions/:id",
  verifyToken,
  transactionControllers.deleteTransaction
);

/* *************************************************************************
   CATEGORY TRANSACTION ENTITY
*************************************************************************** */
router.get(
  "/transactions-categories/groups/:id",
  verifyToken,
  transactionControllers.getCategoriesByGroup
);

module.exports = router;
