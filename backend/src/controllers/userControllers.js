// Import access to database tables
const tables = require("../tables");

// const argon2 = require("argon2");
// const jsonwebtoken = require("jsonwebtoken");
// const fs = require("fs");

const read = async (req, res) => {
  try {
    const [users] = await tables.user.getAllUsers();
    if (users.length) {
      res.status(200).json({
        message: "liste des users",
        users,
      });
    } else {
      res.status(200).json({
        message: "pas de users",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const { name, email, hashedPassword, avatar, admin } = req.body;
    const [results] = await tables.user.addUser(
      name,
      email,
      hashedPassword,
      avatar,
      admin
    );
    if (results.affectedRows) {
      res.status(201).send("Created");
    } else {
      res.status(401).send("Error during the creation");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { read, create };
