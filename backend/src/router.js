const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/userControllers");

const groupControllers = require("./controllers/groupControllers");

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
const hashPassword = require("./services/hashedPassword");
const verifyToken = require("./services/verifyToken");
const hashPasswordWithoutUpload = require("./services/hashedPasswordWithoutUpload");
const upload = require("./services/upload");

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
// Route to create a user
router.post("/users", upload, hashPassword, userControllers.create);
// Authentification
router.post("/login", userControllers.readByEmail);
// logout
router.post("/logout", userControllers.logout);
// read user by id
router.get("/users/:id", verifyToken, userControllers.readById);
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
// delete user
router.delete("/users", verifyToken, userControllers.deleteUser);

/* *************************************************************************
   GROUP ENTITY
*************************************************************************** */
// créer un groupe
router.post("/groups", verifyToken, groupControllers.create);
// récupérer les groupes du user
router.get("/groups/users/:id", verifyToken, groupControllers.read);
module.exports = router;
