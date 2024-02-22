const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/userControllers");
/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
const hashPassword = require("./services/hashedPassword");
const verifyToken = require("./services/verifyToken");
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
router.post("/users", hashPassword, userControllers.create);
// Authentification
router.post("/login", userControllers.readByEmail);
// logout
router.post("/logout", userControllers.logout);
// read user by id
router.get("/users/:id", verifyToken, userControllers.readById);
// update user whitout password
router.patch("/users", verifyToken, userControllers.update);
module.exports = router;
